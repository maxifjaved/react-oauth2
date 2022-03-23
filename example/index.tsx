import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Google from './Google'
import Facebook from './Facebook'


const App = () => {
  return (
    <div>
      <Facebook />
      <Google />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
