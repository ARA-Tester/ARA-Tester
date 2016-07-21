import AppSocket from './AppSocket';
import AraTesterAxisConfig from './../../share/AraTesterAxisConfig';
import AraTesterAxisDistance from './../../share/AraTesterAxisDistance';
import AraTesterAxisMovment from './../../share/AraTesterAxisMovment';
import AraTesterAxisDirection from './../../share/AraTesterAxisDirection';

export type MovmentEventHandler = (position: AraTesterAxisDistance) => void;

export default class AraTesterAxisService {
    private static _AppSocket: AppSocket;
    private _axisId: number;
    private _onMovmentStart: MovmentEventHandler;
    private _onMovmentEnd: MovmentEventHandler;

    public constructor(axisId: number) {
        this._axisId = axisId;
        AraTesterAxisService._AppSocket = AppSocket.getSocket();
    }

    public onMovmentStart(handler: MovmentEventHandler): void {
        this._onMovmentStart = handler;
        AraTesterAxisService._AppSocket.subscribe(`/AraTesterAxisOnMovmentStart/${this._axisId}`, handler);
    }

    public onMovmentEnd(handler: MovmentEventHandler): void {
        this._onMovmentEnd = handler;
        AraTesterAxisService._AppSocket.subscribe(`/AraTesterAxisOnMovmentEnd/${this._axisId}`, handler);
    }

    public removeMovmentStart(): void {
        AraTesterAxisService._AppSocket.unsubscribe(`/AraTesterAxisOnMovmentStart/${this._axisId}`, this._onMovmentStart);
    }

    public removeMovmentEnd(): void {
        AraTesterAxisService._AppSocket.unsubscribe(`/AraTesterAxisOnMovmentEnd/${this._axisId}`, this._onMovmentEnd);
    }

    public getConfiguration(): Promise<AraTesterAxisConfig> {
        return AraTesterAxisService._AppSocket.request<void, AraTesterAxisConfig>('get', `/AraTesterAxisGetConfiguration/${this._axisId}`);
    }

    public getPosition(): Promise<AraTesterAxisDistance> {
        return AraTesterAxisService._AppSocket.request<void, AraTesterAxisDistance>('get', `/AraTesterAxisGetPosition/${this._axisId}`);
    }

    public saveConfiguration(config: AraTesterAxisConfig): Promise<void> {
        return AraTesterAxisService._AppSocket.request<AraTesterAxisConfig, void>('patch', `/AraTesterAxisSaveConfiguration/${this._axisId}`, config);
    }

    public movmnet(info: AraTesterAxisMovment):  Promise<void> {
        return AraTesterAxisService._AppSocket.request<AraTesterAxisMovment, void>('post', `/AraTesterAxisMovment/${this._axisId}`, info);
    }

    public stop(): Promise<void> {
        return AraTesterAxisService._AppSocket.request<void, void>('get', `/AraTesterAxisStop/${this._axisId}`);
    }

    public moveAuto(direction: AraTesterAxisDirection) {
        return AraTesterAxisService._AppSocket.request<AraTesterAxisDirection, void>('post', `/AraTesterAxisMoveAuto/${this._axisId}`, direction);
    }

    public stopAuto(): Promise<void> {
        return AraTesterAxisService._AppSocket.request<void, void>('get', `/AraTesterAxisStopAuto/${this._axisId}`);
    }

    public test(): Promise<void> {
        return AraTesterAxisService._AppSocket.request<void, void>('get', `/test`);
    }
}