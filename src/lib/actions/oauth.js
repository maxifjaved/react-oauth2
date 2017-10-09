import url from 'url';
import qs from 'querystring';
import request from 'request';

// Sign in with Facebook
export function facebookLogin() {
    const facebook = {
        url: 'http://localhost:3000/',
        clientId: '738536629629890',
        redirectUri: 'http://localhost:3000/',
        authorizationUrl: 'https://www.facebook.com/v2.5/dialog/oauth',
        scope: 'email,user_location',
        width: 580,
        height: 400
    };

    oauth2(facebook)
        .then(openPopup)
        .then(pollPopup)
        .then(exchangeCodeForToken)
        .then(signIn)
        .then(closePopup);
}

function oauth2(config, dispatch) {
    return new Promise((resolve, reject) => {
        const params = {
            client_id: config.clientId,
            redirect_uri: config.redirectUri,
            scope: config.scope,
            display: 'popup',
            response_type: 'code'
        };
        const url = config.authorizationUrl + '?' + qs.stringify(params);
        resolve({ url: url, config: config, dispatch: dispatch });
    });
}

function openPopup({ url, config, dispatch }) {
    return new Promise((resolve, reject) => {
        const width = config.width || 500;
        const height = config.height || 500;
        const options = {
            width: width,
            height: height,
            top: window.screenY + ((window.outerHeight - height) / 2.5),
            left: window.screenX + ((window.outerWidth - width) / 2)
        };
        const popup = window.open(url, '_blank', qs.stringify(options, ','));

        if (url === 'about:blank') {
            popup.document.body.innerHTML = 'Loading...';
        }

        resolve({ window: popup, config: config, dispatch: dispatch });
    });
}

function pollPopup({ window, config, requestToken, dispatch }) {
    return new Promise((resolve, reject) => {
        const redirectUri = url.parse(config.redirectUri);
        const redirectUriPath = redirectUri.host + redirectUri.pathname;

        if (requestToken) {
            window.location = config.authorizationUrl + '?' + qs.stringify(requestToken);
        }

        const polling = setInterval(() => {
            if (!window || window.closed) {
                clearInterval(polling);
            }
            try {
                const popupUrlPath = window.location.host + window.location.pathname;
                if (popupUrlPath === redirectUriPath) {
                    if (window.location.search || window.location.hash) {
                        const query = qs.parse(window.location.search.substring(1).replace(/\/$/, ''));
                        const hash = qs.parse(window.location.hash.substring(1).replace(/[\/$]/, ''));
                        const params = Object.assign({}, query, hash);

                        if (params.error) {
                            dispatch({
                                type: 'OAUTH_FAILURE',
                                messages: [{ msg: params.error }]
                            });
                        } else {
                            resolve({ oauthData: params, config: config, window: window, interval: polling, dispatch: dispatch });
                        }
                    } else {
                        dispatch({
                            type: 'OAUTH_FAILURE',
                            messages: [{ msg: 'OAuth redirect has occurred but no query or hash parameters were found.' }]
                        });
                    }
                }
            } catch (error) {
                // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
                // A hack to get around same-origin security policy errors in Internet Explorer.
            }
        }, 500);
    });
}

function exchangeCodeForToken({ oauthData, config, window, interval }) {
    return new Promise((resolve, reject) => {
        const data = Object.assign({}, oauthData, config);

        var profileFields = ['id', 'name', 'email', 'gender', 'location'];
        var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
        var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + profileFields.join(',');
      
        var params = {
          code: data.code,
          client_id: data.clientId,
          client_secret: 'cd1b9ecdd9e0b4dd6c2da83cd485ed56',
          redirect_uri: data.redirectUri
        };
        // Step 1. Exchange authorization code for access token.
        request.get({ url: accessTokenUrl, qs: params, json: true }, function (err, response, accessToken) {
            if (accessToken.error) {
                reject({ response });
            }
            // Step 2. Retrieve user's profile information.
            request.get({ url: graphApiUrl, qs: accessToken, json: true }, function (err, response, profile) {
                if (profile.error) {
                    reject({ response });
                }
                resolve({ profile, window, interval });
                closePopup({ window: window, interval: interval });

                debugger;
            });
        })
    });
}

function signIn({ token, user, window, interval, dispatch }) {
    return new Promise((resolve, reject) => {
        resolve({ window: window, interval: interval });
    });

}


function closePopup({ window, interval }) {
    return new Promise((resolve, reject) => {
        clearInterval(interval);
        window.close();
        resolve();
    });
}

