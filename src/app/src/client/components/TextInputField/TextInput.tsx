import * as React from 'react';
import TextField from 'material-ui/TextField';

export type ChangeHandler = (ecent: React.FormEvent, value: string) => void;

export type RequestValueHandler = (value: string) => void;

export interface EventValue {
    target: {
        value?: string
    }
}

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
    onChange?: ChangeHandler;
    onFocus?: React.FocusEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
    onRequestValue?: RequestValueHandler;
}

export class TextInput extends React.Component<TextInputProps, void> {
    private static _getValidValue(value: string): string {
        const emptyString: string = '';
        const match: RegExpMatchArray = value.match(TextInput._allowed);
        return match !== null ? match.join(emptyString) : emptyString;
    }

    private static _allowed: RegExp = /\w|\@|\-|\ |\./gi;
    private _textField: TextField;
    private _refTextField: (TextField: TextField) => void;
    private _onChange: React.FocusEventHandler;

    private _takeActionForValue(value: string): void {
        const { onRequestValue } = this.props;
        const valid: string = TextInput._getValidValue(value);
        if(valid !== value) {
            if(onRequestValue) {
                onRequestValue(valid);
            } else {
                this.getInputNode().value = valid;
            }
        }
    }

    private _handleTextField(textField: TextField): void {
        this._textField = textField;
    }

    private _handleChange(event: React.FormEvent): void {
        const eventValue: EventValue = event;
        const { value } = eventValue.target;
        const { onChange } = this.props;
        if(onChange) {
            onChange(event, value);
        }
        this._takeActionForValue(value);
    }

    constructor(props: TextInputProps) {
        super(props);
        this._refTextField = this._handleTextField.bind(this);
        this._onChange = this._handleChange.bind(this);
    }

    public getTextField(): TextField {
        return this._textField;
    }

    public getInputNode(): HTMLInputElement {
        return this._textField.getInputNode();
    }

    public componentDidMount(): void {
        const { value } = this.props;
        this._takeActionForValue(value !== undefined ? value : this.getInputNode().value);
    }

    public componentWillReceiveProps(props: TextInputProps) {
        const { value } = props;
        if((value !== undefined) && (value !== this.props.value)) {
            this._takeActionForValue(value);
        }
    }

    public render(): JSX.Element {
        const { props, _refTextField, _onChange } = this;
        let textFieldProps: TextInputProps = Object.assign({}, props, {
            type: 'text',
            onChange: _onChange,
            ref: _refTextField
        });
        if(textFieldProps.onRequestValue) {
            delete textFieldProps.onRequestValue;
        }
        return React.cloneElement(<TextField />, textFieldProps);
    }
}

export default TextInput;