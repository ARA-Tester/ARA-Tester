import * as React from 'react';
import OnScreenKeyboard from './OnScreenKeyboard';
import StyleProp from './StyleProp';;
import { NumberInput, NumberInputValidHandler } from 'material-ui-number-input';
import { NumericKeyboard, RequestCloseHandler, InputHandler, TextFieldElement } from 'react-material-ui-keyboard'

export type NumberInputFieldValueHandler = NumberInputValidHandler;

export interface NumberInputFieldProps extends StyleProp {
    label: string;
    value: number;
    onValue: NumberInputValidHandler;
    min?: number;
    max?: number;
}

export interface NumberInputFieldState {
    open?: boolean;
    listen?: boolean;
}

export class NumberInputField extends React.Component<NumberInputFieldProps, NumberInputFieldState> {
    private _onFocus: React.FocusEventHandler;
    private _onValid: NumberInputValidHandler;
    private _onRequestClose: RequestCloseHandler;
    private _onInput: InputHandler;

    private _handleFocus(event: React.FocusEvent): void {
        this.setState({ open: true, listen: false });
    }

    private _handleValid(valid: number): void {
        const { props, state } = this;
        const { onValue } = props;
        const { listen } = state;
        console.log('valid');
        if(onValue !== undefined) {
            onValue(valid);
        }
    }

    private _handleRequestClose(): void {
        console.log('close');
        this.setState({ open: false });
    }

    private _handleInput(value: string): void {
        console.log('input');
        this.setState({ listen: true });
    }

    public constructor(props: NumberInputFieldProps) {
        super(props);
        this.state = { open: false, listen: true };
        this._onFocus = this._handleFocus.bind(this);
        this._onValid = this._handleValid.bind(this);
        this._onRequestClose = this._handleRequestClose.bind(this);
        this._onInput = this._handleInput.bind(this);
    }

    public shouldComponentUpdate(props: NumberInputFieldProps, state: NumberInputFieldState): boolean { 
        const { listen } = this.state;
        const { listen: nextListen } = state;
        return listen || (listen !== nextListen);
    }

    public render(): JSX.Element {
        const { props, state, _onFocus, _onValid, _onRequestClose, _onInput } = this;
        const { label, value, min, max, style } = props;
        const { open } = state;
        const textField: TextFieldElement = (
            <NumberInput
                floatingLabelText={label}
                value={String(value)}
                min={min}
                max={max}
                strategy="ignore"
                onFocus={_onFocus}
                onValid={_onValid}
                style={style}
            />
        );
        return (
            <OnScreenKeyboard
                layout={NumericKeyboard}
                textField={textField}
                open={open}
                onRequestClose={_onRequestClose}
                onInput={_onInput}
            />
        )
    }
}

export default NumberInputField;