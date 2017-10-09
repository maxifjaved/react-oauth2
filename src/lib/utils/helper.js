import qs from 'querystring';
import url from 'url';

export function oauth2(config) {
    return new Promise((resolve, reject) => {
        const params = {
            client_id: config.clientId,
            redirect_uri: config.redirectUri,
            scope: config.scope,
            display: 'popup',
            response_type: 'code'
        };
        const url = config.authorizationUrl + '?' + qs.stringify(params);
        resolve({ url: url, config: config });
    });
}

export function openPopup({ url, config }) {
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

        resolve({ window: popup, config: config });
    });
}

export function pollPopup({ window, config, requestToken }) {
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
                        // eslint-disable-next-line
                        const hash = qs.parse(window.location.hash.substring(1).replace(/[\/$]/, ''));
                        const params = Object.assign({}, query, hash);

                        if (params.error) {
                            reject({ error: params.error })

                        } else {
                            resolve({ oauthData: params, config: config, window: window, interval: polling });
                        }
                    } else {
                        reject({ error: 'OAuth redirect has occurred but no query or hash parameters were found.' });
                    }
                }
            } catch (error) {
                // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
                // A hack to get around same-origin security policy errors in Internet Explorer.
            }
        }, 500);
    });
}