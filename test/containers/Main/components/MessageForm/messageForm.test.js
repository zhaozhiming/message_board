import React from 'react';
import { Button, Input, Form } from 'antd';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import MessageForm from 'containers/Main/components/MessageForm';

const props = {
  message: 'foo',
};

const context = {
  mainActions: {
    addMessage: sinon.spy(),
  }
};

describe('MessageForm component', () => {
  it('should render correctly', () => {
    const wrap = shallow(<MessageForm />).shallow();
    expect(wrap.find(Form).length).to.be.equal(1);
    expect(wrap.find(Form.Item).length).to.be.equal(3);
    expect(wrap.find(Input).length).to.be.equal(2);
    expect(wrap.find(Button).length).to.be.equal(1);
  });
});
