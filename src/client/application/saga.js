import {put, takeLatest} from 'redux-saga/effects'
import {push} from 'connected-react-router'

import * as A from './actions'

const sagaCreator = () => {
  function* saga() {
    yield takeLatest(A.navigateTo, onNavigateToSaga);
  }

  function* onNavigateToSaga({payload}) {
    const {pathname} = payload;

    yield put(push(pathname));
  }

  return saga;
};

export default sagaCreator;
