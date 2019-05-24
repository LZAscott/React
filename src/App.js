import React from 'react';
import { Provider } from 'react-redux';
import { GlobalStyle } from './style';
import { GlobalIconfontStyle } from './statics/iconfont/iconfont.js';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store/index.js';
import Header from './common/header/index';
import Home from './pages/home/index.js';
import Detail from './pages/detail/loadable';
import Login from './pages/login';
import Write from './pages/write';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <GlobalIconfontStyle />

      <BrowserRouter>
        <Header />
        <Route path='/' exact component={Home}></Route>
        <Route path='/detail/:id' exact component={Detail}></Route>
        <Route path='/login' exact component={Login}></Route>
        <Route path='/write' exact component={Write}></Route>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
