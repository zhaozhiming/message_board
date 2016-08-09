import style from './style.css';

import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { formatDate } from 'utils/dateUtils';
import ReplyForm from '../ReplyForm';
import ReplyList from '../ReplyList';
import { avatarHash } from 'utils/gravatar';


class MessageList extends Component {
  static propTypes = {
    style: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  static contextTypes = {
    main: PropTypes.object,
    mainActions: PropTypes.object,
  };

  componentDidMount() {
    this.context.mainActions.getAllMessages();
  }

  handleReplyClick(msgId) {
    this.context.mainActions.toggleReplyForm(msgId);
  }

  renderMessageList() {
    const messages = this.context.main.toJS();
    return messages.map((msg, i) => (
      <div
        key={i}
        className={style.element}
      >
        <h2 className={style.title}>
          <img className={style.header} alt="header" src={`https://www.gravatar.com/avatar/${avatarHash(msg.email)}?s=30`} />
          <span className={style.email}>{msg.email}</span>
          &nbsp;说:
        </h2>
        <span className={style.message}>{msg.message}</span>
        <span className={style.createAt}>
          {formatDate(msg.createAt)}&nbsp;|&nbsp;
          <a className={style['reply-link']} onClick={() => this.handleReplyClick(msg._id)}>回复</a>
        </span>
        <div className={msg.showReply ? style['reply-form-show'] : style['reply-form-hidden']}>
          <ReplyForm msgId={msg._id} />
        </div>
        <ReplyList replies={msg.replies} />
      </div>
    ));
  }

  render() {
    const { className } = this.props;
    return (
      <div
        style={this.props.style}
        className={classnames(...className.split(), style.list)}
      >
      {this.renderMessageList()}
      </div>
    );
  }
}

export default MessageList;
