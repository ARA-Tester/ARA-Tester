import { ioctl, Ioctl } from 'ioctl-ulong';
import { openIoctlSync } from 'open-ioctl';
import { closeSync } from 'fs';
import { ARA_TESTER } from './ARA_TESTER';

const nanoSecToMilliSec = 1000000;

class AraTesterAxis {
    private _id: number;
    private _fd: number;
    private _dir: boolean;
    private _max: number;
    private _min: number;
    private _delta: number;
    private _linear: number;
    private _n: number;
    private _total: number;
    private _timeout: number;
    private _millis: number;
    private _active: boolean;
    private _timer: NodeJS.Timer;
    private _resolve: (value: number) => void;
    private _reject: (reason: NodeJS.ErrnoException) => void;

    private static millis(): number {
        return (new Date()).getTime();
    }

    public constructor(id: number) {
        this._id = id;
        this._fd = openIoctlSync('ara_tester_axis' + id);
        this._active = false;
    }

    private execute(dir: boolean, max: number, min: number, delta: number, linear: number): void {
        let timeout: number;
        try {
            ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_DIR, Number(dir));
            ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_T_MAX, max);
            ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_T_MIN, min);
            ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_T_DELTA, delta);
            ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_LINEAR, linear);
            ioctl(this._fd, ARA_TESTER.ARA_TESTER_EXEC);
        } catch(err) {
            return this._reject(err);
        }
        this._n = ((max - min) / delta) + 1;
        this._dir = dir;
        this._max = max;
        this._min = min;
        this._delta = delta;
        this._linear = linear;
        max /= nanoSecToMilliSec;
        min /= nanoSecToMilliSec;
        delta /= nanoSecToMilliSec;
        timeout = (max + min) * this._n;
        this._total = (2 * this._n) + linear;
        console.log("Total: " + this._total);
        this._timeout = Math.floor(timeout + (this._total * 10 / nanoSecToMilliSec) + (min * linear)) + 2000;
        this._millis = AraTesterAxis.millis();
        this._active = true;
        this._timer = setTimeout(() => {
            let counter: Ioctl = ioctl(this._fd, ARA_TESTER.ARA_TESTER_GET_COUNTER);
            this._resolve(counter.data);
        }, this._timeout);
    }

    public exec(dir: boolean, max: number, min: number, delta: number, linear: number): Promise<number> {
        return new Promise<number>((resolve: (value: number) => void, reject: (reason: NodeJS.ErrnoException) => void) => {
            this._resolve = resolve;
            this._reject = reject;
            this.execute(dir, max, min, delta, linear);
        });
    }

    public stop(): void {
        if(this._active) {
            this._active = false;
            clearTimeout(this._timer);
            ioctl(this._fd, ARA_TESTER.ARA_TESTER_STOP);
        } else {
            throw new Error("No movment is active first call exec before using stop");
        }
    }

    public resume(): void {
        if(this._resolve) {
            this.execute(!this._dir, this._max / 2, this._min / 2, this._delta, this._linear / 2);
        } else {
            throw new Error("No movment has been stopped first call stop before using resume");
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
    axis.stop();
    setTimeout(() => {
        axis.resume();
    }, 2000)
}, 12000);