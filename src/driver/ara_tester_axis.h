#ifndef _ARA_TESTER_AXIS_H
#define _ARA_TESTER_AXIS_H

#include <linux/kernel.h>
#include <linux/module.h>
#include <linux/hrtimer.h>
#include <linux/ktime.h>
#include <linux/slab.h>
#include "output_pin.h"

MODULE_LICENSE("GPL v2");

#define _ARA_TESTER_AXIS_HIGH_LEVEL_WIDTH 10

struct ara_tester_axis {
    struct output_pin pulse_pin;
    struct output_pin dir_pin;
    struct hrtimer timer;
    unsigned long t_max;
    unsigned long t_min;
    unsigned long t_delta;
    unsigned long t_current;
    unsigned long linear;
    unsigned long counter;
    int pulse;
    int movment_state;
    int dir;
    int in_use;
    int active;
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
        ara_tester_axis->t_max = 0;
        ara_tester_axis->t_min = 0;
        ara_tester_axis->t_delta = 0;
        ara_tester_axis->t_current = 0;
        ara_tester_axis->linear = 0;
        ara_tester_axis->counter = 0;
        ara_tester_axis->pulse = 0;
        ara_tester_axis->movment_state = 0;
        ara_tester_axis->dir = 0;
        ara_tester_axis->in_use = 0;
        ara_tester_axis->active = 0;;
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
    output_pin_set_state(__ara_tester_axis_dir_pin_pointer(ara_tester_axis), ara_tester_axis->dir);
    ara_tester_axis->timer.function(__ara_tester_axis_timer_pointer(ara_tester_axis));
}

static inline enum hrtimer_restart ara_tester_axis_change_state(struct ara_tester_axis* ara_tester_axis) {
    if(ara_tester_axis->active) {
        unsigned long timeout = ara_tester_axis->pulse ? ara_tester_axis->t_current : _ARA_TESTER_AXIS_HIGH_LEVEL_WIDTH;
        ara_tester_axis->pulse = !ara_tester_axis->pulse;
        output_pin_set_state(__ara_tester_axis_pulse_pin_pointer(ara_tester_axis), ara_tester_axis->pulse);
        hrtimer_start(__ara_tester_axis_timer_pointer(ara_tester_axis), ktime_set(0, timeout), HRTIMER_MODE_REL);
        if(!ara_tester_axis->pulse) {
            ara_tester_axis->counter++;
            switch(ara_tester_axis->movment_state) {
                case 0: {
                    if(ara_tester_axis->t_current >= ara_tester_axis->t_min + ara_tester_axis->t_delta) {
                        ara_tester_axis->t_current -= ara_tester_axis->t_delta;
                        break;
                    } else {
                        ara_tester_axis->movment_state = 1;
                    }
                }
                case 1: {
                    if(ara_tester_axis->linear) {
                        ara_tester_axis->linear--;
                    } else {
                        ara_tester_axis->movment_state = 2;
                    }
                    break;
                }
                case 2: {
                    if(ara_tester_axis->t_current + ara_tester_axis->t_delta <= ara_tester_axis->t_max) {
                        ara_tester_axis->t_current += ara_tester_axis->t_delta;
                    } else {
                        ara_tester_axis->active = 0;
                    }
                    break;
                }
            }
        }
    }
    return HRTIMER_NORESTART;
}

#endif
