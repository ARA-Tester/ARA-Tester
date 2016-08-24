import * as React from 'react';
import { Stepper, Step, StepLabel } from 'material-ui/Stepper';
import { LinearStepProps, LinearStep } from './LinearStep';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const { div } = React.DOM;

export type RequestStepTransitionHandler = (from: number, to: number) => void;

export type LinearStepperChild = React.ReactElement<LinearStepProps>;

export type LinearStepperChildren = Array<LinearStepperChild>;

export interface LinearStepperProps {
    activeStep: number;
    stepContent: React.ReactNode;
    stepCompleted: boolean;
    onRequestStepTransition: RequestStepTransitionHandler;
    children?: LinearStepperChildren;
}

export class LinearStepper extends React.Component<LinearStepperProps, void> {
    private _requestBack: React.MouseEventHandler;
    private _requestNext: React.MouseEventHandler;

    private _center(): React.CSSProperties {
        return {
            display: 'block',
            margin: 'auto',
            padding: 'auto',
            marginTop: 30,
            width: 210
        };
    }

    private _handleBack(event: React.MouseEvent): void {
        const { activeStep, onRequestStepTransition } = this.props;
        onRequestStepTransition(activeStep, activeStep - 1);
    }

    private _handleNext(event: React.MouseEvent): void {
        const { activeStep, onRequestStepTransition } = this.props;
        onRequestStepTransition(activeStep, activeStep + 1);
    }

    constructor(props: LinearStepperProps) {
        super(props);
        this._requestBack = this._handleBack.bind(this);
        this._requestNext = this._handleNext.bind(this);
    }

    public render(): JSX.Element {
        const { props, _requestBack, _requestNext } = this;
        const { activeStep, stepContent, stepCompleted, onRequestStepTransition, children } = props;
        const childrens: LinearStepperChildren = React.Children.toArray(children) as LinearStepperChildren;
        const { length } = childrens;
        const steps: Array<React.ReactNode> = children.map((child: LinearStepperChild, index: number): React.ReactNode => {
             return (
                <Step key={index}>
                    <StepLabel>{child.props.label}</StepLabel>
                </Step>
            );
        });
        let navigation: React.ReactNode;
        if((activeStep >= 0) && (activeStep < length)) {
            navigation = (
                <div style={this._center()}>
                    <FlatButton
                        primary
                        label="Back"
                        disabled={activeStep === 0} style={{ marginRight: 34 }}
                        onClick={_requestBack}
                    />
                    <RaisedButton
                        primary
                        label={activeStep !== (length - 1) ? 'Next' : 'Finish'}
                        disabled={!stepCompleted}
                        onClick={_requestNext}
                    />
                </div>
            );
        }
        
        return (
            <div style={{ width: '90%', margin: 'auto', marginTop: 30 }}>
                <Stepper activeStep={activeStep}>{steps}</Stepper>
                {stepContent}
                {navigation}
            </div>
        );
    }
}

export { LinearStep };

export default LinearStepper;