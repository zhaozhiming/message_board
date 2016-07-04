import style from './style.css';

import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import moment from 'moment';


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
  };

  constructor(props, context) {
    super(props, context);
    this.handleReplyClick = this.handleReplyClick.bind(this);
  }

  formatDate(time) {
    return moment(time).format('YYYY-MM-DD HH:mm:ss');
  }

  handleReplyClick() {
  }

  renderMessageList() {
    const messages = this.context.main.toJS();
    return messages.map((msg, i) => (
      <div className={style.element} key={i}>
        <h2 className={style.title}>
          <span className={style.email}>{msg.email}</span>
          &nbsp;说:
        </h2>
        <span className={style.message}>{msg.message}</span>
        <span className={style.createAt}>
          {this.formatDate(msg.createAt)}&nbsp;|&nbsp;
          <a className={style['reply-link']} onClick={this.handleReplyClick}>回复</a>
        </span>
        <div className={style['reply-form']}>
        </div>
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
