import {select, call, put, takeLatest} from 'redux-saga/effects'

import * as notificationActions from '../notification/actions'
import * as A from './actions'

const sagaCreator = ({services: {messagesService}}) => {
    const {fetchMessages} = messagesService;

    function* saga() {
      yield takeLatest(A.fetch, onFetchMessagesSaga);
    }

    function* onFetchMessagesSaga() {
      yield put(A.fetch.request());

      try {
        const messages = yield call(fetchMessages);

        yield put(A.fetch.success());
      }
      catch (error) {
        const {message} = error;

        yield put(A.fetch.failure({message}));
        //yield put(notificationActions.notify({message, type: variant.error}));
      }
      finally {
        yield put(A.fetch.fulfill());
      }
    }

    return saga;
  }
;

export default sagaCreator;
