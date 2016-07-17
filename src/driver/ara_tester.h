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

static int on_open(struct inode* inode, struct file* file);
static int on_release(struct inode* inode, struct file* file);
static long on_unlocked_ioctl(struct file * file, unsigned int command, unsigned long arguemnt);
static int __init on_init(void);
static void on_exit(void);

#else

#include <sys/ioctl.h>

#endif

#define ARA_TESTER_MAGIC_NUMBER '?'

#define _ARA_TESTER_DEFINE_IOCTL(action, number) _IO##action(ARA_TESTER_MAGIC_NUMBER, number, unsigned long)

#define ARA_TESTER_EXEC _IO(ARA_TESTER_MAGIC_NUMBER, 0)
#define ARA_TESTER_STOP _IO(ARA_TESTER_MAGIC_NUMBER, 1)

#define ARA_TESTER_SET_DIRECTION _ARA_TESTER_DEFINE_IOCTL(W, 2)
#define ARA_TESTER_SET_EVEN _ARA_TESTER_DEFINE_IOCTL(W, 3)
#define ARA_TESTER_SET_PROGRESSIVE _ARA_TESTER_DEFINE_IOCTL(W, 4)
#define ARA_TESTER_SET_LINEAR _ARA_TESTER_DEFINE_IOCTL(W, 5)

#define ARA_TESTER_SET_PULSE_WIDTH _ARA_TESTER_DEFINE_IOCTL(W, 6)
#define ARA_TESTER_SET_T_MAX _ARA_TESTER_DEFINE_IOCTL(W, 7)
#define ARA_TESTER_SET_T_MIN _ARA_TESTER_DEFINE_IOCTL(W, 8)
#define ARA_TESTER_SET_T_DELTA _ARA_TESTER_DEFINE_IOCTL(W, 9)

#define ARA_TESTER_GET_ACTIVE _ARA_TESTER_DEFINE_IOCTL(R, 10)
#define ARA_TESTER_GET_COUNTER _ARA_TESTER_DEFINE_IOCTL(R, 11)
#define ARA_TESTER_GET_MOVMENT_STATE _ARA_TESTER_DEFINE_IOCTL(R, 12)

#define ARA_TESTER_LAST_IOCTL 12

#endif
