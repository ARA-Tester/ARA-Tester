import * as React from 'react';
import OnScreenKeyboard from './OnScreenKeyboard';
import { NumberInput, NumberInputProps, NumberInputValidHandler } from 'material-ui-number-input';
import { NumericKeyboard, RequestCloseHandler, InputHandler, TextFieldElement } from 'react-material-ui-keyboard'

export type NumberInputFieldValueHandler = NumberInputValidHandler;

export interface NumberInputFieldProps extends NumberInputProps {
    fieldValue: number;
    onFieldValue: NumberInputValidHandler;
}

export class NumberInputField extends React.Component<NumberInputFieldProps, void> {
    public static defaultProps: NumberInputProps = { min: 0 };
    private _onInput: InputHandler;

    private _handleInput(value: string): void {
        const { min, onFieldValue } = this.props;
        let fieldValue: number = parseFloat(value);
        if(fieldValue < min) {
            fieldValue = min;
        }
        onFieldValue(fieldValue);
    }

    public constructor(props: NumberInputFieldProps) {
        super(props);
        this._onInput = this._handleInput.bind(this);
    }

    public render(): JSX.Element {
        const { props, state, _onInput } = this;
        const { fieldValue } = props;
        let clonedProps: NumberInputFieldProps = Object.assign({}, props);
        delete clonedProps.fieldValue;
        delete clonedProps.onFieldValue;
        const numberInputProps: NumberInputProps = clonedProps;
        return (
            <OnScreenKeyboard
                layout={NumericKeyboard}
                textField={<NumberInput {...numberInputProps} value={String(fieldValue)} strategy="ignore" />}
                onInput={_onInput}
            />
        )
    }
}

export default NumberInputField;