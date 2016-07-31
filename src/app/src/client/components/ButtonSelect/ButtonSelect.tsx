import * as React from 'react';
import StyleProp from './../StyleProp';
import { SelectableButton, SelectHandler } from './SelectableButton';

export { SelectableButton, SelectHandler };

export interface ButtonSelectProps extends StyleProp {
    selected?: string;
    onSelect?: SelectHandler;
    buttonStyle?: React.CSSProperties;
};

export { ButtonSelect } ;

export default class ButtonSelect extends React.Component<ButtonSelectProps, void> {
    public static defaultProps: ButtonSelectProps = { selected: '' };

    public onSelect: SelectHandler;

    public constructor(props: ButtonSelectProps) {
        super(props);
        this.onSelect = this.handleSelect.bind(this);
    }

    public shouldComponentUpdate(props: ButtonSelectProps, state: void): boolean {
        return this.props.selected !== props.selected;
    }

    public handleSelect(change: string): void {
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
                    selected={this.props.selected === value}
                    onSelect={this.onSelect} />
            );
        });
        return <div style={this.props.style}>{options}</div>;
    };
}