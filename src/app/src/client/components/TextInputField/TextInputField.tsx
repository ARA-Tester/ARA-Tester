import * as React from 'react';
import OnScreenKeyboard from './OnScreenKeyboard';
import { TextInput, TextInputProps } from './TextInput';
import { ExtendedKeyboard, RequestCloseHandler, InputHandler, TextFieldElement } from 'react-material-ui-keyboard'

export type TextInputFieldValueHandler = (value: string) => void;

export interface TextInputFieldProps extends TextInputProps {
    onValue?: TextInputFieldValueHandler;
}

export interface TextInputFieldState {
    open?: boolean;
}

export class TextInputField extends React.Component<TextInputFieldProps, TextInputFieldState> {
    private _onFocus: React.FocusEventHandler;
    private _onRequestClose: RequestCloseHandler;
    private _onInput: InputHandler;

    private _handleFocus(event: React.FocusEvent): void {
        this.setState({ open: true });
    }

    private _handleRequestClose(): void {
        this.setState({ open: false });
    }

    private _handleInput(value: string): void {
        const { onValue } = this.props;
        if(onValue) {
            onValue(value);
        }
    }

    public constructor(props: TextInputFieldProps) {
        super(props);
        this.state = { open: false};
        this._onFocus = this._handleFocus.bind(this);
        this._onRequestClose = this._handleRequestClose.bind(this);
        this._onInput = this._handleInput.bind(this);
    }

    public render(): JSX.Element {
        const { props, state, _onFocus, _onRequestClose, _onInput } = this;
        const { open } = state;
        let textInputProps = Object.assign({}, props);
        if(textInputProps.onValue) {
            delete textInputProps.onValue;
        }
        return (
            <OnScreenKeyboard
                layout={ExtendedKeyboard}
                textField={<TextInput {...textInputProps} onFocus={_onFocus} />}
                open={open}
                onRequestClose={_onRequestClose}
                onInput={_onInput}
            />
        )
    }
}

export default TextInputField;