import request from 'request';

import { oauth2, openPopup, pollPopup } from '../utils/helper';

// Sign in with Facebook
export function facebookLogin(facebook: any) {
  return oauth2(facebook)
    .then(openPopup)
    .then(pollPopup)
    .then(exchangeFacebookCodeForToken)
    .then(signIn)
    .then(closePopup);
}

function exchangeFacebookCodeForToken({
  oauthData,
  config,
  window,
  interval,
}: any) {
  return new Promise((resolve, reject) => {
    const data = Object.assign({}, oauthData, config);

    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + data.scope;

    var params = {
      code: data.code,
      client_id: data.clientId,
      client_secret: data.clientSecret,
      redirect_uri: data.redirectUri,
    };
    // Step 1. Exchange authorization code for access token.
    request.get({ url: accessTokenUrl, qs: params, json: true }, function(
      err: any,
      response: any,
      accessToken: any
    ) {
      if (accessToken.error) {
        reject({ response, err });
      }
      // Step 2. Retrieve user's profile information.
      request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(
        err: any,
        response: any,
        profile: any
      ) {
        if (profile.error) {
          reject({ response, err });
        }
        resolve({ window: window, interval: interval, profile: profile });
      });
    });
  });
}

// Sign in with Google
export function googleLogin(google: any) {
  return oauth2(google)
    .then(openPopup)
    .then(pollPopup)
    .then(exchangeCodeForToken)
    .then(signIn)
    .then(closePopup);
}

function exchangeCodeForToken({
  oauthData,
  config,
  window,
  interval,
}: // dispatch,
any) {
  return new Promise((resolve, reject) => {
    const data = Object.assign({}, oauthData, config);

    var accessTokenUrl = 'https://www.googleapis.com/oauth2/v3/token';
    var peopleApiUrl =
      'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

    var params = {
      code: data.code,
      client_id: data.clientId,
      client_secret: data.clientSecret,
      redirect_uri: data.redirectUri,
      grant_type: 'authorization_code',
    };

    // Step 1. Exchange authorization code for access token.
    request.post({ url: accessTokenUrl, form: params, json: true }, function(
      err: any,
      response: any,
      token: any
    ) {
      if (!token) {
        reject({ response, err });
      }

      var accessToken = token.access_token;
      var headers = { Authorization: 'Bearer ' + accessToken };

      // Step 2. Retrieve user's profile information.
      request.get({ url: peopleApiUrl, headers: headers, json: true }, function(
        err: any,
        response: any,
        profile: any
      ) {
        if (profile.error) {
          reject({ response, err });
        }

        resolve({ window: window, interval: interval, profile: profile });
      });
    });
  });
}

function signIn({ token, user, window, interval, profile }: any) {
  console.log('👍👍👍', token, user);
  return new Promise(resolve => {
    resolve({ window: window, interval: interval, profile });
  });
}

function closePopup({ window, interval, profile }: any) {
  return new Promise(resolve => {
    clearInterval(interval);
    window.close();
    resolve({ profile: profile });
  });
}
