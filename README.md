# React Social Login

## Install
```
npm install react-oauth2
```

## Facebook

### How to use
```
import React from 'react';
import createReactClass from 'create-react-class';
import Facebook from 'react-oauth2';

let App = createReactClass({
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
```

## Parameters

|    params    |   value  |             default value            |   description    |
|:------------:|:--------:|:------------------------------------:|:----------------:|
|    clientId  |  string  |               REQUIRED               |                  |
| clientSecret |  string  |               REQUIRED               |                  |
|     scope    |  string  |             name, id, location, email            |                  |
|   redirectUri | string  | http://localhost:3000 | |
| url | string|http://localhost:3000 | |
| width | number | 300 | width of the window that open for authentication |
|height | number | 300 | width of the window that open for authentication |
| style | object | React Style Object | |
|className | string | null
| disabled | boolean | null

## Google

### How to use
```
import React from 'react';
import createReactClass from 'create-react-class';
import { Google } from 'react-oauth2';

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
        clientId={''}
        clientSecret={''}
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
```

## Parameters

|    params    |   value  |             default value            |   description    |
|:------------:|:--------:|:------------------------------------:|:----------------:|
|    clientId  |  string  |               REQUIRED               |                  |
| clientSecret |  string  |               REQUIRED               |                  |
|     scope    |  array   |               REQUIRED               |                  |
|   redirectUri | string  | http://localhost:3000 | |
| url | string|http://localhost:3000 | |
| width | number | 300 | width of the window that open for authentication |
|height | number | 300 | width of the window that open for authentication |
| style | object | React Style Object | |
|className | string | null
| disabled | boolean | null


## Twitter
