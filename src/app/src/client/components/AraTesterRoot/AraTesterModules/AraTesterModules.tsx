import * as React from 'react';
import OptionalStyleProp from './../../OptionalStyleProp';
import AraTesterControlls from './AraTesterControlls';
import AraTesterPositions from './AraTesterPositions';
const { div } = React.DOM;

const centerStyle: React.CSSProperties = {
    display: 'block',
    margin: 'auto',
    padding: 'auto',
    width: 625
};

const childSpacingStyle: React.CSSProperties = {
    margin: 20
};

export default class AraTesterModules extends React.Component<OptionalStyleProp, void> {
    public render(): JSX.Element {
        return (
            <div style={Object.assign({}, centerStyle, this.props.style)}>
                <AraTesterPositions style={childSpacingStyle} />
                <AraTesterControlls style={childSpacingStyle} />
            </div>
        );
    }
}
