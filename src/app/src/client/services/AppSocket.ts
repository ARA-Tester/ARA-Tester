import * as Nes from 'nes/client';

type errorHandler = (err: any) => void;
type requestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head';

export default class AppSocket {
    private static _AppSocket: AppSocket;
    private _socket: Nes.Client;

    public static getSocket(): AppSocket {
        if(!AppSocket._AppSocket) {
            AppSocket._AppSocket = new AppSocket();
        }
        return AppSocket._AppSocket;
    }

    /*private */ constructor() {
        this._socket = new Nes.Client('ws://' + window.location.host);
    }

    public onError(handleError: errorHandler) {
        this._socket.onError = handleError;
    }

    public connect(): Promise<void> {
        return new Promise<void>((resolve: () => void, reject: errorHandler) => {
            this._socket.connect((err: any) => {
                if(err) {
                    this._socket.onError(err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public request<S, R>(method: requestMethod, path: string, data?: S): Promise<R> {
        return new Promise<R>((resolve: (recived: R) => void, reject: errorHandler) => {
            this._socket.request({
                path: path,
                method: method.toUpperCase(),
                payload: data
            }, (err: any, payload: R, statusCode: number) => {
                if(err) {
                    this._socket.onError(err);
                    reject(err);
                } else {
                    resolve(payload);
                }
            });
        });
    }

    public subscribe(path: string, handler: (data: any) => void): void {
        this._socket.subscribe(path, handler, this._socket.onError);
    }

    public unsubscribe(path: string, handler: (data: any) => void): void {
        this._socket.unsubscribe(path, handler, this._socket.onError);
    }
}