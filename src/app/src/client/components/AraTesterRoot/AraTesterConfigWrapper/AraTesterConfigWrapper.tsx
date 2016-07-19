import * as React from 'react';
import AraTesterConfigWrapperState from './../../DisabledProp';
import OptionalStyleProp from './../../OptionalStyleProp';
import AraTesterAxisId from './../../../../share/AraTesterAxisId';
import DeepContentBox from './../../DeepContentBox';
import AraTesterConfigPopover from './AraTesterConfigPopover/AraTesterConfigPopover';
import AraTesterMovment from './AraTesterMovment/AraTesterMovment';
import AraTesterAxisService from './../../../services/AraTesterAxisService';
import { PositiveMovment, NegativeMovment } from './../../MovmentButton';

export interface AraTesterConfigWrapperProps extends AraTesterAxisId, OptionalStyleProp {
    positive: PositiveMovment;
    negative: NegativeMovment;
}

const spaceStyle: React.CSSProperties = {
    marginTop: 10,
    marginBottom: 10
};

export default class AraTesterConfigWrapper extends React.Component<AraTesterConfigWrapperProps, AraTesterConfigWrapperState> {
    private _AraTesterAxisService: AraTesterAxisService;

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
        this._AraTesterAxisService.removeHandlers();
    }

    public render(): JSX.Element {
        return (
            <DeepContentBox style={this.props.style}>
                <AraTesterConfigPopover style={spaceStyle} axisId={this.props.axisId} disabled={this.state.disabled} />
                <AraTesterMovment style={spaceStyle} {...this.props} disabled={this.state.disabled} />
            </DeepContentBox>
        );
    }
}