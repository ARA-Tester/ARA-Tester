#include "ara_tester_axis.h"
#include "ara_tester.h"

MODULE_LICENSE("GPL v2");
MODULE_AUTHOR("Ivo Stratev (NoHomey)");

#define __NAME__ "ara_tester"

#define _ARA_TESTER_AXIS_NUMBER 4

#define _LOG_ERR(function) printk("Error: when calling %s\n", function)

#define _HANDLE_IF_ERR(result, function, return_value) \
if(result) { \
    _LOG_ERR(function); \
    on_exit(); \
    return 1; \
} \

#define _ARA_TESTER_AXIS_FUNCTION_FACTORY(axis) \
static enum hrtimer_restart ara_tester_axis_function##axis(struct hrtimer *timer) { \
    return ara_tester_axis_change_state(ara_tester_axises + axis); \
} \

#define _ARA_TESTER_AXIS_INIT_AXIS(axis, pulse, dir, pulse_width) \
ara_tester_axis_init(ara_tester_axises + axis, pulse, dir, pulse_width, ara_tester_axis_function##axis) \

#define _ARA_TESTER_AXIS_CURRENT_AXIS(file) \
struct ara_tester_axis* ara_tester_axis = ara_tester_axises + iminor(file->f_path.dentry->d_inode) \

//static dev_t numbers;
struct ara_tester_axis ara_tester_axises[_ARA_TESTER_AXIS_NUMBER];
/*static int major = -1;
static const int first_minor = 0;
static const unsigned int minor_count = _ARA_TESTER_AXIS_NUMBER;
static struct cdev* cdev = NULL;
static struct file_operations file_operations = {
    .owner = THIS_MODULE,
    .open = on_open,
    .release = on_release,
    .unlocked_ioctl = on_unlocked_ioctl
};*/

_ARA_TESTER_AXIS_FUNCTION_FACTORY(0);
//_ARA_TESTER_AXIS_FUNCTION_FACTORY(1);
//_ARA_TESTER_AXIS_FUNCTION_FACTORY(2);
//_ARA_TESTER_AXIS_FUNCTION_FACTORY(3);   

/*static int on_open(struct inode* inode, struct file* file) {
    _ARA_TESTER_AXIS_CURRENT_AXIS(file);
    if(ara_tester_axis->in_use) {
        return -EBUSY;
    } else {
       ara_tester_axis->in_use = 1; 
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
    switch(command) {
        case ARA_TESTER_SET: {
            if(ara_tester_axis->active) {
                printk("Active: %lu\n", ara_tester_axis->counter);
                return -EBUSY;
            } else {
                if(__get_user(ara_tester_axis->counter, (unsigned long __user*)argument)) {
                    return -EFAULT;
                }
                printk("Start: %lu\n", ara_tester_axis->counter);
                ara_tester_axis_exec(ara_tester_axis);
                return 0;
            }
        }
        case ARA_TESTER_GET: {
            printk("COUNTER: %lu\n", ara_tester_axis->counter);
            return __put_user(ara_tester_axis->counter, (unsigned long __user*)argument);
        }
        default: {
            return -ENOTTY;
        }
    }
    return 0;
}*/

static int __init on_init(void) {
    printk("on_init\n");
    /*_HANDLE_IF_ERR(alloc_chrdev_region(&numbers, first_minor, minor_count, __NAME__), "alloc_chrdev_region", 1);
    major = MAJOR(numbers);
    cdev = cdev_alloc();
    cdev->owner = THIS_MODULE;
    cdev->ops = &file_operations;
    _HANDLE_IF_ERR(cdev_add(cdev, numbers, minor_count), "cdev_add", 1);*/
    _ARA_TESTER_AXIS_INIT_AXIS(0, 22, 27, 10);
    ara_tester_axises[0].t_max = 1000;
    ara_tester_axises[0].t_min = 400;
    ara_tester_axises[0].t_delta = 50;
    ara_tester_axises[0].linear = 3;
    ara_tester_axises[0].dir = 0;
    ara_tester_axis_exec(ara_tester_axises);
    //_ARA_TESTER_AXIS_INIT_AXIS(1);
    //_ARA_TESTER_AXIS_INIT_AXIS(2);
    //_ARA_TESTER_AXIS_INIT_AXIS(3);
    return 0;
}

static void on_exit(void) {
    //unsigned int i = 0;
    printk("on_exit\n");
    ara_tester_axis_clean(ara_tester_axises);
    /*for(i = 0; i < _ARA_TESTER_AXIS_NUMBER; ++i) {
        ara_tester_axis_clean(ara_tester_axises + i);
    }
    if(cdev) {
        cdev_del(cdev);
    }
    if(major > -1) {
        unregister_chrdev_region(numbers, minor_count);
    }*/
}


module_init(on_init);
module_exit(on_exit);
