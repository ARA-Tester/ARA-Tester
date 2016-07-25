import * as React from 'react';
import OptionalStyleProp from './../OptionalStyleProp';
import { SelectableButton, SelectHandler } from './SelectableButton';

export { SelectableButton, SelectHandler };

export interface ButtonSelectProps extends OptionalStyleProp {
    default?: string;
    onSelect?: SelectHandler;
    buttonStyle?: React.CSSProperties;
};

export interface ButtonSelectState {
    selected: string;
};

export { ButtonSelect } ;

export default class ButtonSelect extends React.Component<ButtonSelectProps, ButtonSelectState> {
    public onSelect: SelectHandler;

    public constructor(props: ButtonSelectProps) {
        super(props);
        this.state = {
            selected: this.props.default ?  this.props.default : ''
        };
        this.onSelect = this.handleSelect.bind(this);
    }

    public handleSelect(change: string): void {
        this.setState({ selected: change });
         if(this.props.onSelect) {
            this.props.onSelect(change);
        }
    }

    public render(): JSX.Element {
        const options: Array<JSX.Element> = React.Children.map(this.props.children, (option: JSX.Element): JSX.Element => {
            const { value, label } = option.props;
            return (
                <SelectableButton
                    style={this.props.buttonStyle}
                    value={value}
                    label={label}
                    selected={this.state.selected === value}
                    onSelect={this.onSelect} />
            );
        });
        return <div style={this.props.style}>{options}</div>;
    };
}