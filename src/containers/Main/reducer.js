import * as at from 'constants/actionTypes';
import immutable, { List } from 'immutable';

const INITIAL_STATE = new List;

export default function main(state = INITIAL_STATE, action) {
  switch (action.type) {
    case at.ADD_MESSAGE:
      return state.push(immutable.fromJS({
        message: action.message,
        email: action.email,
        replies: [],
      }));
    default:
      return state;
  }
}
