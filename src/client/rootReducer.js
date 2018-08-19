import {combineReducers} from 'redux'

import appNotification from './notification/reducer'
import quickMessage from './quick-message/reducer'
import messagesList from './messages/reducer'

export default combineReducers({
  appNotification,
  quickMessage,
  messagesList,
});
