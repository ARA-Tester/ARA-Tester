import AppSocket from './AppSocket';
import AraTesterAxisConfig from './../../share/AraTesterAxisConfig';
import AraTesterAxisMovment from './../../share/AraTesterAxisMovment';

export default class AraTesterAxisService {
    private static _AppSocket: AppSocket;
    private _axisId: number;
    private _onMovmentStart: () => void;
    private _onMovmentEnd: () => void;

    public constructor(axisId: number) {
        this._axisId = axisId;
        AraTesterAxisService._AppSocket = AppSocket.getSocket();
    }

    public onMovmentStart(handler: () => void): void {
        this._onMovmentStart = handler;
        AraTesterAxisService._AppSocket.subscribe(`/AraTesterAxisOnMovmentStart/${this._axisId}`, handler);
    }

    public onMovmentEnd(handler: () => void): void {
        this._onMovmentEnd = handler;
        AraTesterAxisService._AppSocket.subscribe(`/AraTesterAxisOnMovmentEnd/${this._axisId}`, handler);
    }

    public removeHandlers(): void {
        AraTesterAxisService._AppSocket.unsubscribe(`/AraTesterAxisOnMovmentStart/${this._axisId}`, this._onMovmentStart);
        AraTesterAxisService._AppSocket.unsubscribe(`/AraTesterAxisOnMovmentEnd/${this._axisId}`, this._onMovmentEnd);
    }

    public getConfiguration(): Promise<AraTesterAxisConfig> {
        return AraTesterAxisService._AppSocket.request<void, AraTesterAxisConfig>('get', `/AraTesterAxisGetConfiguration/${this._axisId}`);
    }

    public configurate(config: AraTesterAxisConfig): Promise<void> {
        return AraTesterAxisService._AppSocket.request<AraTesterAxisConfig, void>('post', `/AraTesterAxisConfigurate/${this._axisId}`, config);
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
}