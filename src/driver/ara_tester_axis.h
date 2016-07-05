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
    unsigned long t_delta;
    unsigned long t_current;
    unsigned long linear;
    unsigned long counter;
    unsigned long total;
    int pulse;
    int movment_state;
    int dir;
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

static inline void ___print_line(void) {
    printk("---------------------\n");
}

static inline void ___print_value(struct ara_tester_axis* ara_tester_axis) {
    printk("PULSE :           ");
    if((ara_tester_axis)->pulse) {
        printk("ON \n");
    } else {
        printk("OFF\n");
    }
}

static inline void ara_tester_axis_init(struct ara_tester_axis* ara_tester_axis, int pulse_pin, int dir_pin, unsigned long pulse_width, hrtimer_function function) {
    hrtimer_init(__ara_tester_axis_timer_pointer(ara_tester_axis), CLOCK_MONOTONIC, HRTIMER_MODE_REL);
    //output_pin_init(__ara_tester_axis_pulse_pin_pointer(ara_tester_axis), pulse_pin);
    //output_pin_init(__ara_tester_axis_dir_pin_pointer(ara_tester_axis), dir_pin);
    ara_tester_axis->timer.function = function;
    ara_tester_axis->pulse_width = pulse_width;
    ara_tester_axis->t_max = 0;
    ara_tester_axis->t_min = 0;
    ara_tester_axis->t_delta = 0;
    ara_tester_axis->t_current = 0;
    ara_tester_axis->linear = 0;
    ara_tester_axis->counter = 0;
    ara_tester_axis->total = 0;
    ara_tester_axis->pulse = 0;
    ara_tester_axis->movment_state = 0;
    ara_tester_axis->dir = 0;
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
    //output_pin_clean(__ara_tester_axis_pulse_pin_pointer(ara_tester_axis));
    //output_pin_clean(__ara_tester_axis_dir_pin_pointer(ara_tester_axis));
}

static inline void ara_tester_axis_exec(struct ara_tester_axis* ara_tester_axis) {
    ara_tester_axis->total = (2 * (((ara_tester_axis->t_max - ara_tester_axis->t_min) / ara_tester_axis->t_delta) + 1)) + ara_tester_axis->linear;
    ara_tester_axis->active = 1;
    ara_tester_axis->movment_state = 0;
    ara_tester_axis->pulse = 0;
    ara_tester_axis->counter = 0;
    ara_tester_axis->movment_state = 0;
    ara_tester_axis->t_current = ara_tester_axis->t_max;
    ___print_line();
    printk("TOTAL: %lu\n", ara_tester_axis->total);
    ___print_line();
    //output_pin_set_state(__ara_tester_axis_dir_pin_pointer(ara_tester_axis), ara_tester_axis->dir);
    ara_tester_axis->timer.function(__ara_tester_axis_timer_pointer(ara_tester_axis));
}

static inline enum hrtimer_restart ara_tester_axis_change_state(struct ara_tester_axis* ara_tester_axis) {
    if(ara_tester_axis->active && !ara_tester_axis->pause) {
        unsigned long timeout = ara_tester_axis->pulse ? ara_tester_axis->t_current : ara_tester_axis->pulse_width;
        ara_tester_axis->pulse = !ara_tester_axis->pulse;
        //output_pin_set_state(__ara_tester_axis_pulse_pin_pointer(ara_tester_axis), ara_tester_axis->pulse);
        ___print_value(ara_tester_axis);
        hrtimer_start(__ara_tester_axis_timer_pointer(ara_tester_axis), ktime_set(0, timeout), HRTIMER_MODE_REL);
        if(!ara_tester_axis->pulse) {
            ara_tester_axis->counter++;
            //printk("COUNTER: %lu\n", ara_tester_axis->counter);
            switch(ara_tester_axis->movment_state) {
                case 0: {
                    if(ara_tester_axis->t_current >= ara_tester_axis->t_min + ara_tester_axis->t_delta) {
                        ara_tester_axis->t_current -= ara_tester_axis->t_delta;
                        break;
                    } else {
                        ara_tester_axis->movment_state = 1;
                        ___print_line();
                    }
                }
                case 1: {
                    if(ara_tester_axis->linear) {
                        ara_tester_axis->linear--;
                    } else {
                        ara_tester_axis->movment_state = 2;
                        ___print_line();
                    }
                    break;
                }
                case 2: {
                    if(ara_tester_axis->t_current + ara_tester_axis->t_delta <= ara_tester_axis->t_max) {
                        ara_tester_axis->t_current += ara_tester_axis->t_delta;
                    } else {
                        ara_tester_axis->active = 0;
                        ___print_line();
                        printk("COUNTER: %lu\n", ara_tester_axis->counter);
                        ___print_line();
                    }
                    break;
                }
            }
        }
    }
    return HRTIMER_NORESTART;
}

#endif
