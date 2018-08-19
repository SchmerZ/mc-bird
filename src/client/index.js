import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import styled from 'styled-components'

import createBrowserHistory from 'history/createBrowserHistory'
import createStore from './utils/createStore'
import rootReducer from './rootReducer'
import sagaCreator from './rootSaga'

import services from './api'

import {fadeIn} from './styles/animations';

const history = createBrowserHistory();
const {store, sagaMiddleware} = createStore(rootReducer);

import Root from './Root'

const AnimatedContainer = styled.div`
  animation: ${fadeIn} .5s linear;
`;

const runSaga = (sagaCreator) => {
  const queryParams = new URLSearchParams(window.location.search);
  const rootSaga = sagaCreator({queryParams, services});

  return sagaMiddleware.run(rootSaga);
};

let sagaTask = runSaga(sagaCreator);

const renderApp = (App) => {
  ReactDOM.render(
    <Provider store={store}>
      <AnimatedContainer>
        <App history={history}/>
      </AnimatedContainer>
    </Provider>,
    document.getElementById('app')
  );
};

renderApp(Root);

if (module.hot) {
  module.hot.accept(['./Root'], () => {
    const nextApp = require('./Root').default;
    renderApp(nextApp);
  });

  module.hot.accept(['./rootReducer'], () => {
    const nextReducer = require('./rootReducer').default;
    store.replaceReducer(nextReducer);
  });

  module.hot.accept(['./rootSaga'], () => {
    const nextSagaCreator = require('./rootSaga').default;
    sagaTask.cancel();
    sagaTask.done.then(() => {
      sagaTask = runSaga(nextSagaCreator);
    });
  });
}

//// if user is running mozilla then use it's built-in WebSocket
//window.WebSocket = window.WebSocket || window.MozWebSocket;

// var connection = new WebSocket('ws://localhost:8090');
//
// connection.onopen = function () {
//   // connection is opened and ready to use
// };
//
// connection.onerror = function (error) {
//   // an error occurred when sending/receiving data
// };
//
// connection.onmessage = function (message) {
//   // try to decode json (I assume that each message
//   // from server is json)
//   try {
//     var json = JSON.parse(message.data);
//   } catch (e) {
//     console.log('This doesn\'t look like a valid JSON: ',
//       message.data);
//     return;
//   }
//   // handle incoming message
// };
