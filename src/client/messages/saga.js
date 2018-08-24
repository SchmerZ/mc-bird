import {select, call, put, takeLatest, takeEvery} from 'redux-saga/effects'
import {push} from 'connected-react-router'

import * as applicationActions from '../application/actions'
import * as A from './actions'

import variant from '../constants/snackbar-variant'
import routesIds from '../constants/navigation-routes'

const sagaCreator = ({services: {messagesService}}) => {
  const {fetchMessages} = messagesService;

  function* saga() {
    yield takeLatest(A.init, onInitSaga);
    yield takeLatest(A.fetch, onFetchMessagesSaga);

    yield takeLatest([A.prevPage, A.nextPage], onFetchMessagesSaga);
    yield takeEvery(A.incomeMessage, onIncomeMessageSaga);
  }

  function* onInitSaga() {
    const {location: {search}} = yield select(state => state.router);
    const searchParams = new URLSearchParams(search);
    const offset = Number(searchParams.get('offset'));

    yield put(A.fetch({offset}));
  }

  function* onFetchMessagesSaga() {
    yield put(A.fetch.request());

    const {fetchingOffset, limit} = yield select(state => state.messagesList);
    yield put(push(`/messages?offset=${fetchingOffset}`));

    try {
      const {items, totalCount, offset} = yield call(
        fetchMessages,
        {offset: fetchingOffset, limit}
      );

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

  function* onIncomeMessageSaga({payload}) {
    const {location: {pathname}} = yield select(state => state.router);
    const {offset} = yield select(state => state.messagesList);
    const {message} = payload;

    if (offset === 0 && pathname === routesIds.messages) {
      yield put(A.messageAdd({message}));
    }
  }

  return saga;
};

export default sagaCreator;
