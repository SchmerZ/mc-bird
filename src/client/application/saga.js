import {put, takeLatest} from 'redux-saga/effects'
import {push} from 'connected-react-router'

import * as A from './actions'

const sagaCreator = () => {
  function* saga() {
    yield takeLatest(A.navigateTo, onNavigateToSaga);
  }

  function* onNavigateToSaga({payload: routeId}) {
    yield put(push(routeId));
  }

  return saga;
};

export default sagaCreator;
