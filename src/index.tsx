import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { TinaProvider, TinaCMS } from 'tinacms';

const cms = new TinaCMS({
  sidebar: {
    // todo: only show when a admin is logged in
    hidden: false
  }
});

ReactDOM.render(
  <TinaProvider cms={cms}>
    <App />
  </TinaProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
