import * as React from 'react';
import Paper from 'material-ui/Paper';

const stylePaper: React.CSSProperties = {
  padding: 10,
  textAlign: 'center',
  display: 'inline-block',
};

interface DeepContentBoxProps {
    style? : React.CSSProperties;
}

export default class DeepContentBox extends React.Component<DeepContentBoxProps, void> {
    public render(): JSX.Element {
        return <Paper style={Object.assign({}, stylePaper, this.props.style)} zDepth={5}>{this.props.children}</Paper>;
    }
};