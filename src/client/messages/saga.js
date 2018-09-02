import {select, call, put, takeLatest, fork, take, race} from 'redux-saga/effects'
import {push, LOCATION_CHANGE} from 'connected-react-router'
import {matchPath} from 'react-router'

import * as applicationActions from '../application/actions'
import * as A from './actions'

import variant from '../constants/snackbar-variant'
import routesIds from '../constants/navigation-routes'

const sagaCreator = ({services: {messagesService}}) => {
  const {fetchMessages} = messagesService;

  function* saga() {
    yield takeLatest(A.init, onInit);

    yield takeLatest(A.fetch, onFetchMessages);
    yield takeLatest([A.prevPage, A.nextPage], onPageChange);

    yield takeLatest(LOCATION_CHANGE, onLocationChange);
  }

  function* onInit() {
    yield fork(watchNewMessages);
  }

  function* onLocationChange({payload}) {
    const {location: {pathname, search}} = payload;

    if (matchPath(pathname, {path: routesIds.messages, exact: true})) {
      const searchParams = new URLSearchParams(search);
      const offset = Number(searchParams.get('offset')) || 0;

      yield put(A.fetch({offset}));
    }
  }

  function* onPageChange() {
    const {fetchingOffset} = yield select(state => state.messagesList);
    const nextLocation = `${routesIds.messages}?offset=${fetchingOffset}`;

    yield put(push(nextLocation));
  }

  function* onFetchMessages() {
    yield put(A.fetch.request());

    const {fetchingOffset, limit} = yield select(state => state.messagesList);

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
