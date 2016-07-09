import { ioctl, Ioctl } from 'ioctl-ulong';
import { openIoctlSync } from 'open-ioctl';
import { closeSync } from 'fs';
import { ARA_TESTER } from './ARA_TESTER';

const nanoSecToMiliSec = 1000000;

let dir: boolean = true;
let fd: number = openIoctlSync('ara_tester_axis0');
let max: number = 50000;
let min: number = 4000;
let delta: number = 50;
let linear: number = 1000000;


function movment(dir: boolean, max: number, min: number, delta: number, linear: number): number {
    try {
        ioctl(fd, ARA_TESTER.ARA_TESTER_SET_DIR, Number(dir));
        ioctl(fd, ARA_TESTER.ARA_TESTER_SET_T_MAX, max);
        ioctl(fd, ARA_TESTER.ARA_TESTER_SET_T_MIN, min);
        ioctl(fd, ARA_TESTER.ARA_TESTER_SET_T_DELTA, delta);
        ioctl(fd, ARA_TESTER.ARA_TESTER_SET_LINEAR, linear);
        let exec: Ioctl = ioctl(fd, ARA_TESTER.ARA_TESTER_EXEC);
        let timeout: number = 0;
        for(let i: number = max; i >= min; i -= delta) {
            timeout += i / nanoSecToMiliSec;
        }
        return Math.floor((timeout * 2) + (exec.data / nanoSecToMiliSec * 10) + (min / nanoSecToMiliSec * linear)) + 1000;

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
