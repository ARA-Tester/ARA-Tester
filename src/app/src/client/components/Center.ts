import { CSSProperties } from 'react';

const centerStyle: React.CSSProperties = {
    display: 'block',
    margin: 'auto',
    padding: 'auto'
};

export default function Center(width: number, style?: CSSProperties): CSSProperties {
    return Object.assign({ width: width }, centerStyle, style);
}