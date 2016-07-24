import * as React from 'react';
import OptionalStyleProp from './../OptionalStyleProp';
import AraTesterAxisId from './../../../share/AraTesterAxisId';;
import AraTesterAxisCurrentPositionState from './../../../share/AraTesterAxisDistance';
import AraTesterAxisService from './../../services/AraTesterAxisService';
import FlatButton from 'material-ui/FlatButton';
const { div } = React.DOM;

export interface AraTesterAxisCurrentPositionProps extends OptionalStyleProp, AraTesterAxisId {
    axisName: string
}

export default class AraTesterAxisCurrentPosition extends React.Component<AraTesterAxisCurrentPositionProps, AraTesterAxisCurrentPositionState> {
    private _AraTesterAxisService: AraTesterAxisService;

    public constructor(props: AraTesterAxisCurrentPositionProps, context: any) {
        super(props, context);
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
                <FlatButton disabled={true} label={`Axis ${this.props.axisName}`} />
                <FlatButton disabled={true} label={String(this.state.distance)} />
            </div>
        );
    }
}