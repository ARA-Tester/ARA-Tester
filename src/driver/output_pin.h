#ifndef _OUTPUT_PIN_H
#define _OUTPUT_PIN_H

#include <linux/gpio.h>

struct output_pin {
    int pin;
    int state;
};

static inline void output_pin_init(struct output_pin* output_pin, int pin) {
    output_pin->pin = pin;
    output_pin->state = 0;
    /*if(gpio_request(pin, "output_pin pin")) {
        printk(KERN_ERR "Fail to request gpio %d\n", pin);
        return;
    }
    gpio_direction_output(output_pin->pin, output_pin->state);*/
}

static inline void output_pin_clean(struct output_pin* output_pin) {
    //gpio_free(output_pin->pin);
}

static inline void output_pin_set_state(struct output_pin* output_pin, int state) {
    output_pin->state = state;
    //gpio_set_value(output_pin->pin, output_pin->state);
}

#endif