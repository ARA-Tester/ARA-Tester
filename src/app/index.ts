import { ioctl, Ioctl } from 'ioctl-ulong';
import { openIoctlSync } from 'open-ioctl';
import { closeSync } from 'fs';
import { ARA_TESTER } from './ARA_TESTER';

let dir: boolean = true;
let fd: number = openIoctlSync('ara_tester_axis0');
let max: number = 1000000;
let min: number = 40000;
let delta: number = 50;
let linear: number = 90000;


function movment(dir: boolean, max: number, min: number, delta: number, linear: number): number {
    try {
        ioctl(fd, ARA_TESTER.ARA_TESTER_SET_DIR, Number(dir);
        ioctl(fd, ARA_TESTER.ARA_TESTER_SET_T_MAX, max);
        ioctl(fd, ARA_TESTER.ARA_TESTER_SET_T_MIN, min);
        ioctl(fd, ARA_TESTER.ARA_TESTER_SET_T_DELTA, delta);
        ioctl(fd, ARA_TESTER.ARA_TESTER_SET_T_LINEAR, linear);
        let exec: Ioctl = ioctl(fd, ARA_TESTER.ARA_TESTER_EXEC);
        let timeout: number = 0;
        for(let i: number = max; i >= min; i -= delta) {
            timeout += i / 1000;
        }
        return (timeout * 2) + Math.floor(exec.data / 100) + (min / 1000 * linear) + 1;

    } catch(err: NodeJS.ErrnoException) {
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