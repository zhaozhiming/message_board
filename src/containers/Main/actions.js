import * as at from 'constants/actionTypes';

export function addMessage(message, email) {
  return {
    type: at.ADD_MESSAGE,
    message,
    email,
  };
}
