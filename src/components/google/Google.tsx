import React from 'react';
import createReactClass from 'create-react-class';
import keys from 'object-keys';
import { googleLogin } from '../../actions/oauth';

let Google = createReactClass({
  getDefaultProps: function() {
    return {
      url: 'http://localhost:3000/',
      clientId: '',
      clientSecret: '',
      redirectUri: 'http://localhost:3000/',
      authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
      scope: [''],
      width: 580,
      height: 400,
    };
  },

  getAttributesForButton: function() {
    return keys(this.props).reduce((acc: any, prop: any) => {
      if (
        ['style', 'className', 'disabled'].some(
          wantedProp => wantedProp === prop
        )
      ) {
        acc[prop] = this.props[prop];
      }
      return acc;
    }, {});
  },

  handleClick: function() {
    googleLogin(this.props).then(
      res => {
        this.props.callback(null, res);
      },
      error => {
        this.props.callback(error, null);
      }
    );
  },

  render: function() {
    const buttonAttrs = this.getAttributesForButton();
    return (
      <button {...buttonAttrs} onClick={this.handleClick}>
        {this.props.children}{' '}
      </button>
    );
  },
});

export default Google;
