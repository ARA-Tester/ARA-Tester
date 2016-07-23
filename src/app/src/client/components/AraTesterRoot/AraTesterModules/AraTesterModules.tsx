import * as React from 'react';
import OptionalStyleProp from './../../OptionalStyleProp';
import { Flex, Item } from 'react-flex';
import 'react-flex/index.css';
import AraTesterControlls from './AraTesterControlls';
import AraTesterPositions from './AraTesterPositions';
const { div } = React.DOM;

const childSpaceStyle: React.CSSProperties = {
    margin: 30
}

export default class AraTesterModules extends React.Component<OptionalStyleProp, void> {
    public render(): JSX.Element {
        return (
            <div style={Object.assign({}, childSpaceStyle, this.props.style)}>
                <Flex row justifyContent="center" alignContent="center" alignItems="center">
                    <Item flex>
                        <AraTesterPositions style={childSpaceStyle} />
                    </Item>
                    <Item flex>
                        <AraTesterControlls style={childSpaceStyle} />
                    </Item>
                </Flex>
            </div>
        );
    }
}