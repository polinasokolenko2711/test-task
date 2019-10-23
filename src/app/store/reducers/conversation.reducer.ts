import { ConversationActionTypes } from './../actions/conversation.action';
import { Conversation } from '../models';

export const initialState: Conversation = {
    messages: []
};

/**
 * Reducer for add Message to Contravention
 */
export function conversationReducer(state = initialState, action) {
    switch (action.type) {
        case ConversationActionTypes.SetConversationAction:
            return { messages: [ ...action.payload ]};
        default:
            return state;
        }
}
