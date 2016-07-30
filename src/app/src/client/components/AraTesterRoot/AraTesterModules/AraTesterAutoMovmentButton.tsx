import * as React from 'react';
import AraTesterAxisService from './../../../services/AraTesterAxisService';
import AraTesterAxisId from './../../../../share/AraTesterAxisId';
import AraTesterAxisDistance from './../../../../share/AraTesterAxisDistance';
import AraTesterAxisMovment from './../../../../share/AraTesterAxisMovment';
import { default as MovmentButton, SyntheticEventHandler, MovmentButtonProps } from './../../MovmentButton';

export interface AraTesterAutoMovmentButtonProps extends MovmentButtonProps, AraTesterAxisId, AraTesterAxisDistance {

}

interface PropSetter<V> {
    [propName: string]: V;
}

type statePropValue = boolean | number;

type statePropKey = 'keepMoving' | 'timeout';

export interface AraTesterAutoMovmentButtonState extends PropSetter<statePropValue> {
    keepMoving: boolean;
    timeout: number;
}

class stateProxy<P, S extends PropSetter<U>, T extends React.Component<P, S>, Y extends string, U> {
    private _component: T;

    constructor(component: T) {
        this._component = component;
    }

    new(component: T): stateProxy<P, S, T, Y, U> {
        return new stateProxy<P, S, T, Y, U>(component);
    }

    set(prop: Y, value: U): void {
        let current: S = Object.assign({}, this._component.state);
        current[prop as string] = value;
        this._component.setState(current);
    }
}

export default class AraTesterAutoMovmentButton extends React.Component<AraTesterAutoMovmentButtonProps, AraTesterAutoMovmentButtonState> {
    private _AraTesterAxisService: AraTesterAxisService;
    private _stateProxy: stateProxy<AraTesterAutoMovmentButtonProps, AraTesterAutoMovmentButtonState, AraTesterAutoMovmentButton, statePropKey, statePropValue>;
    public onButtonPress: SyntheticEventHandler;
    public onButtonRelease: SyntheticEventHandler;

    private _move(): Promise<void> {
        return this._AraTesterAxisService.movment({
            direction: !this.props.movment.match(/(forward)|(right)|(up)|(rotate right)/),
            distance: this.props.distance
        });
    }

    public constructor(props: AraTesterAutoMovmentButtonProps) {
        super(props);
        this.state = {
            keepMoving: false,
            timeout: null
        };
        this.onButtonPress = this.handleButtonPress.bind(this);
        this.onButtonRelease = this.handleButtonRelease.bind(this);
        this._AraTesterAxisService = new AraTesterAxisService(this.props.axisId);
        this._stateProxy = new stateProxy<AraTesterAutoMovmentButtonProps, AraTesterAutoMovmentButtonState, AraTesterAutoMovmentButton, statePropKey, statePropValue>(this);
    }

    public componentDidMount(): void {
        this._AraTesterAxisService.onMovmentEnd(() => {
            if(this.state.keepMoving) {
                this._move();
            }
        });
    }

    public componentWillUnmount(): void {
        this._AraTesterAxisService.removeMovmentEnd();
    }

    public handleButtonPress(event: React.SyntheticEvent): void {
        event.preventDefault();
        console.log('press');
        console.log('state');
        console.log(this.state);
        this._stateProxy.set('timeout', window.setTimeout(() => {
            console.log('timeout');
            this._stateProxy.set('timeout', null);
            this._stateProxy.set('keepMoving', true);
            this._move();
        }, 300));
        this._move();
    }

    public handleButtonRelease(event: React.SyntheticEvent): void {
        event.preventDefault();
        console.log('release');
        console.log('state');
        console.log(this.state);
        this._stateProxy.set('keepMoving', false);
        if(this.state.timeout) {
            clearTimeout(this.state.timeout);
            this._stateProxy.set('timeout', null);
        } else {
            console.log('forced');
            this._move();
        }
    }

    public render(): JSX.Element {
        return (
            <MovmentButton
                style={this.props.style}
                movment={this.props.movment}
                onButtonPress={this.onButtonPress}
                onButtonRelease={this.onButtonRelease} />
        );
    }
}