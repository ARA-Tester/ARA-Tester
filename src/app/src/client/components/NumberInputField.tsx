import * as React from 'react';
import OnScreenKeyboard from './OnScreenKeyboard';
import StyleProp from './StyleProp';;
import { NumberInput, NumberInputValidHandler } from 'material-ui-number-input';
import { NumericKeyboard, RequestCloseHandler, InputHandler, TextFieldElement } from 'react-material-ui-keyboard'

export type NumberInputFieldValueHandler = NumberInputValidHandler;

export interface NumberInputFieldProps extends StyleProp {
    label?: string;
    value?: number;
    onValue?: NumberInputValidHandler;
    min?: number;
    max?: number;
}

export interface NumberInputFieldState {
    open?: boolean;
}

export class NumberInputField extends React.Component<NumberInputFieldProps, NumberInputFieldState> {
    public static defaultProps: NumberInputFieldProps = { min: 0 };
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
        const { min, onValue } = this.props;
        let numberValue: number = parseFloat(value);
        if(numberValue < min) {
            numberValue = min;
        }
        if(onValue !== undefined) {
            onValue(numberValue);
        }
    }

    public constructor(props: NumberInputFieldProps) {
        super(props);
        this.state = { open: false};
        this._onFocus = this._handleFocus.bind(this);
        this._onRequestClose = this._handleRequestClose.bind(this);
        this._onInput = this._handleInput.bind(this);
    }

    public render(): JSX.Element {
        const { props, state, _onFocus, _onRequestClose, _onInput } = this;
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