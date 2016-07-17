#include "ara_tester_axis.h"
#include "ara_tester.h"

MODULE_LICENSE("GPL v2");
MODULE_AUTHOR("Ivo Stratev (NoHomey)");

#define __NAME__ "ara_tester"

#define _ARA_TESTER_AXIS_NUMBER 4

#define _LOG_ERR(function) printk("Error: when calling %s\n", function)

#define _HANDLE_IF_ERR(return_value, function) \
if(return_value) { \
    _LOG_ERR(function); \
    on_exit(); \
    return 1; \
} \

#define _ARA_TESTER_AXIS_FUNCTION_FACTORY(axis) \
static enum hrtimer_restart ara_tester_axis_function##axis(struct hrtimer *timer) { \
    return ara_tester_axis_change_state(_ara_tester_axises[axis]); \
} \

#define _ARA_TESTER_AXIS_USING() \
unsigned int _ara_ara_tester_axises_number; \
struct ara_tester_axis** _ara_tester_axises \

#define _ARA_TESTER_AXIS_USING_AXISES(axises) \
_ara_ara_tester_axises_number = axises; \
_ara_tester_axises = (struct ara_tester_axis**)kmalloc(axises * sizeof(struct ara_tester_axis*), GFP_KERNEL) \

#define _HANDLE_IF_NO_MEMORY(pointer) \
if(!pointer) { \
    _LOG_ERR("ara_tester_axis_init"); \
    on_exit(); \
    return -ENOMEM; \
} \

