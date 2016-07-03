#ifndef _ARA_TESTER_AXIS_H
#define _ARA_TESTER_AXIS_H

#include <linux/kernel.h>
#include <linux/module.h>
#include <linux/hrtimer.h>
#include <linux/ktime.h>
#include <linux/types.h>
#include "output_pin.h"

MODULE_LICENSE("GPL v2");

struct ara_tester_axis {
    struct hrtimer timer;
    struct output_pin pulse_pin;
    struct output_pin dir_pin;
    unsigned long pulse_width;
    unsigned long t_max;
    unsigned long t_min;
    unsigned long incremental;
    unsigned long linear;
    unsigned long pulse_counter;
    unsigned long counter;
    int dir;
    int pulse;
    int movment_state;
    int in_use;
    int active;
    int pause;
};

typedef enum hrtimer_restart (*hrtimer_function)(struct hrtimer*);

static inline struct hrtimer* __ara_tester_axis_timer_pointer(struct ara_tester_axis* ara_tester_axis) {
    return &(ara_tester_axis->timer);
}

static inline struct output_pin* __ara_tester_axis_pulse_pin_pointer(struct ara_tester_axis* ara_tester_axis) {
    return &(ara_tester_axis->pulse_pin);
}

static inline struct output_pin* __ara_tester_axis_dir_pin_pointer(struct ara_tester_axis* ara_tester_axis) {
    return &(ara_tester_axis->dir_pin);
}

static inline void ara_tester_axis_init(struct ara_tester_axis* ara_tester_axis, int pulse_pin, int dir_pin, unsigned long pulse_width, hrtimer_function function) {
    hrtimer_init(__ara_tester_axis_timer_pointer(ara_tester_axis), CLOCK_MONOTONIC, HRTIMER_MODE_REL);
    output_pin_init( __ara_tester_axis_pulse_pin_pointer(ara_tester_axis), pulse_pin);
    output_pin_init( __ara_tester_axis_dir_pin_pointer(ara_tester_axis), dir_pin);
    ara_tester_axis->timer.function = function;
    ara_tester_axis->pulse_width = pulse_width;
    ara_tester_axis->pulse_counter = 0;
    ara_tester_axis->counter = 0;
    ara_tester_axis->dir = 0;
    ara_tester_axis->pulse = 0;
    ara_tester_axis->movment_state = 0;
    ara_tester_axis->in_use = 0;
    ara_tester_axis->active = 0;
    ara_tester_axis->pause = 0;
}

static inline void ara_tester_axis_pause(struct ara_tester_axis* ara_tester_axis) {
    ara_tester_axis->pause = 1;
    while(hrtimer_try_to_cancel(__ara_tester_axis_timer_pointer(ara_tester_axis)));
}

static inline void ara_tester_axis_clean(struct ara_tester_axis* ara_tester_axis) {
    ara_tester_axis_pause(ara_tester_axis);
    output_pin_clean( __ara_tester_axis_pulse_pin_pointer(ara_tester_axis));
    output_pin_clean( __ara_tester_axis_dir_pin_pointer(ara_tester_axis));
}

static inline void ara_tester_axis_exec(struct ara_tester_axis* ara_tester_axis) {
    ara_tester_axis->active = 1;
    ara_tester_axis->movment_state = 0;
    ara_tester_axis->pulse = 0;
    ara_tester_axis->pulse_counter = (2 * ara_tester_axis->incremental) + ara_tester_axis->linear;
    ara_tester_axis->counter = ara_tester_axis->incremental;
    output_pin_set_state( __ara_tester_axis_dir_pin_pointer(ara_tester_axis), ara_tester_axis->dir);
    ara_tester_axis->timer.function(__ara_tester_axis_timer_pointer(ara_tester_axis));
}

static inline enum hrtimer_restart ara_tester_axis_change_state(struct ara_tester_axis* ara_tester_axis) {
    if((ara_tester_axis->counter > 1) && !ara_tester_axis->pause) {
        hrtimer_start(__ara_tester_axis_timer_pointer(ara_tester_axis), ktime_set(0, 100), HRTIMER_MODE_REL);
        --ara_tester_axis->counter;
        if(!ara_tester_axis->pulse_counter) {
            ara_tester_axis->active = 0;
        }
    }
    return HRTIMER_NORESTART;
}

#endif