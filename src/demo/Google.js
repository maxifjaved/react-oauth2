import React from 'react';
import createReactClass from 'create-react-class';
import { Google } from '../lib';

let GoogleComponent = createReactClass({
  getInitialState: function () {
    return {
      "data": {
        "id": "", "name": "", "email": "", "gender": "", "location": { "id": "", "name": "" }
      }
    };
  },

  google: function (err, res) {
    if (!err) {
      this.setState({ data: res.profile })
    } else {
      this.setState({ data: 'something happen wrong' })
    }
  },

  render: function () {
    return <div>
      <Google
        url={'http://localhost:3000'}
        clientId={'575268215328-e3kffueqpfhho3m57b4quq8dbe907g7r.apps.googleusercontent.com'}
        clientSecret={'fW2w15epMMo5IqMTqdJGENMK'}
        redirectUri={'http://localhost:3000'}
        scope={['https://www.googleapis.com/auth/userinfo.email']}
        width={300}
        height={300}
        callback={this.google}
        style={{ color: 'green' }}
      >
        Login With Google From component
  </Google>
      <hr />
      {JSON.stringify(this.state)}
    </div>
  }
});

export default GoogleComponent;
