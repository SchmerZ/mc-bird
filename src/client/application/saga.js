import {eventChannel, END, delay} from 'redux-saga'
import {call, put, take, takeLatest} from 'redux-saga/effects'
import {push} from 'connected-react-router'

import * as A from './actions'
import * as messagesActions from '../messages/actions'

import variant from '../constants/snackbar-variant'

const webSocketConnectionMaxAttemptsCount = 3;
const delayBetweenConnectionTry = 1000;

const sagaCreator = (config) => {
  function* saga() {
    yield takeLatest(A.navigateTo, onNavigateTo);

    yield initializeWebSocket();
  }

  function* initializeWebSocket() {
    try {
      while (true) {
        const socket = yield call(getWebSocketConnection);
        yield call(initializeWebSocketChannel, socket);
      }
    }
    catch (error) {
      yield put(A.notify({message: error.message, type: variant.error}));
    }
  }

  function* getWebSocketConnection() {
    const url = config.wsServerUrl;

    let connectionTries = 0;

    while (connectionTries++ < webSocketConnectionMaxAttemptsCount) {
      try {
        console.log(`Trying to open WebSocket connection (${url})... Attempt ${connectionTries}...`);
        const socket = new WebSocket(url);
        console.log(`WebSocket connection opened!`);

        return socket;
      }
      catch (error) {
        console.error(`Unable to open WebSocket connection. Error: ${error}.`);
      }

      yield delay(delayBetweenConnectionTry);
    }

    throw new Error('Unable to connect to server. Please contact an administrator or try to reload a page.');
  }

  function* initializeWebSocketChannel(socket) {
    const channel = yield call(watchMessages, socket);

    try {
      console.log('Start listening WebSocket channel...');

      while (true) {
        const {message} = yield take(channel);

        if (message.type === 'accept') {
          window.headers = {
            [message.name]: message.value
          };
        }
        else {
          yield put(messagesActions.incomeMessage({message}));
          yield put(A.notify({message: 'You have received a new message.'}));
        }
      }
    }
    finally {
      console.warn('WebSocket connection has been closed.');
    }
  }

  function* watchMessages(socket) {
    return eventChannel((emit) => {
      socket.onopen = () => {
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        emit({message});
      };

      socket.onclose = () => {
        emit(END);
      };

      return () => {
        socket.close();
      };
    });
  }

  function* onNavigateTo({payload: routeId}) {
    yield put(push(routeId));
  }

  return saga;
};

export default sagaCreator;
