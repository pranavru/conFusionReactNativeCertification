import React, { Component } from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import { ConfigureStore } from './redux/configureStore';

import { Loading } from './components/LoadingComponent';

export default class App extends Component {

  render() {

    const { persistor, store } = ConfigureStore();

    return (
      <Provider store={store}>
        <PersistGate
          loading={<Loading />}
          persistor={persistor}
        >
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}