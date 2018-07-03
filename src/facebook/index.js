import React from 'react';
import PropTypes from 'prop-types';
import keys from 'object-keys';
import { facebookLogin } from '../actions/oauth2';

class Facebook extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        facebookLogin(this.props).then(res => {
            this.props.callback(null, res);
        }, error => {
            this.props.callback(error, null);
        });
    }


    render() {
        const opts = keys(this.props).reduce((acc, prop) => {
            if (['style', 'className'].some(wantedProp => wantedProp === prop)) {
                acc[prop] = this.props[prop];
            }
            return acc;
        }, {});
        return <button {...opts} onClick={this.handleClick.bind(this)} >{this.props.children} </button>
    }
}

Facebook.propTypes = {
    url: PropTypes.string.isRequired,
    redirectUri: PropTypes.string.isRequired,
    clientId: PropTypes.string.isRequired,
    clientSecret: PropTypes.string.isRequired,
    scope: PropTypes.string,
    callback: PropTypes.func.isRequired
};

Facebook.defaultProps = {
    url: 'http://localhost:3000/',
    redirectUri: 'http://localhost:3000/',
    clientId: '',
    clientSecret: '',
    scope: 'id,name,gender,email,location',
    authorizationUrl: 'https://www.facebook.com/v2.5/dialog/oauth',
    width: 580,
    height: 400
}

export default Facebook