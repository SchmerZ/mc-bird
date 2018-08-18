import {combineReducers} from 'redux'

import appNotification from './notification/reducer'
import quickMessage from './quick-message/reducer'

export default combineReducers({
  appNotification,
  quickMessage,
});
