import {all} from 'redux-saga/effects'

import quickMessageSaga from './quick-message/saga'
import messagesListSaga from './messages/saga'

export default ({queryParams, services}) => {
  return function* rootSaga() {
    yield all([
      quickMessageSaga({services})(),
      messagesListSaga({services})(),
    ])
  }
}
