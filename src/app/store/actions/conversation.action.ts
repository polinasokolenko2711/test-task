import { Action } from '@ngrx/store';

import { Message } from '../models';

export enum ConversationActionTypes {
    SetConversationAction = '[SetConversationAction] SetConversation Action'
}

/**
 * Action for add Message to Contravention
 */
export class SetConversationAction implements Action {
    readonly type = ConversationActionTypes.SetConversationAction;

    constructor(public payload: Message[]) { }
}

export type ConversationActions = SetConversationAction;
