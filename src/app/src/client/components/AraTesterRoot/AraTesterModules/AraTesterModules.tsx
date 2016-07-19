import * as React from 'react';
import AraTesterAutoMovmentButton from './AraTesterAutoMovmentButton';
import DeepContentBox from './../../DeepContentBox';
import OptionalStyleProp from './../../OptionalStyleProp';

export default class AraTesterModules extends React.Component<OptionalStyleProp, void> {

    public render(): JSX.Element {
        return (
            <DeepContentBox style={this.props.style}>
                <AraTesterAutoMovmentButton
                    axisId={0}
                    movment="left" />
                <AraTesterAutoMovmentButton
                    axisId={0}
                    movment="right" />
            </DeepContentBox>
        );
    }
}