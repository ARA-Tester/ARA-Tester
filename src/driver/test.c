#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <stdio.h>
#include <sys/ioctl.h>
#include <stdint.h>
#include <limits.h>
#include <ara_tester_ioctl.h>

int main(void) {
    int fd0 = open("/dev/ara_tester_axis0", 3);
    uint32_t i = UINT32_MAX;
    unsigned long get;
    unsigned long set = i;
    printf("SET %lu\n", set);
    printf("error %d\nfd %d\n", errno, fd0);
    errno = 0;
    printf("ioctl %d\n", ioctl(fd0, ARA_TESTER_SET, &set));
    printf("errno %d ARA_TESTER_SET 0\n", errno);
    errno = 0;
    printf("ioctl %d\n", ioctl(fd0, ARA_TESTER_SET, &set));
    printf("errno %d ARA_TESTER_SET 0\n", errno);
    errno = 0;
    printf("ioctl %d\n", ioctl(fd0, ARA_TESTER_GET, &get));
    printf("errno %d ARA_TESTER_GET 0 get %lu\n", errno, get);
    close(fd0);
    return 0;
}
