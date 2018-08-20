import {select, call, put, takeLatest} from 'redux-saga/effects'

import * as applicationActions from '../application/actions'
import * as A from './actions'

import variant from '../constants/snackbar-variant'

const sagaCreator = ({services: {messagesService}}) => {
    const {fetchMessages} = messagesService;

    function* saga() {
      yield takeLatest(A.init, onInitSaga);
      yield takeLatest(A.fetch, onFetchMessagesSaga);
    }

    function* onInitSaga() {
      yield put(A.fetch());
    }

    function* onFetchMessagesSaga() {
      yield put(A.fetch.request());

      try {
        const {items, totalCount, offset} = yield call(fetchMessages);

        yield put(A.fetch.success({items, totalCount, offset}));
      }
      catch (error) {
        const {message} = error;

        yield put(A.fetch.failure({message}));
        yield put(applicationActions.notify({message, type: variant.error}));
      }
      finally {
        yield put(A.fetch.fulfill());
      }
    }

    return saga;
  }
;

export default sagaCreator;
