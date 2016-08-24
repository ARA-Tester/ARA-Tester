import * as React from 'react';
import TextField from 'material-ui/TextField';

export type TextInputChangeHandler = (ecent: React.FormEvent, value: string) => void;

export interface EventValue {
    target: {
        value?: string
    }
}

const ExtendedKeyboard: Array<Array<string>> = [
    ['1',        '2', '3', '4', '5', '6', '7', '8', '9',         '0'],
    ['q',        'w', 'e', 'r', 't', 'y', 'u', 'i', 'o',         'p'],
    ['a',        's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Backspace'],
    ['CapsLock', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '-',  'CapsLock'],
    ['Escape',   '@', '_',         '     ',         '.',     'Enter']
];

export const TextInputValidKeys: Array<string> = [].concat.apply([], ExtendedKeyboard);

export interface TextInputProps {
    className?: string;
    disabled?: boolean;
    floatingLabelFixed?: boolean;
    id?: string;
    name?: string;
    fullWidth?: boolean;
    underlineShow?: boolean;
    defaultValue?: number;
    value?: string;
    errorText?: React.ReactNode;
    errorStyle?: React.CSSProperties;
    floatingLabelFocusStyle?: React.CSSProperties;
    floatingLabelStyle?: React.CSSProperties;
    floatingLabelText?: React.ReactNode;
    hintStyle?: React.CSSProperties;
    hintText?: React.ReactNode;
    inputStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    underlineDisabledStyle?: React.CSSProperties;
    underlineFocusStyle?: React.CSSProperties;
    underlineStyle?: React.CSSProperties;
    onBlur?: React.FocusEventHandler;
    onChange?: TextInputChangeHandler;
    onFocus?: React.FocusEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
}

export class TextInput extends React.Component<TextInputProps, void> {
    private _onKeyDown: React.KeyboardEventHandler;
    private _onChange: React.FocusEventHandler;

    private _handleKeyDown(event: React.KeyboardEvent) {
        const { onKeyDown } = this.props;
        const { key } = event;
        if((TextInputValidKeys.indexOf(key.toLowerCase()) === -1) && (key.length === 1)) {
            event.preventDefault();
            event.stopPropagation();
        } else if(onKeyDown) {
            onKeyDown(event);
        }
    }

    private _handleChange(event: React.FormEvent): void {
        const { onChange } = this.props;
        if(onChange) {
            const value: EventValue = event;
            onChange(event, value.target.value);
        }
    }

    constructor(props: TextInputProps) {
        super(props);
        this._onKeyDown = this._handleKeyDown.bind(this);
        this._onChange = this._handleChange.bind(this);
    }

    public render(): JSX.Element {
        const { props, _onKeyDown, _onChange } = this;
        const textFieldProps: Object = Object.assign({}, props, {
            onKeyDown: _onKeyDown,
            onChange: _onChange
        });
        return React.cloneElement(<TextField />, textFieldProps);
    }

}

export default TextInput;