import * as React from 'react';
import OnScreenKeyboard from './OnScreenKeyboard';
import Keyboard from 'react-material-ui-keyboard';
import { TextInput, TextInputProps } from './TextInput';
import { ExtendedKeyboard, RequestCloseHandler, InputHandler, TextFieldElement } from 'react-material-ui-keyboard'

export type TextInputFieldValueHandler = (value: string) => void;

export interface TextInputFieldProps extends TextInputProps {
    fieldValue: string;
    onFieldValue: TextInputFieldValueHandler;
}

function corrector(value: string): void {
    (this as Keyboard).makeCorrection(value);
}

export class TextInputField extends React.Component<TextInputFieldProps, void> {
    public constructor(props: TextInputFieldProps) {
        super(props);
    }

    public render(): JSX.Element {
        const { props } = this;
        const { onFieldValue, fieldValue } = props; 
        let textInputProps = Object.assign({}, props);
        delete textInputProps.fieldValue;
        delete textInputProps.onFieldValue;
        const textInput: JSX.Element = (
            <TextInput
                {...textInputProps}
                value={fieldValue}
                onRequestValue={onFieldValue} />
        );
        return (
            <OnScreenKeyboard
                layout={ExtendedKeyboard}
                textField={textInput}
                onInput={onFieldValue}
                correctorName="onRequestValue"
                corrector={corrector}
            />
        )
    }
}

export default TextInputField;
