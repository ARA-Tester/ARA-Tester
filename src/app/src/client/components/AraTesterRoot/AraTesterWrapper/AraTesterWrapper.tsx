import * as React from 'react';
import AraTesterWrapperState from './../../DisabledProp';
import OptionalStyleProp from './../../OptionalStyleProp';
import AraTesterAxisId from './../../../../share/AraTesterAxisId';
import DeepContentBox from './../../DeepContentBox';
import AraTesterConfigPopover from './AraTesterConfigPopover/AraTesterConfigPopover';
import AraTesterMovment from './AraTesterMovment/AraTesterMovment';
import AraTesterAxisService from './../../../services/AraTesterAxisService';

export interface AraTesterWrapperProps extends AraTesterAxisId, OptionalStyleProp {

}

const spaceStyle: React.CSSProperties = {
    marginTop: 10,
    marginBottom: 10
};

export default class AraTesterWrapper extends React.Component<AraTesterWrapperProps, AraTesterWrapperState> {
    private _AraTesterAxisService: AraTesterAxisService;

    public constructor(props: AraTesterWrapperProps) {
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
                <AraTesterConfigPopover style={spaceStyle} {...this.props} disabled={this.state.disabled} />
                <AraTesterMovment style={spaceStyle} {...this.props} disabled={this.state.disabled} />
            </DeepContentBox>
        );
    }
}