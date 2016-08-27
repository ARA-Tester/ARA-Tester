import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AraSlotService from './../Slots/AraSlotService';
import { AraSlotIdentifier } from './../Slots/AraSlot';

const actionButoonStyle: React.CSSProperties = { margin: 5 };

export type AttachedModuleToSlotResponse = 'no' | 'single' | 'merged';

export type ResponseHandler = (response: AttachedModuleToSlotResponse) => void;

export interface AttachedModuleToSlotProps {
    slot: AraSlotIdentifier;
    mergedOption: boolean;
    onResponse: ResponseHandler;
}

export class AttachedModuleToSlot extends React.Component<AttachedModuleToSlotProps, void> {
    private _respondWithNo: React.MouseEventHandler;
    private _respondWithSingle: React.MouseEventHandler;
    private _respondeWithMerged: React.MouseEventHandler;

    private _respond(response: AttachedModuleToSlotResponse, event: React.MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
        this.props.onResponse(response);
    }

    private _renderActionButton(button: JSX.Element, responder: React.MouseEventHandler): JSX.Element {
        return React.cloneElement(button, {
            primary: true,
            style: actionButoonStyle,
            onClick: responder
         });
    }

    public constructor(props: AttachedModuleToSlotProps) {
        super(props);
        this._respondWithNo = this._respond.bind(this, 'no');
        this._respondWithSingle = this._respond.bind(this, 'single');
        this._respondeWithMerged = this._respond.bind(this, 'merged');
    }

    public render(): JSX.Element {
        const { slot, mergedOption } = this.props;
        const open: boolean = slot !== undefined;
        let actions: Array<JSX.Element>;
        if(open) {
            actions = [
                this._renderActionButton(<FlatButton label="No" />, this._respondWithNo),
                this._renderActionButton(<RaisedButton label="Yes, single module" />, this._respondWithSingle)
            ];
            if(mergedOption) {
               actions.push(this._renderActionButton(<RaisedButton label="Yes, double module" />, this._respondeWithMerged));
            }
        }
        return (
            <Dialog
                modal
                open={open}
                title="Is module going to be tested?"
                actions={actions}
            />
        );
    }
}

export default AttachedModuleToSlot;