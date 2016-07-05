let fs = require('fs');
let constants = require('constants');
let ioctl = require('bindings')('ulong_ioctl.node');
const {ARA_TESTER} = require('./ara_tester');

let fd = fs.openSync('/dev/ara_tester_axis0', 3 | constants.O_NONBLOCK);

console.log(ioctl(fd, ARA_TESTER.ARA_TESTER_SET_DIR, 0));
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

fs.closeSync(fd);