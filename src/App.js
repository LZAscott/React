import React from 'react';
import { Provider } from 'react-redux';
import { GlobalStyle } from './style';
import { GlobalIconfontStyle } from './statics/iconfont/iconfont.js';
import store from './store/index.js';

import Header from './common/header/index';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle/>
      <GlobalIconfontStyle/>
        <Header />
    </Provider>
  );
}

export default App;
