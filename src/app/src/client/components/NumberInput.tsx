import * as React from 'react';
import TextField from 'material-ui/TextField';
import EventValue from './EventValue';
import OptionalStyleProp from './OptionalStyleProp';;

export type NumberInputValueHandler = (value: number) => void;

export interface NumberInputProps extends OptionalStyleProp {
    label: string;
    value: number;
    onChange: NumberInputValueHandler;
}

export default class NumberInput extends React.Component<NumberInputProps, void> {
    public onChange: React.FormEventHandler;

    constructor(props: NumberInputProps) {
        super(props);
        this.onChange = this.handleChange.bind(this);
    }

    public handleChange(event: React.FormEvent) {
        let eventValue: EventValue<number> = event as EventValue<number>;
        let value: number = eventValue.target.value;
        this.props.onChange(Number(value));
    }

    public render(): JSX.Element {
        return <TextField
            style={this.props.style}
            type="number"
            floatingLabelText={this.props.label}
            value={this.props.value}
            onChange={this.onChange} />;
    }
};