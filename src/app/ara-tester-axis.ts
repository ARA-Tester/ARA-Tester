import { ioctl, Ioctl } from 'ioctl-ulong';
import { openIoctlSync } from 'open-ioctl';
import { closeSync } from 'fs';
import { AraTesterAxisConfig } from './ara-tester-axis-config';
import { ARA_TESTER } from './ARA_TESTER';

const nanoSecToMilliSec = 1000000;

export class AraTesterAxis {
    private _config: AraTesterAxisConfig;
    private _configured: number;
    private _progressive: number;
    private _fd: number;
    private _total: number;
    private _dir: boolean;
    private _even: number;
    private _active: boolean;
    private _interval: NodeJS.Timer;
    private _resolve: (value: number) => void;
    private _reject: (reason: NodeJS.ErrnoException) => void;

    private _ensureEven(progressive: number): number {
        var whole: number = progressive % 1;
        if(whole) {
            this._even = 1;
            return progressive - whole;
        }
        this._even = 0;
        return progressive - this._even;
    }

    public constructor(config: AraTesterAxisConfig) {
        this._config = config;
        this._configured = config.configured / 4;
        this._progressive = ((config.t_max - config.t_min) / config.t_delta) + 1;
        this._fd = openIoctlSync('ara_tester_axis' + config.id);
        this._active = false;
        this._even = 0;
        ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_PULSE_WIDTH, config.pulse_width);
        ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_T_MAX, config.t_max);
        ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_T_MIN, config.t_min);
        ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_T_DELTA, config.t_delta);
    }

    private _exec(): void {
        let progressive: number = 0;
        let linear: number = 0;
        let total: number = 2 * this._progressive;
        if(this._total < total) {
            progressive = this._ensureEven(this._total / 2);
        } else {
            progressive = this._ensureEven(this._progressive);
            if(this._total > total) {
                linear = this._total - total;
            }
        }
        this._total = (2 * progressive) + linear + this._even;
        console.log("Total: " + this._total);
        console.log("Progressive: " + progressive);
        console.log("Linear: " + linear);
        ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_DIR, Number(this._dir));
        ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_EVEN, this._even);
        ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_PROGRESSIVE, progressive);
        ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_LINEAR, linear);
        ioctl(this._fd, ARA_TESTER.ARA_TESTER_EXEC);
        this._interval = setInterval(() => {
            let active: Ioctl = ioctl(this._fd, ARA_TESTER.ARA_TESTER_GET_ACTIVE);
            if(!active.data) {
                clearInterval(this._interval);
                let counter: Ioctl = ioctl(this._fd, ARA_TESTER.ARA_TESTER_GET_COUNTER);
                this._resolve(counter.data);
            }
        }, 1000);
    }

    public movment(dir: boolean, distance: number): Promise<number> {
        return new Promise<number>((resolve: (value: number) => void, reject: (reason: NodeJS.ErrnoException) => void) => {
            this._resolve = resolve;
            this._reject = reject;
            this._dir = dir;
            this._total = distance * this._configured;
            this._exec();
        });
    }

    public stop(): void {
        if(this._active) {
            this._active = false;
            clearInterval(this._interval);
            ioctl(this._fd, ARA_TESTER.ARA_TESTER_STOP);
        } else {
            throw new Error("No movment is active first call exec before using stop");
        }
    }

    public resume(): void {
        if(this._resolve) {
            let counter: Ioctl = ioctl(this._fd, ARA_TESTER.ARA_TESTER_GET_COUNTER);
            this._total -= counter.data;
            this._exec();
        } else {
            throw new Error("No movment has been stopped first call stop before using resume");
        }
    }

    public release(): void {
        closeSync(this._fd);
    }
}