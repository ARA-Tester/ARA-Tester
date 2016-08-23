import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import List from 'material-ui/List';
import ContentSave from 'material-ui/svg-icons/content/save';
import { green500 } from 'material-ui/styles/colors';
import { AraTesterConfigPopoverProps } from './AraTesterConfigPopover';
import AraTesterAxisConfig from './../../../../../share/AraTesterAxisConfig';
import DeepContentBox from './../../../DeepContentBox';
import { NumberInputField, NumberInputFieldValueHandler } from './../../../NumberInputField';
import AraTesterAxisService from './../../../../services/AraTesterAxisService';

const { div } = React.DOM;

export interface  AraTesterConfigState {
    pulseWidth?: number;
    tMax?: number;
    tMin?: number;
    tDelta?: number;
    configured?: number;
};

export default class AraTesterConfig extends React.Component<AraTesterConfigPopoverProps, AraTesterConfigState> {
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

    public constructor(props: AraTesterConfigPopoverProps) {
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

    public shouldComponentUpdate(props: AraTesterConfigPopoverProps, state: AraTesterConfigState): boolean {
        const propsChange: boolean = (this.props.disabled !== props.disabled);
        const stateChange: boolean = (this.state.configured !== state.configured) || (this.state.pulseWidth !== this.state.pulseWidth)
            || (this.state.tDelta !== state.tDelta) || (this.state.tMax !== state.tMax) || (this.state.tMin !== state.tMin);
        return propsChange || stateChange;
    }

    public handlePulseWidthChange(value: number): void {
        this.setState({ pulseWidth: value });
    }

    public handleTMaxChange(value: number): void {
        this.setState({ tMax: value });
    }

    public handleTMinChange(value: number): void {
        this.setState({ tMin: value });
    }

    public handleTDeltaChange(value: number): void {
        this.setState({ tDelta: value });
    }

    public handleConfiguredChange(value: number): void {
        this.setState({ configured: value });
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
                <List>
                    <div>
                        <NumberInputField label="Pulse Width (uS)" value={pulseWidth} onValue={onPulseWidthChange} />
                    </div>
                    <div>
                        <NumberInputField label="T max (uS)" value={tMax} onValue={onTMaxChange} />
                    </div>
                    <div>
                        <NumberInputField label="T min (uS)" value={tMin} onValue={onTMinChange} />
                    </div>
                    <div>
                        <NumberInputField label="T delta (uS)" value={tDelta} onValue={onTDeltaChange} />
                    </div>
                    <div>
                        <NumberInputField label="Configured (uInt)" value={configured} onValue={onConfiguredChange} />
                    </div>
                    <div>
                        <RaisedButton
                            disabled={disabled}
                            label="save"
                            icon={<ContentSave color={green500} />}
                            onClick={onSaveClick} />
                    </div>
                </List>
            </DeepContentBox>
        );
    }
};