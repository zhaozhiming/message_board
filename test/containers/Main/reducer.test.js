import { expect } from 'chai';
import main from 'containers/Main/reducer';
import * as at from 'constants/actionTypes';
import { List, Map } from 'immutable';


const INITIAL_STATE = new List([new Map({
  id: '1',
  message: 'foo',
  email: 'foo@bar.com',
  replies: new List,
  showReply: false,
})]);

describe('main reducer', () => {
  it('should add message correctly', () => {
    const result = main(INITIAL_STATE, {
      type: at.ADD_MESSAGE,
      message: 'foo',
      email: 'bar@abc.com',
    });
    expect(result.size).to.be.equal(2);
    expect(result.toJS()[1].message).to.be.equal('foo');
    expect(result.toJS()[1].email).to.be.equal('bar@abc.com');
  });

  it('should toggle reply form correctly', () => {
    const result = main(INITIAL_STATE, {
      type: at.TOGGLE_REPLY_FORM,
      msgId: '1',
    });
    expect(result.toJS()[0].showReply).to.be.equal(true);
  });

  it('should add reply correctly', () => {
    const result = main(INITIAL_STATE, {
      type: at.ADD_REPLY,
      msgId: '1',
      message: 'foo',
      email: 'bar@abc.com',
    });
    expect(result.toJS()[0].replies[0].message).to.be.equal('foo');
    expect(result.toJS()[0].replies[0].email).to.be.equal('bar@abc.com');
  });
});
