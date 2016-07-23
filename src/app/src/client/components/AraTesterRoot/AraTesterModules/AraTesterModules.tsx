import * as React from 'react';
import OptionalStyleProp from './../../OptionalStyleProp';
import { Flex, Item } from 'react-flex';
import 'react-flex/index.css';
import AraTesterControlls from './AraTesterControlls';
import AraTesterPositions from './AraTesterPositions';
const { div } = React.DOM;

const topSpaceStyle: React.CSSProperties = {
    marginTop: 25
}

export default class AraTesterModules extends React.Component<OptionalStyleProp, void> {
    public render(): JSX.Element {
        return (
            <div style={Object.assign({}, topSpaceStyle, this.props.style)}>
                <Flex column justifyContent="center" alignContent="center" alignItems="center">
                    <Item flex>
                        <AraTesterControlls />
                    </Item>
                    <Item flex>
                        <AraTesterPositions style={topSpaceStyle} />
                    </Item>
                </Flex>
            </div>
        );
    }
}