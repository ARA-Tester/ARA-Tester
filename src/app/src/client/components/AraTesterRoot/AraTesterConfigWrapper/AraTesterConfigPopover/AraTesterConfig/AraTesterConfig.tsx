import * as React from 'react';
import { TouchTapEventHandler, TouchTapEvent } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import List from 'material-ui/List';
import ContentSave from 'material-ui/svg-icons/content/save';
import { green500 } from 'material-ui/styles/colors';
import { AraTesterConfigPopoverProps } from './../AraTesterConfigPopover';
import AraTesterConfigState from './../../../../../../share/AraTesterAxisConfig';
import DeepContentBox from './../../../../DeepContentBox';
import SimpleListItem from './../../../../SimpleListItem';
import { default as NumberInput, NumberInputValueHandler } from './../../../../NumberInput';
import AraTesterAxisService from './../../../../../services/AraTesterAxisService';

export default class AraTesterConfig extends React.Component<AraTesterConfigPopoverProps, AraTesterConfigState> {
    private static _copyConfigInfo(info: AraTesterConfigState): AraTesterConfigState {
        return Object.assign({}, info);
    }

    private _AraTesterAxisService: AraTesterAxisService;
    public onPulseWidthChange: NumberInputValueHandler;
    public onTMaxChange: NumberInputValueHandler;
    public onTMinChange: NumberInputValueHandler;
    public onTDeltaChange: NumberInputValueHandler;
    public onConfiguredChange: NumberInputValueHandler;
    public onSaveTouchTap: TouchTapEventHandler;

    private _copyState(): AraTesterConfigState {
        return AraTesterConfig._copyConfigInfo(this.state);
    }

    private _setState(setter: (state: AraTesterConfigState) => void) {
        let clone: AraTesterConfigState = this._copyState();
        setter(clone);
        this.setState(clone);
    }

    private _convertFromServer(config: AraTesterConfigState): AraTesterConfigState {
        return {
            pulseWidth: config.pulseWidth / 1000,
            tMax: config.tMax / 1000,
            tMin: config.tMin / 1000,
            tDelta: config.tDelta / 1000,
            configured: config.configured
        };
    }

    private _convertToServer(config: AraTesterConfigState): AraTesterConfigState {
        return {
            pulseWidth: config.pulseWidth * 1000,
            tMax: config.tMax * 1000,
            tMin: config.tMin * 1000,
            tDelta: config.tDelta * 1000,
            configured: config.configured
        };
    }

    public constructor(props: AraTesterConfigPopoverProps) {
        let initalState: AraTesterConfigState = {
            pulseWidth: 0,
            tMax: 0,
            tMin: 0,
            tDelta: 0,
            configured: 0
        };
        super(props);
        this.state = AraTesterConfig._copyConfigInfo(initalState);
        this._AraTesterAxisService = new AraTesterAxisService(this.props.axisId);
        this.onPulseWidthChange = this.handlePulseWidthChange.bind(this);
        this.onTMaxChange = this.handleTMaxChange.bind(this);
        this.onTMinChange = this.handleTMinChange.bind(this);
        this.onTDeltaChange = this.handleTDeltaChange.bind(this);
        this.onConfiguredChange = this.handleConfiguredChange.bind(this);
        this.onSaveTouchTap = this.handleSaveTouchTap.bind(this);
    }

    public componentDidMount() {
        this._AraTesterAxisService.getConfiguration().then((config: AraTesterConfigState) => {
            this.setState(this._convertFromServer(config));;
        })
    }

    public handlePulseWidthChange(value: number) {
        this._setState((state: AraTesterConfigState) => { state.pulseWidth = value; });
    }

    public handleTMaxChange(value: number) {
        this._setState((state: AraTesterConfigState) => { state.tMax = value; });
    }

    public handleTMinChange(value: number) {
        this._setState((state: AraTesterConfigState) => { state.tMin = value; });
    }

    public handleTDeltaChange(value: number) {
        this._setState((state: AraTesterConfigState) => { state.tDelta = value; });
    }

    public handleConfiguredChange(value: number) {
        this._setState((state: AraTesterConfigState) => { state.configured = value; });
    }

    public handleSaveTouchTap(event: TouchTapEvent) {;
        this._AraTesterAxisService.saveConfiguration(this._convertToServer(this.state));
    }

    public render(): JSX.Element {
        return (
            <DeepContentBox style={this.props.style}>
                <List>
                    <SimpleListItem>
                        <NumberInput label="Pulse Width (uS)" value={this.state.pulseWidth} onChange={this.onPulseWidthChange} />
                    </SimpleListItem>
                    <SimpleListItem>
                        <NumberInput label="T max (uS)" value={this.state.tMax} onChange={this.onTMaxChange} />
                    </SimpleListItem>
                    <SimpleListItem>
                        <NumberInput label="T min (uS)" value={this.state.tMin} onChange={this.onTMinChange} />
                    </SimpleListItem>
                    <SimpleListItem>
                        <NumberInput label="T delta (uS)" value={this.state.tDelta} onChange={this.onTDeltaChange} />
                    </SimpleListItem>
                    <SimpleListItem>
                        <NumberInput label="Configured (uInt)" value={this.state.configured} onChange={this.onConfiguredChange} />
                    </SimpleListItem>
                    <SimpleListItem>
                        <RaisedButton
                            disabled={this.props.disabled}
                            label="save"
                            icon={<ContentSave color={green500} />}
                            onTouchTap={this.onSaveTouchTap} />
                    </SimpleListItem>
                </List>
            </DeepContentBox>
        );
    }
};