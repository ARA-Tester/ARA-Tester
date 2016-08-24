import * as React from 'react';
import AraTesterConfigWrapperState from './../../DisabledProp';
import StyleProp from './../../StyleProp';
import AraTesterAxisId from './../../../../share/AraTesterAxisId';
import DeepContentBox from './../../DeepContentBox';
import AraTesterConfig from './AraTesterConfig';
import AraTesterMovment from './AraTesterMovment';
import AraTesterAxisService from './../../../services/AraTesterAxisService';
import Center from './../../Center';
import { PositiveMovment, NegativeMovment } from './../../MovmentButton';

const { div } = React.DOM

const childSpacingStyle: React.CSSProperties = { margin: 20 };

export interface AraTesterConfigWrapperProps extends AraTesterAxisId, StyleProp {
    positive: PositiveMovment;
    negative: NegativeMovment;
}

export default class AraTesterConfigWrapper extends React.Component<AraTesterConfigWrapperProps, AraTesterConfigWrapperState> {
    private static _contentWith: number = 600;
    private _AraTesterAxisService: AraTesterAxisService;

    private _center(): React.CSSProperties {
        return Center(AraTesterConfigWrapper._contentWith, this.props.style);
    }

    public constructor(props: AraTesterConfigWrapperProps) {
        super(props);
        this.state = { disabled: false };
        this._AraTesterAxisService = new AraTesterAxisService(this.props.axisId);
    }

    public componentDidMount(): void {
        this._AraTesterAxisService.onMovmentStart(() => {
            this.setState({ disabled: true });
        });
        this._AraTesterAxisService.onMovmentEnd(() => {
            this.setState({ disabled: false });
        });
    }

    public componentWillUnmount(): void {
        this._AraTesterAxisService.removeMovmentStart();
        this._AraTesterAxisService.removeMovmentEnd();
    }

    public shouldComponentUpdate(props: AraTesterConfigWrapperProps, state: AraTesterConfigWrapperState): boolean {
        const { axisId, positive, negative } = this.props;
        const propsChange: boolean = (axisId !== props.axisId) || (positive !== props.positive) || (negative !== props.negative);
        const stateChange: boolean = (this.state.disabled !== state.disabled);
        return propsChange || stateChange;
    }

    public render(): JSX.Element {
        const { props, state } = this;
        const { style, axisId } = props;
        const { disabled } = state;
        return (
            <div style={this._center()}>
                <AraTesterConfig style={childSpacingStyle} axisId={axisId} disabled={disabled} />
                <AraTesterMovment style={childSpacingStyle} disabled={disabled} {...props} />
            </div>
        );
    }
}