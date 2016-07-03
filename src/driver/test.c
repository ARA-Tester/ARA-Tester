#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <stdio.h>
#include <sys/ioctl.h>
#include <ara_tester_ioctl.h>

int main(void) {
    int fd0 = open("/dev/ara_tester_axis0", 3);
    unsigned long get;
    printf("error %d\nfd %d\n", errno, fd0);
    errno = 0;
    ioctl(fd0, ARA_TESTER_SET, 1000000000);
    printf("ioctl %d ARA_TESTER_SET 0\n", errno);
    errno = 0;
    ioctl(fd0, ARA_TESTER_GET, 1000000000);
    printf("ioctl %d ARA_TESTER_GET 0 %lu\n", errno, get);
    printf("error %d\nfd %d\n", errno, fd0);
    errno = 0;
    ioctl(fd0, ARA_TESTER_SET, 1000000000);
    printf("ioctl %d ARA_TESTER_SET 0\n", errno);
    errno = 0;
    ioctl(fd0, ARA_TESTER_GET, 1000000000);
    printf("ioctl %d ARA_TESTER_GET 0 %lu\n", errno, get);
    close(fd0);
    return 0;
}
