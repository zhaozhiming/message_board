import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { List } from 'immutable';
import MessageList from 'containers/Main/components/MessageList';

const context = {
  main: new List([
    {
      email: 'foo@abc.com',
      message: 'foo',
    },
    {
      email: 'bar@abc.com',
      message: 'bar',
    },
  ]),
};

describe('MessageList component', () => {
  function email(wrapper, index) {
    return wrapper
      .find('h2')
      .at(index)
      .find('span')
      .text();
  }

  it('should render correctly', () => {
    const wrapper = shallow(<MessageList />, { context });
    expect(wrapper.find('h2').length).to.be.equal(2);
    expect(email(wrapper, 0)).to.be.equal('foo@abc.com');
    expect(email(wrapper, 1)).to.be.equal('bar@abc.com');
  });
});

