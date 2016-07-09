import { ioctl, Ioctl } from 'ioctl-ulong';
import { openIoctlSync } from 'open-ioctl';
import { closeSync } from 'fs';
import { ARA_TESTER } from './ARA_TESTER';

let fd: number = openIoctlSync('ara_tester_axis0');

console.log(ioctl(fd, ARA_TESTER.ARA_TESTER_SET_DIR, 1));
console.log(ioctl(fd, ARA_TESTER.ARA_TESTER_SET_T_MAX, 1000000));
console.log(ioctl(fd, ARA_TESTER.ARA_TESTER_SET_T_MIN, 40000));
console.log(ioctl(fd, ARA_TESTER.ARA_TESTER_SET_T_DELTA, 50));
console.log(ioctl(fd, ARA_TESTER.ARA_TESTER_SET_LINEAR, 90000));
console.log(ioctl(fd, ARA_TESTER.ARA_TESTER_EXEC));
console.log(ioctl(fd, ARA_TESTER.ARA_TESTER_PAUSE));
console.log(ioctl(fd, ARA_TESTER.ARA_TESTER_GET_TOTAL));
console.log(ioctl(fd, ARA_TESTER.ARA_TESTER_GET_COUNTER));
console.log(ioctl(fd, ARA_TESTER.ARA_TESTER_GET_MOVMENT_STATE));
console.log(ioctl(fd, ARA_TESTER.ARA_TESTER_GET_ACTIVE));
console.log(ioctl(fd, ARA_TESTER.ARA_TESTER_RESUME));
console.log(ioctl(fd, ARA_TESTER.ARA_TESTER_GET_ACTIVE));
console.log(ioctl(fd, ARA_TESTER.ARA_TESTER_GET_COUNTER));

closeSync(fd);