import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import List from 'material-ui/List';
import ContentSave from 'material-ui/svg-icons/content/save';
import { green500 } from 'material-ui/styles/colors';
import { AraTesterConfigPopoverProps } from './AraTesterConfigPopover';
import AraTesterAxisConfig from './../../../../../share/AraTesterAxisConfig';
import DeepContentBox from './../../../DeepContentBox';
import { default as NumberInput, NumberInputValueHandler } from './../../../NumberInput';
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
    public onPulseWidthChange: NumberInputValueHandler;
    public onTMaxChange: NumberInputValueHandler;
    public onTMinChange: NumberInputValueHandler;
    public onTDeltaChange: NumberInputValueHandler;
    public onConfiguredChange: NumberInputValueHandler;
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
        return (
            <DeepContentBox style={this.props.style}>
                <List>
                    <div>
                        <NumberInput label="Pulse Width (uS)" value={this.state.pulseWidth} onChange={this.onPulseWidthChange} />
                    </div>
                    <div>
                        <NumberInput label="T max (uS)" value={this.state.tMax} onChange={this.onTMaxChange} />
                    </div>
                    <div>
                        <NumberInput label="T min (uS)" value={this.state.tMin} onChange={this.onTMinChange} />
                    </div>
                    <div>
                        <NumberInput label="T delta (uS)" value={this.state.tDelta} onChange={this.onTDeltaChange} />
                    </div>
                    <div>
                        <NumberInput label="Configured (uInt)" value={this.state.configured} onChange={this.onConfiguredChange} />
                    </div>
                    <div>
                        <RaisedButton
                            disabled={this.props.disabled}
                            label="save"
                            icon={<ContentSave color={green500} />}
                            onClick={this.onSaveClick} />
                    </div>
                </List>
            </DeepContentBox>
        );
    }
};