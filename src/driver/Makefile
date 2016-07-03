#Makefile
__name__ = ara_tester
__device__ = /dev/$(__name__)_axis
__mode__ = 666
__major__ = $(shell grep -o "[0-9]\+ $(__name__)" /proc/devices | grep -o -m 1 "[0-9]\+")
__minor__ = 0 1 2 3
__ioctl_header__ = /usr/include/$(__name__)_ioctl.h
make_module_action = make -C /lib/modules/$(shell uname -r)/build M=$(PWD)
ccflags-y := -O3
obj-m := $(__name__).o

all: clean
	$(make_module_action) modules

clean:
	$(make_module_action) clean

load: header
	dmesg -c
	clear
	insmod $(__name__).ko

device:
	$(foreach number,$(__minor__),mknod $(__device__)$(number) c $(__major__) $(number);chmod $(__mode__) $(__device__)$(number);)

unload:
	rmmod -f $(__name__)
	rm -f $(__device__)*

header:
	rm -f $(__ioctl_header__)
	cp $(__name__).h $(__ioctl_header__)
	chmod 555 $(__ioctl_header__)