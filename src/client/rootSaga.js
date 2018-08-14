import {all} from 'redux-saga/effects'

import quickMessageSaga from './quick-message/saga'

export default ({queryParams, services}) => {
  return function* rootSaga() {
    yield all([
      quickMessageSaga({services})(),
    ])
  }
}