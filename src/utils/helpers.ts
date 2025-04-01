export interface OAuthConfig {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    scope: string;
    authorizationUrl: string;
    width?: number;
    height?: number;
}

interface PopupOptions {
    width: number;
    height: number;
    top: number;
    left: number;
}

export interface OAuthData {
    code: string;

    [key: string]: string;
}

export interface OAuthResponse {
    oauthData: OAuthData;
    config: OAuthConfig;
    window: Window;
    interval: number;
}

/**
 * Initiates the OAuth2 flow by constructing the authorization URL
 */
export function oauth2(config: OAuthConfig): Promise<{ url: string; config: OAuthConfig }> {
    const params = new URLSearchParams({
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        scope: config.scope,
        display: 'popup',
        response_type: 'code'
    });

    // Add provider-specific parameters
    if (config.authorizationUrl.includes('google')) {
        params.append('access_type', 'offline');
        params.append('prompt', 'select_account consent');
    } else if (config.authorizationUrl.includes('facebook')) {
        params.append('auth_type', 'rerequest');
    }

    return Promise.resolve({
        url: `${config.authorizationUrl}?${params.toString()}`,
        config
    });
}

/**
 * Opens a popup window for OAuth authentication
 */
export function openPopup({url, config}: { url: string; config: OAuthConfig }): Promise<{
    window: Window;
    config: OAuthConfig
}> {
    return new Promise((resolve) => {
        const width = config.width || 500;
        const height = config.height || 500;

        const options: PopupOptions = {
            width,
            height,
            top: window.screenY + ((window.outerHeight - height) / 2.5),
            left: window.screenX + ((window.outerWidth - width) / 2)
        };

        const optionsString = Object.entries(options)
            .map(([key, value]) => `${key}=${value}`)
            .join(',');

        const popup = window.open(url, '_blank', optionsString);

        if (popup && url === 'about:blank') {
            popup.document.body.innerHTML = 'Loading...';
        }

        resolve({window: popup!, config});
    });
}

/**
 * Polls the popup window for OAuth completion
 */
export function pollPopup({
                              window: popupWindow,
                              config,
                              requestToken
                          }: {
    window: Window;
    config: OAuthConfig;
    requestToken?: Record<string, string>;
}): Promise<OAuthResponse> {
    return new Promise((resolve, reject) => {
        if (requestToken) {
            const params = new URLSearchParams(requestToken);
            popupWindow.location.href = `${config.authorizationUrl}?${params.toString()}`;
        }

        const polling = setInterval(() => {
            if (!popupWindow || popupWindow.closed) {
                clearInterval(polling);
                reject(new Error('Popup window was closed'));
                return;
            }

            try {
                // Check if we're on the redirect URL
                const currentUrl = popupWindow.location.href;
                const isRedirectUrl = currentUrl.startsWith(config.redirectUri);

                if (isRedirectUrl) {
                    const searchParams = new URLSearchParams(
                        popupWindow.location.search.substring(1).replace(/\/$/, '')
                    );
                    const hashParams = new URLSearchParams(
                        popupWindow.location.hash.substring(1).replace(/[\/$]/, '')
                    );

                    const params: Record<string, string> = {};

                    [searchParams, hashParams].forEach(paramSet => {
                        paramSet.forEach((value, key) => {
                            params[key] = value;
                        });
                    });

                    if (params.error) {
                        clearInterval(polling);
                        reject({error: params.error});
                        return;
                    }

                    if (Object.keys(params).length === 0) {
                        clearInterval(polling);
                        reject({
                            error: 'OAuth redirect has occurred but no query or hash parameters were found.'
                        });
                        return;
                    }

                    clearInterval(polling);
                    resolve({
                        oauthData: params as OAuthData,
                        config,
                        window: popupWindow,
                        // @ts-expect-error
                        interval: polling
                    });
                }
            } catch (error) {
                // Ignore cross-origin frame access errors
            }
        }, 500);
    });
}