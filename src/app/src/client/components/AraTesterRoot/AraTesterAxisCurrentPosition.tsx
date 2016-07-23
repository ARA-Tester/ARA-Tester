import * as React from 'react';
import OptionalStyleProp from './../OptionalStyleProp';
import AraTesterAxisId from './../../../share/AraTesterAxisId';;
import AraTesterAxisCurrentPositionState from './../../../share/AraTesterAxisDistance';
import AraTesterAxisService from './../../services/AraTesterAxisService';
import RaisedButton from 'material-ui/RaisedButton';
import Badge from 'material-ui/Badge';
import { indigo500, lime500 } from 'material-ui/styles/colors';
import { Flex, Item } from 'react-flex';
import 'react-flex/index.css';
const { div } = React.DOM;

export interface AraTesterAxisCurrentPositionProps extends OptionalStyleProp, AraTesterAxisId {
    axisName: string
}

export default class AraTesterAxisCurrentPosition extends React.Component<AraTesterAxisCurrentPositionProps, AraTesterAxisCurrentPositionState> {
    private _AraTesterAxisService: AraTesterAxisService;

    public constructor(props: AraTesterAxisCurrentPositionProps) {
        super(props);
        this.state = { distance: 0 };
        this._AraTesterAxisService = new AraTesterAxisService(this.props.axisId);
    }

    public componentDidMount(): void {
        this._AraTesterAxisService.getPosition().then((position: AraTesterAxisCurrentPositionState) => {
            this.setState(position);
        });
        this._AraTesterAxisService.onMovmentEnd((position: AraTesterAxisCurrentPositionState) => {
            this.setState(position);
        });
    }

    public componentWillUnmount(): void {
        this._AraTesterAxisService.removeMovmentEnd();
    }

    public render(): JSX.Element {
        return (
            <div style={this.props.style}>
                <Flex row justifyContent="space-around" alignContent="space-around" alignItems="center">
                    <Item flex>
                        <RaisedButton
                            style={this.props.style}
                            disabled={true}
                            disabledBackgroundColor={indigo500}
                            disabledLabelColor={lime500}
                            label={String(this.state.distance)} />
                    </Item>
                    <Item flex>
                        <RaisedButton
                            style={this.props.style}
                            disabled={true}
                            disabledBackgroundColor={indigo500}
                            disabledLabelColor={lime500}
                            label={`Axis ${this.props.axisName}`} />
                    </Item>
                </Flex>
            </div>
        );
    }
}