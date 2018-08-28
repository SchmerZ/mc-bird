import {all} from 'redux-saga/effects'

import applicationSaga from './application/saga'
import quickMessageSaga from './quick-message/saga'
import messagesListSaga from './messages/saga'

export default ({services, location}) => {
  return function* rootSaga() {
    yield all([
      applicationSaga(location)(),
      quickMessageSaga({services})(),
      messagesListSaga({services})(),
    ])
  }
}
