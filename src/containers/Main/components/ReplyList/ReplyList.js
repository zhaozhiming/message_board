import style from './style.css';

import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { formatDate } from 'utils/dateUtils';


class ReplyList extends Component {
  static propTypes = {
    style: PropTypes.string,
    className: PropTypes.string,
    replies: PropTypes.array,
  };

  static defaultProps = {
    className: '',
  };

  state = {};

  renderReplies() {
    const { replies } = this.props;
    if (!replies || replies.length === 0) return false;

    return replies.map((r, index) => (
      <div key={index} className={style.reply}>
        <p className={style.email}>{r.email}&nbsp;回复:&nbsp;</p>
        <p className={style.message}>{r.message}</p>
        <p className={style['create-at']}>{formatDate(r.createAt)}</p>
      </div>
    ));
  }

  render() {
    const { className } = this.props;

    return (
      <div
        style={this.props.style}
        className={classnames(...className.split(), style['reply-list'])}
      >
      {this.renderReplies()}
      </div>
    );
  }
}

export default ReplyList;
