import * as React from 'react';
import { ListItem } from 'material-ui/List';
import StyleProp from './StyleProp';

export interface SimpleListItemProps extends StyleProp {
    
}

const SimpleListItemInnerDivStyle: React.CSSProperties = {
    margin: 0,
    padding: 0,
    position: 'relative'
}

export default class SimpleListItem extends React.Component<SimpleListItemProps, void> {
    public render(): JSX.Element {
        return (
            <ListItem
                style={this.props.style}
                innerDivStyle={SimpleListItemInnerDivStyle}
                disabled>
                    {this.props.children}
            </ListItem>
        );
    }
}
