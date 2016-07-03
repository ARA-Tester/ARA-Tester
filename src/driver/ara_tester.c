#include "ara_tester_axis.h"
#include "ara_tester.h"

MODULE_LICENSE("GPL v2");
MODULE_AUTHOR("Ivo Stratev (NoHomey)");

#define __NAME__ "ara_tester"
#define _ARA_TESTER_GET_MINOR(file) iminor(file->f_path.dentry->d_inode)
#define _HANDLE_IF_ERR(return_value, function) if(return_value) { printk("Error: when calling %s\n", function); on_exit(); return 1; }

static dev_t numbers;
static const int first_minor = 0;
static const unsigned int minor_count = 4;
static struct cdev* cdev = NULL;
static struct file_operations file_operations = {
    .owner = THIS_MODULE,
    .open = on_open,
    .release = on_release,
    .unlocked_ioctl = on_unlocked_ioctl
};

static int on_open(struct inode* inode, struct file* file) {
    printk("OPEN: %u\n", _ARA_TESTER_GET_MINOR(file));
    return 0;
}

static int on_release(struct inode* inode, struct file* file) {
    return 0;
}

static long on_unlocked_ioctl(struct file * file, unsigned int command, unsigned long arguemnt) {
    return 0;
}

static int __init on_init(void) {
    printk("on_init\n");
    _HANDLE_IF_ERR(alloc_chrdev_region(&numbers, first_minor, minor_count, __NAME__), "alloc_chrdev_region");
    cdev = cdev_alloc();
    cdev->owner = THIS_MODULE;
    cdev->ops = &file_operations;
    _HANDLE_IF_ERR(cdev_add(cdev, numbers, minor_count), "cdev_add");
    return 0;
}

static void on_exit(void) {
    printk("on_exit\n");
}


module_init(on_init);
module_exit(on_exit);