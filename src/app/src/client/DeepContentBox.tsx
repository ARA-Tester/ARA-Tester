import * as React from 'react';
import Paper from 'material-ui/Paper';

const stylePaper = {
  padding: 10,
  textAlign: 'center',
  display: 'inline-block',
};

export default class DeepContentBox extends React.Component<void, void> {
    render(): JSX.Element {
        return <Paper style={stylePaper} zDepth={5}>{this.props.children}</Paper>;
    }
};