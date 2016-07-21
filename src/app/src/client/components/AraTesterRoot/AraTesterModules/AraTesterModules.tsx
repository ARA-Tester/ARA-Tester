import * as React from 'react';
import AraTesterAutoMovmentButton from './AraTesterAutoMovmentButton';
import DeepContentBox from './../../DeepContentBox';
import OptionalStyleProp from './../../OptionalStyleProp';
import MovmentIcon from 'material-ui/svg-icons/action/open-with';
import RaisedButton from 'material-ui/RaisedButton';
import { Flex, Item } from 'react-flex';
import 'react-flex/index.css';

export default class AraTesterModules extends React.Component<OptionalStyleProp, void> {

    public render(): JSX.Element {
        return (
            <DeepContentBox style={this.props.style}>
                <Flex column justifyContent="space-between" alignContent="space-betwee" alignItems="center">
                    <Flex row justifyContent="space-between" alignContent="space-betwee" alignItems="center">
                        <Item flex>
                            <AraTesterAutoMovmentButton axisId={0} movment="rotate left" />
                        </Item>
                        <Item flex>
                             <AraTesterAutoMovmentButton axisId={0} movment="forward" />
                        </Item>
                        <Item flex>
                            <AraTesterAutoMovmentButton axisId={0} movment="up" />
                        </Item>
                    </Flex>
                    <Flex row justifyContent="space-between" alignContent="space-betwee" alignItems="center">
                        <Item flex>
                            <AraTesterAutoMovmentButton axisId={0} movment="left" />
                        </Item>
                        <Item flex>
                             <RaisedButton disabled={true} icon={<MovmentIcon />} />
                        </Item>
                        <Item flex>
                            <AraTesterAutoMovmentButton axisId={0} movment="right" />
                        </Item>
                    </Flex>
                    <Flex row justifyContent="space-between" alignContent="space-betwee" alignItems="center">
                        <Item flex>
                            <AraTesterAutoMovmentButton axisId={0} movment="down" />
                        </Item>
                        <Item flex>
                             <AraTesterAutoMovmentButton axisId={0} movment="backward" />
                        </Item>
                        <Item flex>
                            <AraTesterAutoMovmentButton axisId={0} movment="rotate right" />
                        </Item>
                    </Flex>
                </Flex>
            </DeepContentBox>
        );
    }
}