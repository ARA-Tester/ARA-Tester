import { ioctl, Ioctl } from 'ioctl-ulong';
import { openIoctlSync } from 'open-ioctl';
import { closeSync } from 'fs';
import { ARA_TESTER } from './ARA_TESTER';

const nanoSecToMiliSec = 1000000;

let dir: boolean = true;
let fd: number = openIoctlSync('ara_tester_axis0');
let max: number = 5000000;
let min: number = 5000;
let delta: number = 50;
let linear: number = 1000;

function movment(dir: boolean, max: number, min: number, delta: number, linear: number): number {
    try {
        ioctl(fd, ARA_TESTER.ARA_TESTER_SET_DIR, Number(dir));
        ioctl(fd, ARA_TESTER.ARA_TESTER_SET_T_MAX, max);
        ioctl(fd, ARA_TESTER.ARA_TESTER_SET_T_MIN, min);
        ioctl(fd, ARA_TESTER.ARA_TESTER_SET_T_DELTA, delta);
        ioctl(fd, ARA_TESTER.ARA_TESTER_SET_LINEAR, linear);
        let exec: Ioctl = ioctl(fd, ARA_TESTER.ARA_TESTER_EXEC);
        let timeout: number = (max + min) / (((max - min) / delta) + 1);
        return Math.floor((timeout + (exec.data * 10) + (min * linear)) / nanoSecToMiliSec) + 1000;
    } catch(err) {
        console.log(err);
        return 0;
    }
}

function timeout(callback: () => void): void {
    var t: number = movment(dir, max, min, delta, linear);
    dir = !dir;
    console.log(t);
    if(t) {
        setTimeout(callback, t);
    } else {
        console.error('Something didn\'t worked');
        closeSync(fd);
    }
}

timeout(() => {
    timeout(() => {
        closeSync(fd);
    });
});
