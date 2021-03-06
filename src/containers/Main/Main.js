import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MainActions from 'containers/Main/actions';
import Header from './components/Header';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';


function mapStateToProps(state) {
  const { main } = state;
  return { main };
}

function mapDispatchToProps(dispatch) {
  return {
    mainActions: bindActionCreators(MainActions, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Main extends Component {
  static propTypes = {
    main: PropTypes.object.isRequired,
    mainActions: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    main: PropTypes.object,
    mainActions: PropTypes.object,
  };

  getChildContext() {
    const { main, mainActions } = this.props;
    return { main, mainActions };
  }

  render() {
    return (
      <div className={style.content}>
        <Header />
        <div className={style.main} >
          <MessageList />
          <MessageForm />
        </div>
      </div>
    );
  }
}

export default Main;
