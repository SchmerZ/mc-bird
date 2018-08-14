import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

export default (rootReducer) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = composeWithDevTools(applyMiddleware(sagaMiddleware));

  const store = createStore(rootReducer, middlewares);

  return {store, sagaMiddleware}
}