import style from './style.css';

import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Col } from 'antd';


class ReplyForm extends Component {
  static propTypes = {
    style: PropTypes.string,
    className: PropTypes.string,
    form: PropTypes.object,
    showText: PropTypes.bool,
    msgId: PropTypes.string,
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
      this.context.mainActions.addReply(this.props.msgId, message, email);
    });
  }

  renderTitle() {
    if (!this.props.showText) return false;

    return (
      <h1 className={style.header}>我要发表看法</h1>
    );
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
      wrapperCol: { span: 20 },
    };

    const messageLabel = this.props.showText ? '您的留言' : '';
    const emailLabel = this.props.showText ? '您的邮箱' : '';

    return (
      <Form
        style={this.props.style}
        className={classnames(...className.split(), style.form)}
        horizontal form={this.props.form}
      >
        {this.renderTitle()}
        <Form.Item label={messageLabel} hasFeedback {...labelWrapper} >
          <Input
            type="textarea" rows={5}
            placeholder="请输入留言信息..." {...messageProps}
          />
        </Form.Item>
        <Form.Item label={emailLabel} hasFeedback {...labelWrapper} >
          <Input.Group>
            <Col span="18">
              <Input type="email" {...emailProps} placeholder="请输入邮箱..." />
            </Col>
            <Col span="1">
              <Button type="primary" onClick={this.handleSubmit} >提交</Button>
            </Col>
          </Input.Group>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(ReplyForm);
