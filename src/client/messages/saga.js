import {select, call, put, takeLatest, fork, take, race} from 'redux-saga/effects'
import {push} from 'connected-react-router'

import * as applicationActions from '../application/actions'
import * as A from './actions'

import variant from '../constants/snackbar-variant'
import routesIds from '../constants/navigation-routes'

const sagaCreator = ({services: {messagesService}}) => {
  const {fetchMessages} = messagesService;

  function* saga() {
    yield takeLatest(A.init, onInit);
    yield takeLatest([A.fetch, A.prevPage, A.nextPage], onFetchMessages);
  }

  function* onInit() {
    yield fork(watchNewMessages);

    const {location: {search}} = yield select(state => state.router);
    const searchParams = new URLSearchParams(search);
    const offset = Number(searchParams.get('offset'));

    yield put(A.fetch({offset}));
  }

  function* onFetchMessages() {
    yield put(A.fetch.request());

    const {fetchingOffset, limit} = yield select(state => state.messagesList);
    yield put(push(`${routesIds.messages}?offset=${fetchingOffset}`));

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

  function* watchNewMessages() {
    while (true) {
      const [task, cancel] = yield race([
        take(A.incomeMessage),
        take(A.leave)
      ]);

      if (cancel) return;

      if (task) {
        yield call(onIncomeMessage, task);
      }
    }
  }

  function* onIncomeMessage({payload}) {
    const {offset} = yield select(state => state.messagesList);
    const {message} = payload;

    if (offset === 0) {
      yield put(A.messageAdd({message}));
    }
  }

  return saga;
};

export default sagaCreator;
