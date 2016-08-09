import { expect } from 'chai';
import main from 'containers/Main/reducer';
import * as at from 'constants/actionTypes';
import { List, Map } from 'immutable';


const INITIAL_STATE = new List([new Map({
  _id: '1',
  message: 'foo',
  email: 'foo@bar.com',
  replies: new List,
  showReply: false,
})]);

describe('main reducer', () => {
  it('should add message correctly', () => {
    const message = {
      message: 'foo',
      email: 'bar@abc.com',
    };
    const result = main(INITIAL_STATE, {
      type: at.ADD_MESSAGE,
      message,
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
    const message = {
      _id: '1',
      message: 'foo',
      email: 'foo@bar.com',
      replies: [
        {
          message: 'reply',
          email: 'bar@foo.com',
        },
      ],
      showReply: false,
    };
    const result = main(INITIAL_STATE, {
      type: at.ADD_REPLY,
      msgId: '1',
      message,
    });
    expect(result.toJS()[0].replies[0].message).to.be.equal('reply');
    expect(result.toJS()[0].replies[0].email).to.be.equal('bar@foo.com');
  });

  it('should fetch all messages correctly', () => {
    const messages = [
      {
        message: 'bar',
        email: 'bar@foo.com',
      },
    ];
    const result = main(INITIAL_STATE, {
      type: at.ALL_MESSAGE,
      messages,
    });
    expect(result.size).to.be.equal(2);
    expect(result.toJS()[1].message).to.be.equal('bar');
    expect(result.toJS()[1].email).to.be.equal('bar@foo.com');
  });
});
