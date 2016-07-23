import * as React from 'react';
import OptionalStyleProp from './../../OptionalStyleProp';
import { Flex, Item } from 'react-flex';
import 'react-flex/index.css';
import AraTesterControlls from './AraTesterControlls';
import AraTesterPositions from './AraTesterPositions';
const { div } = React.DOM;

const childSpaceStyle: React.CSSProperties = {
    margin: 'auto',
    width: '100%',
    height: '100%'
};

export default class AraTesterModules extends React.Component<OptionalStyleProp, void> {
    public render(): JSX.Element {
        return (
            <div style={Object.assign({}, childSpaceStyle, this.props.style)}>
                <Flex column justifyContent="center" alignContent="center" alignItems="center">
                    <Item flex />
                    <Item flex>
                        <Flex row justifyContent="center" alignContent="center" alignItems="center">
                            <Item flex />
                            <Item flex>
                                <AraTesterPositions />
                            </Item>
                            <Item flex>
                                <AraTesterControlls />
                            </Item>
                            <Item flex />
                        </Flex>
                    </Item>
                    <Item flex />
                </Flex>
            </div>
        );
    }
}