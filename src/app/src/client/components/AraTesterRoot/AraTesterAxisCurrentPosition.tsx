import * as React from 'react';
import OptionalStyleProp from './../OptionalStyleProp';
import AraTesterAxisId from './../../../share/AraTesterAxisId';;
import AraTesterAxisCurrentPositionState from './../../../share/AraTesterAxisDistance';
import AraTesterAxisService from './../../services/AraTesterAxisService';
import RaisedButton from 'material-ui/RaisedButton';
import { purple500, pink500 } from 'material-ui/styles/colors';

export interface AraTesterAxisCurrentPositionProps extends OptionalStyleProp, AraTesterAxisId {

}

const disabledStyle: React.CSSProperties = {
    backgroundColor: purple500,
    color: pink500
};

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
        }, (err: any) => {
            console.log(err);
        });
        this._AraTesterAxisService.onPositionChange((position: AraTesterAxisCurrentPositionState) => {
            this.setState(position);
        });
    }

    public componentWillUnmount(): void {
        this._AraTesterAxisService.removePositionChange();
    }

    public render(): JSX.Element {
        return (
            <RaisedButton
                style={Object.assign({}, disabledStyle, this.props.style)}
                disabled={true}
                label={String(this.state.distance)} />
        );
    }
}