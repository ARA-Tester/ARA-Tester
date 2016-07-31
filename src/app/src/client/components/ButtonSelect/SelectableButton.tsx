import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import StyleProp from './../StyleProp';

export type SelectHandler = (value: string) => void;

export interface SelectableButtonProps extends StyleProp {
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

    public onClick: React.MouseEventHandler;

    public constructor(props: SelectableButtonProps) {
        super(props);
        this.onClick = this.handleClick.bind(this);
    }

    public shouldComponentUpdate(props: SelectableButtonProps, state: void): boolean {
        return (this.props.label !== props.label) || (this.props.selected !== props.selected);
    }

    public handleClick(event: React.MouseEvent): void {
        if(this.props.onSelect) {
            this.props.onSelect(this.props.value);
        }
    }

    public render(): JSX.Element {
        const props: Object = {
            style: this.props.style,
            label: this.props.label,
            primary: true,
            onClick: this.onClick
        };
        return this.props.selected ? <RaisedButton {...props} /> : <FlatButton {...props} />;
    }
};