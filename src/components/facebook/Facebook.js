import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import keys from 'object-keys';
import './Facebook.scss';
import { facebookLogin } from '../../actions/oauth';


let Facebook = createReactClass({
    getDefaultProps: function () {
        return {
            url: 'http://localhost:3000/',
            clientId: '',
            clientSecret: '',
            redirectUri: 'http://localhost:3000/',
            authorizationUrl: 'https://www.facebook.com/v2.5/dialog/oauth',
            scope: 'id,name,gender,email,location',
            width: 580,
            height: 400
        };
    },

    getAttributesForButton: function () {
        return keys(this.props).reduce((acc, prop) => {
            if (['style', 'className', 'disabled'].some(wantedProp => wantedProp === prop)) {
                acc[prop] = this.props[prop];
            }
            return acc;
        }, {});
    },

    handleClick: function () {
        facebookLogin(this.props).then(res => {
            this.props.callback(null, res);
        }, error => {
            this.props.callback(error, null);
        });
    },

    render: function () {
        const buttonAttrs = this.getAttributesForButton();
        return <button {...buttonAttrs} onClick={this.handleClick} >{this.props.children} </button>
    }
})

Facebook.propTypes = {
    url: PropTypes.string.isRequired,
    redirectUri: PropTypes.string.isRequired,
    clientId: PropTypes.string.isRequired,
    clientSecret: PropTypes.string.isRequired,
    scope: PropTypes.string,
    callback: PropTypes.func.isRequired
};

export default Facebook;
