// import style from './style.css';

import React, { Component, PropTypes } from 'react';
import MessageForm from '../MessageForm';
import { Modal } from 'antd';


class ReplyForm extends Component {
  static propTypes = {
    msgId: PropTypes.string,
    show: PropTypes.bool,
    onCancel: PropTypes.func,
  };

  handleOk() {
  }

  render() {
    return (
      <Modal
        title={'回复留言'}
        visible={this.props.show}
        onOk={() => this.handleOk()}
        onCancel={this.props.onCancel}
      >
        <MessageForm msgId={this.props.msgId} />
      </Modal>
    );
  }
}

export default ReplyForm;
