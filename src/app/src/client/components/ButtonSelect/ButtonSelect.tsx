import * as React from 'react';
import StyleProp from './../StyleProp';
import { SelectableButton, SelectHandler, SelectableButtonProps } from './SelectableButton';

export { SelectableButton, SelectHandler };

export interface ButtonSelectProps extends StyleProp {
    selected?: string;
    onSelect?: SelectHandler;
    buttonStyle?: React.CSSProperties;
};

export { ButtonSelect } ;

type SelectableButtonNode = React.ReactElement<SelectableButtonProps>;

interface SelectableButtonCopyProps extends StyleProp {
    selected?: boolean;
    onSelect?: SelectHandler;
}

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
        const options: Array<SelectableButtonNode> = React.Children.map(this.props.children, (option: SelectableButtonNode): SelectableButtonNode => {
            return React.cloneElement<SelectableButtonProps, SelectableButtonCopyProps>(option, {
                style: this.props.buttonStyle,
                selected: this.props.selected === option.props.value,
                onSelect: this.onSelect
            });
        });
        return <div style={this.props.style}>{options}</div>;
    };
}