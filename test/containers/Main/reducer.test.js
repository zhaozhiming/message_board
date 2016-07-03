import { expect } from 'chai';
import main from 'containers/Main/reducer';
import * as at from 'constants/actionTypes';

describe('main reducer', () => {
  it('should add message correctly', () => {
    const result = main(undefined, {
      type: at.ADD_MESSAGE,
      message: 'foo',
      email: 'bar@abc.com',
    });
    expect(result.size).to.be.equal(1);
    expect(result.toJS()[0].message).to.be.equal('foo');
    expect(result.toJS()[0].email).to.be.equal('bar@abc.com');
  });
});
