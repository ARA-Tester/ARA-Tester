import * as React from 'react';
import OptionalStyleProp from './../OptionalStyleProp';
import AraTesterAxisId from './../../../share/AraTesterAxisId';;
import AraTesterAxisCurrentPositionState from './../../../share/AraTesterAxisDistance';
import AraTesterAxisService from './../../services/AraTesterAxisService';
import RaisedButton from 'material-ui/RaisedButton';
import { purple500, pink500 } from 'material-ui/styles/colors';
const { div } = React.DOM;

export interface AraTesterAxisCurrentPositionProps extends OptionalStyleProp, AraTesterAxisId {

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
            <RaisedButton
                style={this.props.style}
                disabled={true}
                disabledBackgroundColor={purple500}
                disabledLabelColor={pink500}
                label={String(this.state.distance)} />
        );
    }
}