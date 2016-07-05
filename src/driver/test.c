#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <stdio.h>
#include <sys/ioctl.h>
#include <stdint.h>
#include <limits.h>
#include <ara_tester_ioctl.h>

void test_ioctl(int fd, unsigned long cmd, uint32_t data) {
    errno = 0;
    unsigned long result = data;
    printf("ioctl %d\n", ioctl(fd, cmd, &result));
    printf("CMD: %lu errno %d result %lu\n", cmd, errno, result);
}

int main(void) {
    int fd = open("/dev/ara_tester_axis0", 3);
    printf("error %d\nfd %d\n", errno, fd);
    test_ioctl(fd, ARA_TESTER_PAUSE, 0);
    close(fd);
    return 0;
}
