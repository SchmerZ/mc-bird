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
const {store, sagaMiddleware} = createStore(rootReducer, history);

import Root from './Root'

const AnimatedContainer = styled.div`
  animation: ${fadeIn} .5s linear;
`;

const runSaga = (sagaCreator) => {
  const rootSaga = sagaCreator({services});

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
