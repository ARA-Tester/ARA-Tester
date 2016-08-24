import * as React from 'react';
import StyleProp from './../../../StyleProp';
import AraTesterControlls from './AraTesterControlls';
import AraTesterPositions from './AraTesterPositions';
import Center from './../../../Center';

const { div } = React.DOM;

const childSpacingStyle: React.CSSProperties = { margin: 20 };

export default class AraTesterTrain extends React.Component<StyleProp, void> {
    private static _contentWith: number = 625;

    private _center(): React.CSSProperties {
        return Center(AraTesterTrain._contentWith, this.props.style);
    }

    public constructor(props: StyleProp) {
        super(props);
    }

    public shouldComponentUpdate(props: StyleProp, state: void): boolean {
        return false;
    }

    public render(): JSX.Element {
        return (
            <div style={this._center()}>
                <AraTesterPositions style={childSpacingStyle} />
                <AraTesterControlls style={childSpacingStyle} />
            </div>
        );
    }
}
