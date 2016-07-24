import * as React from 'react';
import OptionalStyleProp from './../../OptionalStyleProp';
import AraTesterControlls from './AraTesterControlls';
import AraTesterPositions from './AraTesterPositions';
const { div } = React.DOM;

const centerStyle: React.CSSProperties = {
    display: 'block',
    margin: 'auto',
    width: '40%'
};


export default class AraTesterModules extends React.Component<OptionalStyleProp, void> {
    public render(): JSX.Element {
        return (
            <div style={Object.assign({}, centerStyle, this.props.style)}>
                <AraTesterPositions />
                <AraTesterControlls />
            </div>
        );
    }
}