import * as React from 'react';
import OnScreenKeyboard from './../OnScreenKeyboard';
import { TextInput, TextInputProps } from './TextInput';
import { ExtendedKeyboard, RequestCloseHandler, InputHandler, TextFieldElement } from 'react-material-ui-keyboard'

export type TextInputFieldValueHandler = (value: string) => void;

export interface TextInputFieldProps extends TextInputProps {
    fieldValue: string;
    onFieldValue: TextInputFieldValueHandler;
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
        return (
            <OnScreenKeyboard
                layout={ExtendedKeyboard}
                textField={<TextInput {...textInputProps} value={fieldValue} />}
                onInput={onFieldValue}
            />
        )
    }
}

export default TextInputField;