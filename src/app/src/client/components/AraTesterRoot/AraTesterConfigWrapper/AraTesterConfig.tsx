import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import { green500 } from 'material-ui/styles/colors';
import AraTesterAxisConfig from './../../../../share/AraTesterAxisConfig';
import AraTesterAxisId from './../../../../share/AraTesterAxisId';
import StyleProp from './../../StyleProp';
import DisabledProp from './../../DisabledProp';
import DeepContentBox from './../../DeepContentBox';
import { NumberInputField, NumberInputFieldValueHandler } from './../../NumberInputField';
import AraTesterAxisService from './../../../services/AraTesterAxisService';

const { div } = React.DOM;

export interface AraTesterConfigProps extends AraTesterAxisId, StyleProp, DisabledProp {

}

export interface  AraTesterConfigState {
    pulseWidth?: number;
    tMax?: number;
    tMin?: number;
    tDelta?: number;
    configured?: number;
};

export default class AraTesterConfig extends React.Component<AraTesterConfigProps, AraTesterConfigState> {
    private _AraTesterAxisService: AraTesterAxisService;
    public onPulseWidthChange: NumberInputFieldValueHandler;
    public onTMaxChange: NumberInputFieldValueHandler;
    public onTMinChange: NumberInputFieldValueHandler;
    public onTDeltaChange: NumberInputFieldValueHandler;
    public onConfiguredChange: NumberInputFieldValueHandler;
    public onSaveClick: React.MouseEventHandler;

    private _convertFromServer(config: AraTesterAxisConfig): AraTesterConfigState {
        return {
            pulseWidth: config.pulseWidth / 1000,
            tMax: config.tMax / 1000,
            tMin: config.tMin / 1000,
            tDelta: config.tDelta / 1000,
            configured: config.configured
        };
    }

    private _convertToServer(config: AraTesterConfigState): AraTesterAxisConfig {
        return {
            pulseWidth: config.pulseWidth * 1000,
            tMax: config.tMax * 1000,
            tMin: config.tMin * 1000,
            tDelta: config.tDelta * 1000,
            configured: config.configured
        };
    }

    public constructor(props: AraTesterConfigProps) {
        super(props);
        this.state = {
            pulseWidth: 0,
            tMax: 0,
            tMin: 0,
            tDelta: 0,
            configured: 0
        };
        this._AraTesterAxisService = new AraTesterAxisService(this.props.axisId);
        this.onPulseWidthChange = this.handlePulseWidthChange.bind(this);
        this.onTMaxChange = this.handleTMaxChange.bind(this);
        this.onTMinChange = this.handleTMinChange.bind(this);
        this.onTDeltaChange = this.handleTDeltaChange.bind(this);
        this.onConfiguredChange = this.handleConfiguredChange.bind(this);
        this.onSaveClick = this.handleSaveClick.bind(this);
    }

    public componentDidMount(): void {
        this._AraTesterAxisService.getConfiguration().then((config: AraTesterAxisConfig) => {
            this.setState(this._convertFromServer(config));;
        })
    }

    public shouldComponentUpdate(props: AraTesterConfigProps, state: AraTesterConfigState): boolean {
        const { configured, pulseWidth, tDelta, tMax, tMin } = this.state;
        const propsChange: boolean = (this.props.disabled !== props.disabled);
        const stateChange: boolean = (configured !== state.configured) || (pulseWidth !== state.pulseWidth)
            || (tDelta !== state.tDelta) || (tMax !== state.tMax) || (tMin !== state.tMin);
        return propsChange || stateChange;
    }

    public handlePulseWidthChange(fieldFieldValue: number): void {
        this.setState({ pulseWidth: fieldFieldValue });
    }

    public handleTMaxChange(fieldFieldValue: number): void {
        this.setState({ tMax: fieldFieldValue });
    }

    public handleTMinChange(fieldFieldValue: number): void {
        this.setState({ tMin: fieldFieldValue });
    }

    public handleTDeltaChange(fieldFieldValue: number): void {
        this.setState({ tDelta: fieldFieldValue });
    }

    public handleConfiguredChange(fieldFieldValue: number): void {
        this.setState({ configured: fieldFieldValue });
    }

    public handleSaveClick(event: React.MouseEvent): void {;
        this._AraTesterAxisService.saveConfiguration(this._convertToServer(this.state));
    }

    public render(): JSX.Element {
        const { props, state, onPulseWidthChange, onTMaxChange, onTMinChange, onTDeltaChange, onConfiguredChange, onSaveClick } = this;
        const { disabled, style } = props;
        const { pulseWidth, tMax, tMin, tDelta, configured } = state;
        return (
            <DeepContentBox style={style}>
                <div>
                    <div>
                        <NumberInputField floatingLabelText="Pulse Width (uS)" fieldValue={pulseWidth} onFieldValue={onPulseWidthChange} />
                    </div>
                    <div>
                        <NumberInputField floatingLabelText="T max (uS)" fieldValue={tMax} onFieldValue={onTMaxChange} />
                    </div>
                    <div>
                        <NumberInputField floatingLabelText="T min (uS)" fieldValue={tMin} onFieldValue={onTMinChange} />
                    </div>
                    <div>
                        <NumberInputField floatingLabelText="T delta (uS)" fieldValue={tDelta} onFieldValue={onTDeltaChange} />
                    </div>
                    <div>
                        <NumberInputField floatingLabelText="Configured (uInt)" fieldValue={configured} onFieldValue={onConfiguredChange} />
                    </div>
                    <div>
                        <RaisedButton
                            disabled={disabled}
                            label="save"
                            icon={<ContentSave color={green500} />}
                            onClick={onSaveClick} />
                    </div>
                </div>
            </DeepContentBox>
        );
    }
};