import * as at from 'constants/actionTypes';

export function addMessage(message, email) {
  return (dispatch) => {
    const time = new Date().getTime();
    const messageInfo = {
      _id: time.toString(),
      message,
      email,
      createAt: time,
      replies: [],
      showReply: false,
    };
    fetch('/api/message/add', {
      method: 'PUT',
      body: JSON.stringify(messageInfo),
    })
    .then(() => dispatch({
      type: at.ADD_MESSAGE,
      message: messageInfo,
    }));
  };
}

export function toggleReplyForm(msgId) {
  return {
    type: at.TOGGLE_REPLY_FORM,
    msgId,
  };
}

export function addReply(msgId, message, email) {
  return {
    type: at.ADD_REPLY,
    msgId,
    message,
    email,
  };
}
