#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <stdio.h>
#include <sys/ioctl.h>


int main(void) {
    int fd0 = open("/dev/ara_tester_axis0", 3);
    printf("error %d\nfd %d\n", errno, fd0);
    close(fd0);
    int fd1 = open("/dev/ara_tester_axis1", 3);
    printf("error %d\nfd %d\n", errno, fd1);
    close(fd1);
    int fd2 = open("/dev/ara_tester_axis2", 3);
    printf("error %d\nfd %d\n", errno, fd2);
    close(fd2);
    int fd3 = open("/dev/ara_tester_axis3", 3);
    printf("error %d\nfd %d\n", errno, fd3);
    close(fd3);
    return 0;
}