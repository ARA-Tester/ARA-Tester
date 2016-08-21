import * as React from 'react';
import Paper from 'material-ui/Paper';
import StyleProp from './StyleProp';

const stylePaper: React.CSSProperties = {
  padding: 10,
  textAlign: 'center',
  display: 'inline-block',
};

export default class DeepContentBox extends React.Component<StyleProp, void> {
    public render(): JSX.Element {
        const { style, children } = this.props;
        const paperStyle: React.CSSProperties = Object.assign({}, stylePaper, style);
        return <Paper style={paperStyle} zDepth={5}>{children}</Paper>;
    }
};