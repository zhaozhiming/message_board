import * as at from 'constants/actionTypes';
import immutable, { List } from 'immutable';
import randomId from 'utils/randomId';

const INITIAL_STATE = new List;

function findMsgIndex(state, msgId) {
  return state.findIndex(m => m.id === msgId);
}

export default function main(state = INITIAL_STATE, action) {
  switch (action.type) {
    case at.ADD_MESSAGE:
      return state.push(immutable.fromJS({
        id: randomId(),
        message: action.message,
        email: action.email,
        createAt: new Date().getTime(),
        replies: [],
        showReply: false,
      }));
    case at.TOGGLE_REPLY_FORM:
      return state.updateIn([
        findMsgIndex(state, action.msgId),
        'showReply',
      ], v => !v);
    default:
      return state;
  }
}
