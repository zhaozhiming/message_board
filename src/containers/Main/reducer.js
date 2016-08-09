import * as at from 'constants/actionTypes';
import immutable, { List } from 'immutable';

const INITIAL_STATE = new List;

function findMsgIndex(state, msgId) {
  return state.findIndex(m => m.get('id') === msgId);
}

export default function main(state = INITIAL_STATE, action) {
  switch (action.type) {
    case at.ADD_MESSAGE:
      return state.push(immutable.fromJS(action.message));
    case at.TOGGLE_REPLY_FORM:
      return state.updateIn([
        findMsgIndex(state, action.msgId),
        'showReply',
      ], v => !v);
    case at.ADD_REPLY:
      return state.updateIn([
        findMsgIndex(state, action.msgId),
        'replies',
      ], (replies) => replies.push(immutable.fromJS({
        message: action.message,
        email: action.email,
        createAt: new Date().getTime(),
      })));
    default:
      return state;
  }
}
