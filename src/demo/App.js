import React from 'react';
import createReactClass from 'create-react-class';
import Google from './Google'
import Facebook from './Facebook'

let App = createReactClass({
  render: function () {
    return <div>
      <Facebook />
      <Google />
    </div>
  }
});

export default App;
