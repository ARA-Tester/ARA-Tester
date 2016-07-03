#ifndef _ARA_TESTER_AXIS_H
#define _ARA_TESTER_AXIS_H

#include <linux/kernel.h>
#include <linux/module.h>
#include <linux/hrtimer.h>
#include <linux/ktime.h>

MODULE_LICENSE("GPL v2");

struct ara_tester_axis {
    struct hrtimer timer;
    unsigned long counter;
    int in_use;
    int active;
};

typedef enum hrtimer_restart (*hrtimer_function)(struct hrtimer*);

static inline struct hrtimer* __ara_tester_axis_timer_pointer(struct ara_tester_axis* ara_tester_axis) {
    return &(ara_tester_axis->timer);
}

static inline void ara_tester_axis_init(struct ara_tester_axis* ara_tester_axis, hrtimer_function function) {
    hrtimer_init(__ara_tester_axis_timer_pointer(ara_tester_axis), CLOCK_MONOTONIC, HRTIMER_MODE_REL);
    ara_tester_axis->timer.function = function;
    ara_tester_axis->counter = 0;
    ara_tester_axis->in_use = 0;
    ara_tester_axis->active = 0;
}

static inline int ara_tester_axis_clean(struct ara_tester_axis* ara_tester_axis) {
    return hrtimer_try_to_cancel(__ara_tester_axis_timer_pointer(ara_tester_axis));
}

static inline void ara_tester_axis_exec(struct ara_tester_axis* ara_tester_axis) {
    ara_tester_axis->counter = 0;
    ara_tester_axis->active = 1;
    ara_tester_axis->timer.function(__ara_tester_axis_timer_pointer(ara_tester_axis));
}

static inline enum hrtimer_restart ara_tester_axis_change_state(struct ara_tester_axis* ara_tester_axis) {
    if(ara_tester_axis->counter) {
        hrtimer_start(__ara_tester_axis_timer_pointer(ara_tester_axis), ktime_set(0, ara_tester_axis->counter), HRTIMER_MODE_REL);
        --ara_tester_axis->counter;
        if(!ara_tester_axis->counter) {
            ara_tester_axis->active = 0;
        }
    }
    return HRTIMER_NORESTART;
}

#endif