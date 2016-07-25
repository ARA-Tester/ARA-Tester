import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { TouchTapEventHandler, TouchTapEvent } from 'material-ui';
import OptionalStyleProp from './../OptionalStyleProp';

export type SelectHandler = (value: string) => void;

export interface SelectableButtonProps extends OptionalStyleProp {
    label: string;
    value: string;
    selected?: boolean;
    onSelect?: SelectHandler;
};

export { SelectableButton };

export default class SelectableButton extends React.Component<SelectableButtonProps, void> {
    public static defaultProps: SelectableButtonProps = {
        label: '',
        value: '',
        selected: false,
    };

    public onTouchTap: TouchTapEventHandler;

    public constructor(props: SelectableButtonProps) {
        super(props);
        this.onTouchTap = this.handleTouchTap.bind(this);
    }

    public handleTouchTap(event: TouchTapEvent): void {
        if(this.props.onSelect) {
            this.props.onSelect(this.props.value);
        }
    }

    public render(): JSX.Element {
        const props: Object = {
            style: this.props.style,
            label: this.props.label,
            primary: true,
            onTouchTap: this.onTouchTap
        };
        return this.props.selected ? <RaisedButton {...props} /> : <FlatButton {...props} />;
    }
};