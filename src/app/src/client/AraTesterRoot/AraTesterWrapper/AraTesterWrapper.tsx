import * as React from 'react';
import OptionalStyleProp from './../../OptionalStyleProp';
import AraTesterAxisId from './../../../share/AraTesterAxisId';
import DeepContentBox from './../../DeepContentBox';
import AraTesterConfigPopover from './AraTesterConfigPopover/AraTesterConfigPopover';
import AraTesterMovment from './AraTesterMovment/AraTesterMovment';

export interface AraTesterWrapperProps extends AraTesterAxisId, OptionalStyleProp {

}

const spaceStyle: React.CSSProperties = {
    marginTop: 10,
    marginBottom: 10
};

export default class AraTesterWrapper extends React.Component<AraTesterWrapperProps, void> {
    public render(): JSX.Element {
        return (
            <DeepContentBox style={this.props.style}>
                <AraTesterConfigPopover style={spaceStyle} {...this.props} disabled={true} />
                <AraTesterMovment style={spaceStyle} {...this.props} disabled={true} />
            </DeepContentBox>
        );
    }
}