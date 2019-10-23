import { createSelector } from '@ngrx/store';

import { AppState } from '../app.state';

export const selectConversationState = (state: AppState) => state.conversation;

/**
 * Selector for getting messages
 */
export const getMessages = createSelector(
    selectConversationState,
    conversation => conversation.messages
);
