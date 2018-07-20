import React from 'react';
import createReactClass from 'create-react-class';
import Facebook from '../lib';

let FacebookComponent = createReactClass({
  getInitialState: function () {
    return {
      "data": {
        "id": "", "name": "", "email": "", "gender": "", "location": { "id": "", "name": "" }
      }
    };
  },

  facebook: function (err, res) {
    if (!err) {
      this.setState({ data: res.profile })
    } else {
      this.setState({ data: 'something happen wrong' })
    }
  },

  render: function () {
    return <div>
      <Facebook url={'http://localhost:3000/'}
        clientId={''}
        clientSecret={''}
        redirectUri={'http://localhost:3000/'}
        authorizationUrl={'https://www.facebook.com/v2.5/dialog/oauth'}
        scope={'email,user_location'}
        width={300}
        height={300}
        callback={this.facebook}
        style={{ color: 'green' }}
      >
        Login With Facebook From component
  </Facebook>
      <hr />
      {JSON.stringify(this.state)}
    </div>
  }
});

export default FacebookComponent;
