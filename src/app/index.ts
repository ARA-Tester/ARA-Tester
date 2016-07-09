import { ioctl, Ioctl } from 'ioctl-ulong';
import { openIoctlSync } from 'open-ioctl';
import { closeSync } from 'fs';
import { ARA_TESTER } from './ARA_TESTER';

const nanoSecToMiliSec = 1000000;

let dir: boolean = true;
let fd: number = openIoctlSync('ara_tester_axis0');
let max: number = 1000000;
let min: number = 40000;
let delta: number = 50;
let linear: number = 90000;
let count: number = 0;

function movment(dir: boolean, max: number, min: number, delta: number, linear: number): number {
    ioctl(fd, ARA_TESTER.ARA_TESTER_SET_DIR, Number(dir));
    ioctl(fd, ARA_TESTER.ARA_TESTER_SET_T_MAX, max);
    ioctl(fd, ARA_TESTER.ARA_TESTER_SET_T_MIN, min);
    ioctl(fd, ARA_TESTER.ARA_TESTER_SET_T_DELTA, delta);
    ioctl(fd, ARA_TESTER.ARA_TESTER_SET_LINEAR, linear);
    let exec: Ioctl = ioctl(fd, ARA_TESTER.ARA_TESTER_EXEC);
    max /= nanoSecToMiliSec;
    min /= nanoSecToMiliSec;
    delta /= nanoSecToMiliSec;
    let timeout: number = (max + min) * (((max - min) / delta) + 1);
    return Math.floor(timeout + (exec.data * 10 / nanoSecToMiliSec) + (min * linear)) + 2000;
}

function timeout(callback: () => void): void {
    if(count === 6) {
        closeSync(fd); 
    } else {
        var t: number = movment(dir, max, min, delta, linear);
        dir = !dir;
        count++;
        setTimeout(callback, t);
    }
}


function movLoop(): void {
	timeout(movLoop);
}

movLoop();
