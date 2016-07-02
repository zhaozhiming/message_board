import style from './style.css';

import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Form, Input, Button } from 'antd';


class MessageForm extends Component {
  static propTypes = {
    style: PropTypes.string,
    className: PropTypes.string,
    form: PropTypes.object,
  };

  static contextTypes = {
    mainActions: PropTypes.object,
  };

  static defaultProps = {
    className: '',
  };

  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) return;

      const { message, email } = values;
      this.context.mainActions.addMessage(message, email);
    });
  }

  render() {
    const { className } = this.props;
    const { getFieldProps } = this.props.form;
    const emailProps = getFieldProps('email', {
      validate: [{
        rules: [
          { required: true },
        ],
        trigger: 'onBlur',
      }, {
        rules: [
          { type: 'email', message: '请输入正确的邮箱地址' },
        ],
        trigger: ['onBlur', 'onChange'],
      }],
    });

    const messageProps = getFieldProps('message', {
      rules: [
        { required: true, message: '留言不能为空' },
      ],
    });

    const labelWrapper = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };

    return (
      <Form
        style={this.props.style}
        className={classnames(...className.split(), style.form)}
        horizontal form={this.props.form}
      >
        <Form.Item label="您的留言" hasFeedback {...labelWrapper} >
          <Input
            type="textarea" rows={6}
            placeholder="请输入留言信息..." {...messageProps}
          />
        </Form.Item>
        <Form.Item label="您的邮箱" hasFeedback {...labelWrapper} >
          <Input type="email" {...emailProps} placeholder="请输入邮箱..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={this.handleSubmit} >提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(MessageForm);
