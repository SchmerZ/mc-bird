import {applyMiddleware, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {composeWithDevTools} from 'redux-devtools-extension'

export default (rootReducer, history) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware)
  );

  const reducer = connectRouter(history)(rootReducer);
  const store = createStore(reducer, middlewares);

  return {store, sagaMiddleware}
}
