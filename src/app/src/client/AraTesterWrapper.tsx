import * as React from 'react';
import { AraTesterConfigProps } from './AraTesterConfig';
import DeepContentBox from './DeepContentBox';
import AraTesterConfigPopover from './AraTesterConfigPopover';
import AraTesterMovment from './AraTesterMovment';

const spaceStyle: React.CSSProperties = {
    marginTop: 10,
    marginBottom: 10
};

export default class AraTesterWrapper extends React.Component<AraTesterConfigProps, void> {
    public render(): JSX.Element {
        return (
            <DeepContentBox style={this.props.style}>
                <AraTesterConfigPopover {...this.props} style={spaceStyle} />
                <AraTesterMovment {...this.props} style={spaceStyle} />
            </DeepContentBox>
        );
    }
}