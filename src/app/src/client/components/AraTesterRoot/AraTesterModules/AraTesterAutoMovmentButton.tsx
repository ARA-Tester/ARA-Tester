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

type AraTesterAutoMovmentButtonEvent = 'release' | 'press' | 'timeout';

type statePropValue = boolean | number | AraTesterAutoMovmentButtonEvent;

type statePropKey = 'keepMoving' | 'timeout' | 'event';

export interface AraTesterAutoMovmentButtonState extends PropSetter<statePropValue> {
    keepMoving: boolean;
    timeout: number;
    event: AraTesterAutoMovmentButtonEvent;
}

function stateProxy<P, S extends PropSetter<U>, T extends React.Component<P, S>, Y extends string, U>(component: T): void {
    component.state = new Proxy<S>(component.state, {
        set: (state: S, prop: Y, value: U, receiver: S): boolean => {
            let current: S = Object.assign({}, component.state);
            current[prop as string] = value;
            component.setState(current);
            return true;
        }
    });
}

export default class AraTesterAutoMovmentButton extends React.Component<AraTesterAutoMovmentButtonProps, AraTesterAutoMovmentButtonState> {
    private _AraTesterAxisService: AraTesterAxisService;
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
            timeout: null,
            event: 'release'
        };
        this.onButtonPress = this.handleButtonPress.bind(this);
        this.onButtonRelease = this.handleButtonRelease.bind(this);
        this._AraTesterAxisService = new AraTesterAxisService(this.props.axisId);
        stateProxy<AraTesterAutoMovmentButtonProps, AraTesterAutoMovmentButtonState, AraTesterAutoMovmentButton, statePropKey, statePropValue>(this);

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
        this.state.event = 'press';
        this.state.timeout = window.setTimeout(() => {
            console.log('timeout');
            this.state.event = 'timeout';
            this.state.keepMoving = true;;
            this._move();
        }, 300);
        this._move();
    }

    public handleButtonRelease(event: React.SyntheticEvent): void {
        event.preventDefault();
        console.log('release');
        switch(this.state.event) {
            case 'release': {
                console.log('forced');
                this._move();
                break;
            }
            case 'press': {
                clearTimeout(this.state.timeout);
                break;
            }
            case 'timeout': {
                this.state.keepMoving = false;
                break;
            }
        }
        this.state.event = 'release';
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