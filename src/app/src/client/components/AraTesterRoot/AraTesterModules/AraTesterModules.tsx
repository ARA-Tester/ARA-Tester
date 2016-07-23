import * as React from 'react';
import OptionalStyleProp from './../../OptionalStyleProp';
import { Flex, Item } from 'react-flex';
import 'react-flex/index.css';
import AraTesterControlls from './AraTesterControlls';
import AraTesterPositions from './AraTesterPositions';
const { div } = React.DOM;

const fillSpaceStyle: React.CSSProperties = {
    width: '100%',
    height: '100%'
};

export default class AraTesterModules extends React.Component<OptionalStyleProp, void> {
    public render(): JSX.Element {
        return (
            <div style={Object.assign({}, fillSpaceStyle, this.props.style)}>
                <Flex row justifyContent="center" alignContent="center" alignItems="center">
                    <Item flex flexBasis="auto">
                        <Flex column justifyContent="space-around" alignContent="space-around" alignItems="center">
                            <Item flex flexBasis="auto">
                                <AraTesterControlls />
                            </Item>
                            <Item flex flexBasis="auto">
                                <AraTesterPositions />
                            </Item>
                        </Flex>
                    </Item>
                </Flex>
            </div>
        );
    }
}