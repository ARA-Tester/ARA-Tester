import { ioctl, Ioctl } from 'ioctl-ulong';
import { openIoctlSync } from 'open-ioctl';
import { closeSync } from 'fs';
import AraTesterAxisConfig from './../../share/AraTesterAxisConfig';
import AraTesterAxisMovment from './../../share/AraTesterAxisMovment';
import AraTesterAxisId from './../../share/AraTesterAxisId';
import { ARA_TESTER } from './../ARA_TESTER';
import AraTesterAxisConfigService from './../services/AraTesterAxisConfigService';

const nanoSecToMilliSec = 1000000;

export default class AraTesterAxisController {
    private static _AraTesterAxisConfigService: AraTesterAxisConfigService = AraTesterAxisConfigService.getService();
    private _config: AraTesterAxisConfig;
    private _configured: number;
    private _progressive: number;
    private _id: AraTesterAxisId;
    private _fd: number;
    private _total: number;
    private _direction: boolean;
    private _even: number;
    private _active: boolean;
    private _interval: NodeJS.Timer;
    private _resolve: (value: number) => void;
    private _reject: (reason: NodeJS.ErrnoException) => void;

    private _resolveWithCounter(): void {
        clearInterval(this._interval);
        this._active = false;
        let counter: Ioctl = ioctl(this._fd, ARA_TESTER.ARA_TESTER_GET_COUNTER);
        this._resolve(counter.data);
    }

    private _exec(): void {
        let progressive: number = 0;
        let linear: number = 0;
        console.log("   4        -------------------------------------------------");
        this._progressive += (this._progressive % 1);
        let total: number = 2 * (this._progressive);
        console.log(total);
        if(this._total < total) {
            this._even = this._total % 2 ? 1 : 0;
            progressive = (this._total - this._even) / 2;
        } else {
            progressive = total / 2;
            if(this._total > total) {
                linear = this._total - total;
            }
        }
        console.log("   5        -------------------------------------------------");
        console.log(linear);
        console.log("   6        -------------------------------------------------");
        console.log(this._even);
        this._total = (2 * progressive) + linear + this._even;
        console.log("   (3)      -------------------------------------------------");
        console.log(this._total);
        console.log("   (2)      -------------------------------------------------");
        console.log(progressive);
        console.log("   (5)      -------------------------------------------------");
        console.log(linear);
        console.log("   (6)      -------------------------------------------------");
        console.log(this._even);
        ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_DIRECTION, Number(this._direction));
        ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_EVEN, this._even);
        ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_PROGRESSIVE, progressive);
        ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_LINEAR, linear);
        ioctl(this._fd, ARA_TESTER.ARA_TESTER_EXEC);
        this._active = true;
        this._interval = setInterval(() => {
            let active: Ioctl = ioctl(this._fd, ARA_TESTER.ARA_TESTER_GET_ACTIVE);
            if(!active.data) {
                this._resolveWithCounter();
            }
        }, 1);
    }

    private _prepareMovment(setup: () => void): Promise<number> {
        return new Promise<number>((resolve: (value: number) => void, reject: (reason: NodeJS.ErrnoException) => void) => {
            let counter: Ioctl = ioctl(this._fd, ARA_TESTER.ARA_TESTER_GET_COUNTER);
            this._resolve = resolve;
            this._reject = reject;
            setup();
            this._exec();
        });
    }

    public constructor(axisId: number) {
        this._id = { axisId: axisId };
        this._fd = openIoctlSync('ara_tester_axis' + axisId);
        this._active = false;
        this._even = 0;
    }

    public getConfiguration(): AraTesterAxisConfig {
        return this._config;
    }

    public autoConfigurate(): Promise<void> {
        return new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {
            AraTesterAxisController._AraTesterAxisConfigService.findOne(this._id).then((config: AraTesterAxisConfig) => {
                this.configurate(config);
                resolve();
            }, reject)
        });
    }

    public configurate(config: AraTesterAxisConfig): void {
        if(!this._active) {
            this._config = config;
            console.log("   input    ------------------------------------------------");
            console.log(config);
            console.log("   1        -------------------------------------------------");
            this._configured = config.configured / 4;
            console.log(this._configured);
            console.log("   2        -------------------------------------------------");
            let dif: number = config.tMax - config.tMin;
            console.log(dif);
            let div: number = dif / config.tDelta;
            console.log(div);
            console.log(div + 1);
            this._progressive = div + 1;
            ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_PULSE_WIDTH, config.pulseWidth);
            ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_T_MAX, config.tMax);
            ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_T_MIN, config.tMin);
            ioctl(this._fd, ARA_TESTER.ARA_TESTER_SET_T_DELTA, config.tDelta);
        }
    }

    public update(config: AraTesterAxisConfig): Promise<void> {
        this.configurate(config);
        return AraTesterAxisController._AraTesterAxisConfigService.update(this._id, config);
    }

    public movment(movment: AraTesterAxisMovment): Promise<number> {
        return this._prepareMovment((): void => {
            this._direction = movment.direction;
            this._total = movment.distance * this._configured;
            console.log("   3        -------------------------------------------------");
            console.log(this._total);
        });
    }

    public stop(): void {
        if(this._active) {
            ioctl(this._fd, ARA_TESTER.ARA_TESTER_STOP);
            this._resolveWithCounter();
        } else {
            throw new Error("No movment is active first call exec before using stop");
        }
    }

    public resume(): Promise<number> {
        return this._prepareMovment((): void => {
            let counter: Ioctl = ioctl(this._fd, ARA_TESTER.ARA_TESTER_GET_COUNTER);
            this._total -= counter.data;
        });
    }

    public release(): void {
        closeSync(this._fd);
    }
}