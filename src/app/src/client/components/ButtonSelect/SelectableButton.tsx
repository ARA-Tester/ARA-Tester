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
        selected: false
    };

    public onClick: React.MouseEventHandler;

    public constructor(props: SelectableButtonProps) {
        super(props);
        this.onClick = this.handleClick.bind(this);
    }

    public shouldComponentUpdate(props: SelectableButtonProps, state: void): boolean {
        const { label, selected } = this.props;
        return (label !== props.label) || (selected !== props.selected);
    }

    public handleClick(event: React.MouseEvent): void {
        const { onSelect, value } = this.props;
        if(onSelect) {
            onSelect(value);
        }
    }

    public render(): JSX.Element {
        const { props: thisProps, onClick } = this;
        const { style, label } = thisProps;
        const props: Object = {
            style: style,
            label: label,
            primary: true,
            onClick: onClick
        };
        return this.props.selected ? <RaisedButton {...props} /> : <FlatButton {...props} />;
    }
};