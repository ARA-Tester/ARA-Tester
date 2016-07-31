import * as React from 'react';
import TextField from 'material-ui/TextField';
import EventValue from './EventValue';
import StyleProp from './StyleProp';;

export type NumberInputValueHandler = (value: number) => void;

export interface NumberInputProps extends StyleProp {
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

    public shouldComponentUpdate(props: NumberInputProps, state: void): boolean {
        return (this.props.label !== props.label) || (this.props.value !== props.value);
    }

    public handleChange(event: React.FormEvent): void {
        let eventValue: EventValue<string> = event as EventValue<string>;
        let value: string = eventValue.target.value;
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