import * as React from 'react';
import AraTesterConfigWrapperState from './../../DisabledProp';
import StyleProp from './../../StyleProp';
import AraTesterAxisId from './../../../../share/AraTesterAxisId';
import DeepContentBox from './../../DeepContentBox';
import AraTesterConfigPopover from './AraTesterConfigPopover/AraTesterConfigPopover';
import AraTesterMovment from './AraTesterMovment';
import AraTesterAxisService from './../../../services/AraTesterAxisService';
import Center from './../../Center';
import { PositiveMovment, NegativeMovment } from './../../MovmentButton';

export interface AraTesterConfigWrapperProps extends AraTesterAxisId, StyleProp {
    positive: PositiveMovment;
    negative: NegativeMovment;
}

const spaceStyle: React.CSSProperties = {
    marginTop: 10,
    marginBottom: 10
};

export default class AraTesterConfigWrapper extends React.Component<AraTesterConfigWrapperProps, AraTesterConfigWrapperState> {
    private static _contentWith: number = 300;
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
            <DeepContentBox style={this._center()}>
                <AraTesterConfigPopover style={spaceStyle} axisId={axisId} disabled={disabled} />
                <AraTesterMovment style={spaceStyle} {...props} disabled={disabled} />
            </DeepContentBox>
        );
    }
}