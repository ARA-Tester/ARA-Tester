#ifndef _ARA_TESTER_AXIS_H
#define _ARA_TESTER_AXIS_H

#include <linux/kernel.h>
#include <linux/module.h>
#include <linux/hrtimer.h>
#include <linux/ktime.h>
#include <linux/slab.h>
#include "output_pin.h"

MODULE_LICENSE("GPL v2");

struct ara_tester_axis {
    struct output_pin pulse_pin;
    struct output_pin dir_pin;
    struct hrtimer timer;

    unsigned long t_max;
    unsigned long t_min;
    unsigned long t_delta;
    unsigned long pulse_width;

    unsigned long t_current;
    unsigned long count;

    unsigned long progressive;
    unsigned long linear;
    unsigned long counter;
    int movment_state;
    int active;
    int even;
    int dir;
    int pulse;
    int in_use;
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

static inline struct ara_tester_axis* ara_tester_axis_alloc(int pulse_pin, int dir_pin, hrtimer_function function) {
    struct ara_tester_axis* ara_tester_axis;
    ara_tester_axis = (struct ara_tester_axis*)kmalloc(sizeof(struct ara_tester_axis), GFP_KERNEL);
    if(ara_tester_axis) {
        if(output_pin_init(__ara_tester_axis_pulse_pin_pointer(ara_tester_axis), pulse_pin) || output_pin_init(__ara_tester_axis_dir_pin_pointer(ara_tester_axis), dir_pin)) {
            printk("Error: can't request one or both of that gpios: %d, %d\n", pulse_pin, dir_pin);
            kfree(ara_tester_axis);
            return NULL;
        }
        hrtimer_init(__ara_tester_axis_timer_pointer(ara_tester_axis), CLOCK_MONOTONIC, HRTIMER_MODE_REL);
        ara_tester_axis->timer.function = function;
        ara_tester_axis->active = 0;
        ara_tester_axis->in_use = 0;
        ara_tester_axis->pulse_width = 0;
        ara_tester_axis->t_max = 0;
        ara_tester_axis->t_min = 0;
        ara_tester_axis->t_delta = 0;
    }
    return ara_tester_axis;
}

static inline void ara_tester_axis_stop(struct ara_tester_axis* ara_tester_axis) {
    ara_tester_axis->active = 0;
    while(hrtimer_try_to_cancel(__ara_tester_axis_timer_pointer(ara_tester_axis)));
}

static inline void ara_tester_axis_clean(struct ara_tester_axis* ara_tester_axis) {
    if(ara_tester_axis) {
        ara_tester_axis_stop(ara_tester_axis);
        output_pin_clean(__ara_tester_axis_pulse_pin_pointer(ara_tester_axis));
        output_pin_clean(__ara_tester_axis_dir_pin_pointer(ara_tester_axis));
        kfree(ara_tester_axis);
    }
}

static inline void ara_tester_axis_exec(struct ara_tester_axis* ara_tester_axis) {
    ara_tester_axis->active = 1;
    ara_tester_axis->pulse = 0;
    ara_tester_axis->counter = 0;
    ara_tester_axis->movment_state = 0;
    ara_tester_axis->t_current = ara_tester_axis->t_max;
    ara_tester_axis->count = ara_tester_axis->progressive;
    output_pin_set_state(__ara_tester_axis_dir_pin_pointer(ara_tester_axis), ara_tester_axis->dir);
    ara_tester_axis->timer.function(__ara_tester_axis_timer_pointer(ara_tester_axis));
}

static inline enum hrtimer_restart ara_tester_axis_change_state(struct ara_tester_axis* ara_tester_axis) {
    if(ara_tester_axis->active) {
        unsigned long timeout = ara_tester_axis->pulse ? ara_tester_axis->t_current : ara_tester_axis->pulse_width;
        ara_tester_axis->pulse = !ara_tester_axis->pulse;
        output_pin_set_state(__ara_tester_axis_pulse_pin_pointer(ara_tester_axis), ara_tester_axis->pulse);
        hrtimer_start(__ara_tester_axis_timer_pointer(ara_tester_axis), ktime_set(0, timeout), HRTIMER_MODE_REL);
        if(!ara_tester_axis->pulse) {
            ara_tester_axis->counter++;
            if(ara_tester_axis->count > 1) {
                ara_tester_axis->count--;
            } else {
                switch(ara_tester_axis->movment_state) {
                    case 0: {
                        if(ara_tester_axis->linear) {
                            ara_tester_axis->movment_state = 1;
                            ara_tester_axis->count = ara_tester_axis->linear;
                            break;
                        }
                    }
                    case 1: {
                        ara_tester_axis->movment_state = 2;
                        ara_tester_axis->count = ara_tester_axis->progressive + ara_tester_axis->even;
                        break;
                    }
                    case 2: {
                        ara_tester_axis->active = 0;
                        printk("Counter %lu\n", ara_tester_axis->counter);
                        break;
                    }
                }
                return HRTIMER_NORESTART;
            }
            switch(ara_tester_axis->movment_state) {
                case 0: {
                    ara_tester_axis->t_current -= ara_tester_axis->t_delta;
                    break;
                }
                case 2: {
                    ara_tester_axis->t_current += ara_tester_axis->t_delta;
                    break;
                }
            }
        }
    }
    return HRTIMER_NORESTART;
}

#endif