import * as at from 'constants/actionTypes';
import immutable, { List } from 'immutable';
import randomId from 'utils/randomId';

const INITIAL_STATE = new List;

export default function main(state = INITIAL_STATE, action) {
  switch (action.type) {
    case at.ADD_MESSAGE:
      return state.push(immutable.fromJS({
        id: randomId(),
        message: action.message,
        email: action.email,
        createAt: new Date().getTime(),
        replies: [],
      }));
    default:
      return state;
  }
}
