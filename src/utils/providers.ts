import { oauth2, openPopup, pollPopup, OAuthConfig, OAuthResponse } from './helpers';

interface Profile {
    id: string;
    email: string;
    name: string;
    [key: string]: any;
}

interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    [key: string]: any;
}

interface ProfileResponse {
    window: Window;
    interval: number;
    profile: Profile;
}

async function handleCallback(
    { window, interval, profile }: ProfileResponse
): Promise<{ profile: Profile }> {
    // Close the popup window
    if (window && !window.closed) {
        window.close();
    }
    
    // Clear the polling interval
    if (interval) {
        clearInterval(interval);
    }

    return { profile };
}

export async function facebookLogin(facebook: OAuthConfig) {
    try {
        const popup = await oauth2(facebook)
            .then(openPopup)
            .then(pollPopup);

        const profile = await exchangeFacebookCodeForToken(popup);
        return handleCallback(profile);
    } catch (error) {
        console.error('Facebook login error:', error);
        throw error;
    }
}

async function exchangeFacebookCodeForToken(
    { oauthData, config, window, interval }: OAuthResponse
): Promise<ProfileResponse> {
    const data = { ...oauthData, ...config };
    const FB_API_VERSION = 'v18.0';
    const accessTokenUrl = `https://graph.facebook.com/${FB_API_VERSION}/oauth/access_token`;

    const tokenParams = new URLSearchParams({
        code: data.code,
        client_id: data.clientId,
        client_secret: data.clientSecret,
        redirect_uri: data.redirectUri
    });

    const tokenResponse = await fetch(`${accessTokenUrl}?${tokenParams}`)
        .then(res => {
            if (!res.ok) throw new Error(`Token request failed: ${res.statusText}`);
            return res.json();
        }) as TokenResponse;

    if ('error' in tokenResponse) {
        throw new Error(tokenResponse.error as string);
    }

    const graphApiUrl = `https://graph.facebook.com/${FB_API_VERSION}/me`;
    const profileParams = new URLSearchParams({
        fields: data.scope,
        access_token: tokenResponse.access_token
    });

    const profile = await fetch(`${graphApiUrl}?${profileParams}`)
        .then(res => {
            if (!res.ok) throw new Error(`Profile request failed: ${res.statusText}`);
            return res.json();
        }) as Profile;

    if ('error' in profile) {
        throw new Error(profile.error as string);
    }

    return { window, interval, profile };
}

export async function googleLogin(google: OAuthConfig) {
    try {
        const popup = await oauth2(google)
            .then(openPopup)
            .then(pollPopup);

        const profile = await exchangeGoogleCodeForToken(popup);
        return handleCallback(profile);
    } catch (error) {
        console.error('Google login error:', error);
        throw error;
    }
}

async function exchangeGoogleCodeForToken(
    { oauthData, config, window, interval }: OAuthResponse
): Promise<ProfileResponse> {
    const data = { ...oauthData, ...config };
    const accessTokenUrl = 'https://oauth2.googleapis.com/token';
    const userInfoUrl = 'https://openidconnect.googleapis.com/v1/userinfo';

    const tokenResponse = await fetch(accessTokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            code: data.code,
            client_id: data.clientId,
            client_secret: data.clientSecret,
            redirect_uri: data.redirectUri,
            grant_type: 'authorization_code'
        })
    }).then(res => {
        if (!res.ok) throw new Error(`Token request failed: ${res.statusText}`);
        return res.json();
    }) as TokenResponse;

    if ('error' in tokenResponse) {
        throw new Error(tokenResponse.error as string);
    }

    const profile = await fetch(userInfoUrl, {
        headers: {
            'Authorization': `Bearer ${tokenResponse.access_token}`
        }
    }).then(res => {
        if (!res.ok) throw new Error(`Profile request failed: ${res.statusText}`);
        return res.json();
    }) as Profile;

    if ('error' in profile) {
        throw new Error(profile.error as string);
    }

    return { window, interval, profile };
}