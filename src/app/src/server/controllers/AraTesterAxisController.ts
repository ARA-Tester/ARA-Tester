import { ioctl, Ioctl } from 'ioctl-ulong';
import { openIoctlSync } from 'open-ioctl';
import { closeSync } from 'fs';
import AraTesterAxisConfig from './../../share/AraTesterAxisConfig';
import AraTesterAxisDistance from './../../share/AraTesterAxisDistance';
import AraTesterAxisMovment from './../../share/AraTesterAxisMovment';
import AraTesterAxisId from './../../share/AraTesterAxisId';
import { ARA_TESTER } from './../ARA_TESTER';
import AraTesterAxisConfigService from './../services/AraTesterAxisConfigService';
import AraTesterAxisDistanceService from './../services/AraTesterAxisDistanceService';

const nanoSecToMilliSec = 1000000;

export type OnPositionChangeFactory = (id: AraTesterAxisId, position: AraTesterAxisDistance) => void;

export default class AraTesterAxisController {
    private static _AraTesterAxisConfigService: AraTesterAxisConfigService = AraTesterAxisConfigService.getService();
    private static _AraTesterAxisDistanceService: AraTesterAxisDistanceService = AraTesterAxisDistanceService.getService();
    public static onPositionChangeFactory: OnPositionChangeFactory;
    private _config: AraTesterAxisConfig;
    private _configured: number;
    private _progressive: number;
    private _id: AraTesterAxisId;
    private _fd: number;
    private _total: number;
    private _direction: boolean;
    private _even: number;
    private _position: number;
    private _active: boolean;
    private _auto: boolean;
    private _interval: NodeJS.Timer;
    private _resolve: (value: number) => void;
    private _reject: (reason: NodeJS.ErrnoException) => void;

    private _resolveWithCounter(): void {
        clearInterval(this._interval);
        this._active = false;
        let counter: Ioctl = ioctl(this._fd, ARA_TESTER.ARA_TESTER_GET_COUNTER);
        let position: AraTesterAxisDistance = { distance: this._position };
        AraTesterAxisController._AraTesterAxisDistanceService.update(this._id, position);
        AraTesterAxisController.onPositionChangeFactory(this._id, position);
        this._resolve(counter.data);
    }

    private _exec(): void {
        let progressive: number = 0;
        let linear: number = 0;
        console.log("   4        -------------------------------------------------");
        let whole: number = this._progressive % 1;
        this._even = 0;
        if(whole) {
            this._progressive -= whole;
            this._even = 1;
        }
        let total: number = 2 * (this._progressive);
        console.log(total);
        if(this._total < total) {
            if(this._total % 2) {
                ++this._even;
                progressive = (this._total - 1) / 2;
            } else {
                progressive = (this._total) / 2;
            }
        } else {
            progressive = total / 2;
            if(this._total > total) {
                linear = this._total - total;
            }
        }
        if(this._even === 2) {
            this._even = 0;
            ++progressive;
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
            if(this._active) {
                reject(new Error('Another movment is active'));
            } else {
                this._resolve = resolve;
                this._reject = reject;
                setup();
                this._exec();
            }
        });
    }

    private _automatic(direction: boolean) {
        this.movment({
            direction: direction,
            distance: 1
        }).then(() => {
            if(this._auto) {
                this._automatic(direction);
            }
        });
    }

    public constructor(axisId: number) {
        this._id = { axisId: axisId };
        this._fd = openIoctlSync('ara_tester_axis' + axisId);
        this._active = false;
        this._auto = false;
        this._even = 0;
    }

    public getConfiguration(): AraTesterAxisConfig {
        return this._config;
    }

    public getPosition(): AraTesterAxisDistance {
        return { distance: this._position };
    }

    public autoConfigurate(): Promise<Array<void>> {
        let configPromise: Promise<void> = new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {
            AraTesterAxisController._AraTesterAxisConfigService.findOne(this._id).then((config: AraTesterAxisConfig) => {
                this.configurate(config);
                resolve();
            }, reject)
        });
        let positionPromise: Promise<void> = new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {
            AraTesterAxisController._AraTesterAxisDistanceService.findOne(this._id).then((position: AraTesterAxisDistance) => {
                this._position = position.distance;
                resolve();
            }, reject)
        });
        return Promise.all([configPromise, positionPromise]);
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

    public movment(movment: AraTesterAxisMovment): Promise<number | void>  {
        if(movment.direction) {
            this._position -= movment.distance;
            if(this._position < 0) {
                movment.distance += this._position;
                this._position = 0;
            }
        } else {
            this._position += movment.distance;
            if(this._position > 172) {
                movment.distance -= (this._position - 172);
                this._position = 172;
            }
        }
        if(!movment.distance) {
            return Promise.reject(new Error('Distance must be positive number')) ;
        }
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

    public moveAuto(direction: boolean): void {
        this._auto = true;
        this._automatic(direction);
    }

    public stopAuto(): void {
        this._auto = false;
    }

    public release(): void {
        closeSync(this._fd);
    }
}