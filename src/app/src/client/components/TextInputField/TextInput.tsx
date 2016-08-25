import * as React from 'react';
import TextField from 'material-ui/TextField';
import { ExtendedKeyboard } from 'react-material-ui-keyboard';

export type TextInputChangeHandler = (ecent: React.FormEvent, value: string) => void;

export interface EventValue {
    target: {
        value?: string
    }
}

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
    public static TextInputValidKeys: Array<string> = TextInputValidKeys;
    private _textField: TextField;
    private _refTextField: (TextField: TextField) => void;
    private _onKeyDown: React.KeyboardEventHandler;
    private _onChange: React.FocusEventHandler;

    private _handleTextField(textField: TextField): void {
        this._textField = textField;
    }

    private _handleKeyDown(event: React.KeyboardEvent) {
        const { onKeyDown } = this.props;
        const { key } = event;
        if((key.length === 1) && (TextInputValidKeys.indexOf(key.toLowerCase()) === -1)) {
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
        this._refTextField = this._handleTextField.bind(this);
        this._onKeyDown = this._handleKeyDown.bind(this);
        this._onChange = this._handleChange.bind(this);
    }

    public getInputNode(): HTMLInputElement {
        return this._textField.getInputNode();
    }

    public render(): JSX.Element {
        const { props, _refTextField, _onKeyDown, _onChange } = this;
        const textFieldProps: Object = Object.assign({}, props, {
            onKeyDown: _onKeyDown,
            onChange: _onChange,
            ref: _refTextField
        });
        return React.cloneElement(<TextField />, textFieldProps);
    }

}

export default TextInput;