#define _ARA_TESTER_AXIS_CREATE_AXIS(axis, pulse, dir) \
_HANDLE_IF_NO_MEMORY(_ara_tester_axises); \
_ara_tester_axises[axis] = ara_tester_axis_alloc(pulse, dir, ara_tester_axis_function##axis); \
_HANDLE_IF_NO_MEMORY(_ara_tester_axises[axis]) \

#define _ARA_TESTER_AXIS_CURRENT_AXIS(file) \
struct ara_tester_axis* ara_tester_axis = _ara_tester_axises[iminor(file->f_path.dentry->d_inode)] \

#define _ARA_TESTER_AXIS_CLEAN() \
unsigned int __counter__; \
for(__counter__ = 0; __counter__ < _ara_ara_tester_axises_number; ++__counter__) { \
    ara_tester_axis_clean(_ara_tester_axises[__counter__]); \
} \
if(_ara_tester_axises) { \
    kfree(_ara_tester_axises); \
} \

_ARA_TESTER_AXIS_USING();
static dev_t numbers;
static int major = -1;
static const int first_minor = 0;
static const unsigned int minor_count = _ARA_TESTER_AXIS_NUMBER;
static struct cdev* cdev = NULL;
static struct file_operations file_operations = {
    .owner = THIS_MODULE,
    .open = on_open,
    .release = on_release,
    .unlocked_ioctl = on_unlocked_ioctl
};

_ARA_TESTER_AXIS_FUNCTION_FACTORY(0);
//_ARA_TESTER_AXIS_FUNCTION_FACTORY(1);
//_ARA_TESTER_AXIS_FUNCTION_FACTORY(2);
//_ARA_TESTER_AXIS_FUNCTION_FACTORY(3);   

static int on_open(struct inode* inode, struct file* file) {
    _ARA_TESTER_AXIS_CURRENT_AXIS(file);
    if(ara_tester_axis->in_use) {
        return -EBUSY;
    } else {
       ara_tester_axis->in_use = 1;
       /*ara_tester_axis->pulse_width = 0;
       ara_tester_axis->t_max = 0;
       ara_tester_axis->t_min = 0;
       ara_tester_axis->t_delta = 0;*/
    }
    return 0;
}

static int on_release(struct inode* inode, struct file* file) {
    _ARA_TESTER_AXIS_CURRENT_AXIS(file);
    ara_tester_axis->in_use = 0;
    return 0;
}

static long on_unlocked_ioctl(struct file * file, unsigned int command, unsigned long argument) {
    _ARA_TESTER_AXIS_CURRENT_AXIS(file);
    if(_IOC_TYPE(command) != ARA_TESTER_MAGIC_NUMBER) {
		printk("Error: ioctl magic number isn't device driver's one\n");
		return -ENOTTY;
	}
	if(_IOC_NR(command) > ARA_TESTER_LAST_IOCTL) {
		printk("Error: ioctl command exceeds last implemented command\n");
		return -ENOTTY;
	}
    if(ara_tester_axis->active && ((command == ARA_TESTER_SET_DIR) || (command == ARA_TESTER_SET_PROGRESSIVE) || (command == ARA_TESTER_SET_LINEAR) || (command == ARA_TESTER_EXEC))) {
        return -EALREADY;
    }
    switch(command) {
        #define _ARA_TESTER_INPUT(input) \
        return get_user(ara_tester_axis->input, (unsigned long __user*)argument) \

        #define _ARA_TESTER_OUTPUT(output) \
        return put_user(ara_tester_axis->output, (unsigned long __user*)argument) \

        #define _ARA_TESTER_CONST_INPUT(input) \
        if(ara_tester_axis->input) { \
            return -EALREADY; \
        } \
        _ARA_TESTER_INPUT(input) \

        case ARA_TESTER_EXEC: {
            ara_tester_axis_exec(ara_tester_axis);
            break;
        }
        case ARA_TESTER_STOP: {
            ara_tester_axis_stop(ara_tester_axis);
            break;
        }
        case ARA_TESTER_SET_DIRECTION: {
            _ARA_TESTER_INPUT(direction);
        }
        case ARA_TESTER_SET_EVEN: {
            _ARA_TESTER_INPUT(even);
        }
        case ARA_TESTER_SET_PROGRESSIVE: {
            _ARA_TESTER_INPUT(progressive);
        }
        case ARA_TESTER_SET_LINEAR: {
            _ARA_TESTER_INPUT(linear);
        }
        case ARA_TESTER_SET_PULSE_WIDTH: {
            _ARA_TESTER_INPUT(pulse_width);
        }
        case ARA_TESTER_SET_T_MAX: {
            _ARA_TESTER_INPUT(t_max);
        }
        case ARA_TESTER_SET_T_MIN: {
            _ARA_TESTER_INPUT(t_min);
        }
        case ARA_TESTER_SET_T_DELTA: {
           _ARA_TESTER_INPUT(t_delta);
        }
        case ARA_TESTER_GET_ACTIVE: {
            _ARA_TESTER_OUTPUT(active);
        }
        case ARA_TESTER_GET_COUNTER: {
            _ARA_TESTER_OUTPUT(counter);
        }
        case ARA_TESTER_GET_MOVMENT_STATE: {
            _ARA_TESTER_OUTPUT(movment_state);
        }

        #undef _ARA_TESTER_INPUT
        #undef _ARA_TESTER_OUTPUT
        #undef _ARA_TESTER_CONST_INPUT
    }
    return 0;
}

static int __init on_init(void) {
    _HANDLE_IF_ERR(alloc_chrdev_region(&numbers, first_minor, minor_count, __NAME__), "alloc_chrdev_region");
    major = MAJOR(numbers);
    cdev = cdev_alloc();
    cdev->owner = THIS_MODULE;
    cdev->ops = &file_operations;
    _HANDLE_IF_ERR(cdev_add(cdev, numbers, minor_count), "cdev_add");
    _ARA_TESTER_AXIS_USING_AXISES(1);
    _ARA_TESTER_AXIS_CREATE_AXIS(0, 22, 17);
    return 0;
}

static void on_exit(void) {
    _ARA_TESTER_AXIS_CLEAN();
    if(cdev) {
        cdev_del(cdev);
    }
    if(major > -1) {
        unregister_chrdev_region(numbers, minor_count);
    }
}

module_init(on_init);
module_exit(on_exit);

#undef __NAME__
#undef _ARA_TESTER_AXIS_NUMBER
#undef _LOG_ERR
#undef _HANDLE_IF_ERR
#undef _ARA_TESTER_AXIS_USING
#undef _ARA_TESTER_AXIS_USING_AXISES
#undef _ARA_TESTER_AXIS_FUNCTION_FACTORY
#undef _ARA_TESTER_AXIS_CREATE_AXIS
#undef _ARA_TESTER_AXIS_CURRENT_AXIS
#undef _ARA_TESTER_AXIS_CLEAN
