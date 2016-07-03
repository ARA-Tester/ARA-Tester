#ifndef _ARA_TESTER_H
#define _ARA_TESTER_H

#ifdef __KERNEL__

#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/types.h>
#include <linux/stat.h>
#include <linux/fs.h>
#include <linux/cdev.h>
#include <linux/ioctl.h>
#include <linux/slab.h>
#include <asm/uaccess.h>
#include <asm/errno.h>
#include "ara_tester_axis.h"

/*static int on_open(struct inode* inode, struct file* file);
static int on_release(struct inode* inode, struct file* file);
static long on_unlocked_ioctl(struct file * file, unsigned int command, unsigned long arguemnt);*/
static int __init on_init(void);
static void on_exit(void);

#else

#include <sys/ioctl.h>

#endif

#define ARA_TESTER_MAGIC_NUMBER '?'
#define ARA_TESTER_SET _IOW(ARA_TESTER_MAGIC_NUMBER, 0, unsigned long)
#define ARA_TESTER_GET _IOR(ARA_TESTER_MAGIC_NUMBER, 1, unsigned long)

#endif
