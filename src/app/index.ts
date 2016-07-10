import { ioctl, Ioctl } from 'ioctl-ulong';
import { openIoctlSync } from 'open-ioctl';
import { closeSync } from 'fs';
import { ARA_TESTER } from './ARA_TESTER';

const nanoSecToMiliSec = 1000000;

class AraTesterAxis {
    private _id: number;
    private _fd: number;
    private _total: number;
    private _timeout: number;
    private _lastMillis: number;
    private _active: boolean;
    private _pause: boolean;
    private _timer: NodeJS.Timer;
    private _resolve: (value: number) => void;
    private _reject: (reason: NodeJS.ErrnoException) => void;

    private static millis(): number {
        return (new Date()).getTime();
    }

    private setTimer(): void {
        this._lastMillis = AraTesterAxis.millis();
        this._pause = false;
        this._timer = setTimeout(() => {
            let counter: Ioctl = ioctl(this._fd, ARA_TESTER.ARA_TESTER_GET_COUNTER);
            this._resolve(counter.data);
        }, this._timeout);
    }

    public constructor(id: number) {
        this._id = id;
        this._fd = openIoctlSync('ara_tester_axis' + id);
        this._active = false;
        this._pause = false;
    }

    public exec(dir: boolean, max: number, min: number, delta: number, linear: number): Promise<number> {
        return new Promise<number>((resolve: (value: number) => void, reject: (reason: NodeJS.ErrnoException) => void) => {
            let exec: Ioctl;
            let timeout: number;
            this._resolve = resolve;
            this._reject = reject;
            try {
                ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_DIR, Number(dir));
                ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_T_MAX, max);
                ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_T_MIN, min);
                ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_T_DELTA, delta);
                ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_LINEAR, linear);
                exec = ioctl(this._fd, ARA_TESTER.ARA_TESTER_EXEC);
            } catch(err) {
                return this._reject(err);
            }
            max /= nanoSecToMiliSec;
            min /= nanoSecToMiliSec;
            delta /= nanoSecToMiliSec;
            timeout = (max + min) * (((max - min) / delta) + 1);
            this._total = exec.data;
            console.log("Total: " + this._total);
            this._timeout = Math.floor(timeout + (this._total * 10 / nanoSecToMiliSec) + (min * linear)) + 2000;
            this._active = true;
            this.setTimer();
        });
    }

    public pause(): void {
        if(!this._pause && this._active) {
            this._pause = true;
            clearTimeout(this._timer);
            this._timeout -= (AraTesterAxis.millis() - this._lastMillis);
            ioctl(this._fd, ARA_TESTER.ARA_TESTER_PAUSE);
        }
    }

    public resume(): void {
        if(this._pause && this._active) {
            ioctl(this._fd, ARA_TESTER.ARA_TESTER_RESUME);
            this.setTimer();        
        }
    }

    public release(): void {
        closeSync(this._fd);
    }
}


let axis: AraTesterAxis = new AraTesterAxis(0);
let dir: boolean = false;
let max: number = 1000000;
let min: number = 40000;
let delta: number = 50;
let linear: number = 90000;
let exec: Promise<number> = axis.exec(dir, max, min, delta, linear);
exec.then((count: number) => {
    console.log("Counter: " + count);
    axis.release();
}).catch((err: NodeJS.ErrnoException) => console.log("Error: " + JSON.stringify(err)));

setTimeout(() => {
    axis.pause();
    setTimeout(() => {
        axis.resume();
    }, 2000)
}, 12000);
