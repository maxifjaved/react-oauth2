import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import './Facebook.scss';
import { facebookLogin } from '../../actions/oauth';


let Facebook = createReactClass({
    getDefaultProps: function () {
        return {
            name: 'Mary'
        };
    },

    getInitialState: function () {
        return { count: 1 }
    },

    handleClick: function(){

    },

    render: function () {
        return <button onClick={this.handleClick}>Sign in with Facebook</button>;
    }
})

Facebook.propTypes = {
    url: PropTypes.string.isRequired,
    redirectUri: PropTypes.string.isRequired,
    clientId: PropTypes.string.isRequired,
    clientSecret: PropTypes.string.isRequired,
    scope: PropTypes.string.isRequired,

  };

export default Facebook;
