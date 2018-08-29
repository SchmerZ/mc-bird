import {eventChannel, END, delay} from 'redux-saga'
import {call, put, take, takeLatest} from 'redux-saga/effects'
import {push} from 'connected-react-router'

import * as A from './actions'
import * as messagesActions from '../messages/actions'

const sagaCreator = (location) => {
  function* saga() {
    yield takeLatest(A.navigateTo, onNavigateTo);

    yield initializeWebSocketsChannel();
  }

  function* initializeWebSocketsChannel() {
    const socket = new WebSocket(`ws://${location.host}`);
    const channel = yield call(watchMessages, socket);

    while (true) {
      const {message} = yield take(channel);

      if (message.type === 'accept') {
        window.headers = {
          [message.name]: message.value
        };
      }
      else if (message.type === 'disconnect') {
        //todo: reconnect
      }
      else {
        yield put(messagesActions.incomeMessage({message}));
        yield put(A.notify({message: 'You have received a new message.'}));
      }
    }
  }

  function* watchMessages(socket) {
    return eventChannel((emit) => {
      socket.onopen = () => {
        //socket.send('Connection estabished'); // Send data to server
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        emit({message});
      };

      socket.onclose = () => {
        emit({message: {type: 'disconnect'}});
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
