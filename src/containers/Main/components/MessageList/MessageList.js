import style from './style.css';

import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';


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

  state = {};

  renderMessageList() {
    const messages = this.context.main.toJS();
    return messages.map((msg, i) => (
      <div className={style.element} key={i}>
        <h2 className={style.title}>
          <span className={style.email}>{msg.email}</span>
          &nbsp;说:
        </h2>
        <span className={style.message}>{msg.message}</span>
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
