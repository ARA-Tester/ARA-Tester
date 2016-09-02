import * as React from 'react';
import OnScreenKeyboard from './OnScreenKeyboard';
import { Keyboard } from 'react-material-ui-keyboard';
import { NumberInput, NumberInputProps, NumberInputValidHandler, NumberInputReqestValueHandller } from 'material-ui-number-input';
import { NumericKeyboard, RequestCloseHandler, InputHandler, TextFieldElement } from 'react-material-ui-keyboard'

export type NumberInputFieldValueHandler = NumberInputValidHandler;

export interface NumberInputFieldProps extends NumberInputProps {
    fieldValue: number;
    onFieldValue: NumberInputValidHandler;
}

function corrector(value: string): void {
    this.makeCorrection(value);
}

export class NumberInputField extends React.Component<NumberInputFieldProps, void> {
    public static defaultProps: NumberInputProps = { min: 0 };
    private _onInput: InputHandler;

    private _handleInput(value: string): void {
        this.props.onFieldValue(parseFloat(value));
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
        const numberInput: JSX.Element = (
            <NumberInput
                {...numberInputProps}
                value={String(fieldValue)}
                strategy="ignore"
                onReqestValue={_onInput} />
        );
        return (
            <OnScreenKeyboard
                layout={NumericKeyboard}
                textField={numberInput}
                onInput={_onInput}
                correctorName="onReqestValue"
                corrector={corrector} />
        )
    }
}

export default NumberInputField;