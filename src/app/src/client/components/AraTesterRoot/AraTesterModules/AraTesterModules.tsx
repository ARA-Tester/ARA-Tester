import * as React from 'react';
import OptionalStyleProp from './../../OptionalStyleProp';
import AraTesterControlls from './AraTesterControlls';
import AraTesterPositions from './AraTesterPositions';
const { div } = React.DOM;

const spacingStyle: React.CSSProperties = {
    margin: 30,
};

const childSpaceStyle: React.CSSProperties = Object.assign({
    width: '100%',
    height: '100%'
}, spacingStyle);

export default class AraTesterModules extends React.Component<OptionalStyleProp, void> {
    public render(): JSX.Element {
        return (
            <div style={Object.assign({}, childSpaceStyle, this.props.style)}>
                <AraTesterPositions style={spacingStyle} />
                <AraTesterControlls style={spacingStyle} />
            </div>
        );
    }
}