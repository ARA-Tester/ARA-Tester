#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <stdio.h>
#include <sys/ioctl.h>
#include <stdint.h>
#include <limits.h>
#include <unistd.h>
#include <ara_tester_ioctl.h>

void test_ioctl(int fd, unsigned long cmd, uint32_t data) {
    errno = 0;
    unsigned long result = data;
    printf("ioctl %d\n", ioctl(fd, cmd, &result));
    printf("CMD: %lu errno %d result %lu\n", _IOC_NR(cmd), errno, result);
}

int main(void) {
    int fd = open("/dev/ara_tester_axis0", 3 | O_NONBLOCK);
    printf("error %d\nfd %d\n", errno, fd);
    test_ioctl(fd, ARA_TESTER_SET_DIR, 0);
    test_ioctl(fd, ARA_TESTER_SET_T_MAX, 1000000);
    test_ioctl(fd, ARA_TESTER_SET_T_MIN, 40000);
    test_ioctl(fd, ARA_TESTER_SET_T_DELTA, 50);
    test_ioctl(fd, ARA_TESTER_SET_LINEAR, 90000);
    test_ioctl(fd, ARA_TESTER_EXEC, 0);
    test_ioctl(fd, ARA_TESTER_PAUSE, 0);
    test_ioctl(fd, ARA_TESTER_GET_TOTAL, 0);
    test_ioctl(fd, ARA_TESTER_GET_COUNTER, 0);
    test_ioctl(fd, ARA_TESTER_GET_MOVMENT_STATE, 0);
    test_ioctl(fd, ARA_TESTER_GET_ACTIVE, 0);
    test_ioctl(fd, ARA_TESTER_RESUME, 0);
    test_ioctl(fd, ARA_TESTER_GET_ACTIVE, 0);
    test_ioctl(fd, ARA_TESTER_GET_COUNTER, 0);
    sleep(1);
    test_ioctl(fd, ARA_TESTER_GET_COUNTER, 0);
    close(fd);
    return 0;
}
