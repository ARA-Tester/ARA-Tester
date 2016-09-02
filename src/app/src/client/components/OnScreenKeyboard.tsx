import * as React from 'react';
import { Keyboard, RequestCloseHandler, InputHandler, TextFieldElement, KeyboardLayout } from 'react-material-ui-keyboard';

export interface OnScreenKeyboardProps {
    layout: KeyboardLayout;
    textField: TextFieldElement;
    onInput: InputHandler;
    correctorName?: string;
    corrector?: Function;
}

export class OnScreenKeyboard extends React.Component<OnScreenKeyboardProps, void> {
    private static _keyboardKeyHeight: number = 50;
    private static _keyboardKeyWidth: number = 100;
    private static _keyboardKeySymbolSize: number = 36;

    constructor(props: OnScreenKeyboardProps) {
        super(props);
    }

    public render(): JSX.Element {
        const { layout, textField, onInput, correctorName, corrector } = this.props;
        const { _keyboardKeyHeight, _keyboardKeyWidth, _keyboardKeySymbolSize } = OnScreenKeyboard;
        return (
            <Keyboard
                automatic
                layouts={[layout]}
                textField={textField}
                onInput={onInput}
                correctorName={correctorName}
                corrector={corrector}
                keyboardKeyHeight={_keyboardKeyHeight}
                keyboardKeyWidth={_keyboardKeyWidth}
                keyboardKeySymbolSize={_keyboardKeySymbolSize}
            />
        );
    }
}

export default OnScreenKeyboard;