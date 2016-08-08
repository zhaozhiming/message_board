import style from './style.css';

import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Form, Input, Button } from 'antd';


class ReplyForm extends Component {
  static propTypes = {
    style: PropTypes.string,
    className: PropTypes.string,
    form: PropTypes.object,
    msgId: PropTypes.string,
    onClose: PropTypes.func,
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
      this.props.onClose();
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
      wrapperCol: { span: 20 },
    };

    return (
      <Form
        style={this.props.style}
        className={classnames(...className.split(), style.form)}
        horizontal form={this.props.form}
      >
        <Form.Item hasFeedback {...labelWrapper} >
          <Input
            type="textarea" rows={5}
            placeholder="请输入留言信息..." {...messageProps}
          />
        </Form.Item>
        <Form.Item {...labelWrapper} >
          <Input
            className={style.email}
            type="email" {...emailProps}
            placeholder="请输入邮箱..."
          />
          <Button type="primary" onClick={this.handleSubmit} >提交</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(ReplyForm);
