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
    };
    fetch('/api/message/save', {
      method: 'PUT',
      body: JSON.stringify(messageInfo),
    })
    .then(() => dispatch({
      type: at.ADD_MESSAGE,
      message: Object.assign({}, messageInfo, { showReply: false }),
    }));
  };
}

export function toggleReplyForm(msgId) {
  return {
    type: at.TOGGLE_REPLY_FORM,
    msgId,
  };
}

export function addReply(msgId, reply, email) {
  return async (dispatch) => {
    const response = await fetch(`/api/message/${msgId}`);
    const message = await response.json();
    message.replies.push({
      message: reply,
      email,
      createAt: new Date().getTime(),
    });

    fetch('/api/message/save', {
      method: 'POST',
      body: JSON.stringify(message),
    })
    .then(() => dispatch({
      type: at.ADD_REPLY,
      msgId,
      message: Object.assign({}, message, { showReply: false }),
    }));
  };
}

export function getAllMessages() {
  return (dispatch) => {
    fetch('api/message/all')
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: at.ALL_MESSAGE,
        messages: json.map(x => x.doc),
      });
    });
  };
}
