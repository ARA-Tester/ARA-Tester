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
                <Flex column justifyContent="space-around" alignContent="space-around" alignItems="stretch" wrap={false}>
                    <Item flex>
                        <AraTesterControlls />
                    </Item>
                    <Item flex>
                        <AraTesterPositions />
                    </Item>
                </Flex>
            </div>
        );
    }
}