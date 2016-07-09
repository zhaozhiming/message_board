import * as at from 'constants/actionTypes';

export function addMessage(message, email) {
  return {
    type: at.ADD_MESSAGE,
    message,
    email,
  };
}

export function toggleReplyForm(msgId) {
  return {
    type: at.TOGGLE_REPLY_FORM,
    msgId,
  };
}
