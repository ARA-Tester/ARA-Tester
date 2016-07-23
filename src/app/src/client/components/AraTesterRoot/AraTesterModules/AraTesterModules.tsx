import * as React from 'react';
import OptionalStyleProp from './../../OptionalStyleProp';
import { Flex, Item } from 'react-flex';
import 'react-flex/index.css';
import AraTesterControlls from './AraTesterControlls';
import AraTesterPositions from './AraTesterPositions';

export default class AraTesterModules extends React.Component<OptionalStyleProp, void> {
    public render(): JSX.Element {
        return (
            <Flex column justifyContent="space-around" alignContent="space-around" alignItems="center">
                <Item flex>
                    <AraTesterControlls />
                </Item>
                <Item flex>
                    <AraTesterPositions />
                </Item>
            </Flex>
        );
    }
}