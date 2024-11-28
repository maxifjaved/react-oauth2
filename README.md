# React OAuth2 Social Login

![npm](https://img.shields.io/npm/v/react-oauth2)
![GitHub](https://img.shields.io/github/license/maxifjaved/react-oauth2)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-oauth2)
![npm type definitions](https://img.shields.io/npm/types/react-oauth2)

A modern, lightweight React component library for implementing OAuth2 social login buttons (Google, Facebook) with TypeScript support. Zero dependencies, fully customizable, and built with security in mind.

## Features

- 🚀 Modern React 18+ and TypeScript support
- 🎨 Customizable button designs following provider guidelines
- 🔒 Secure OAuth2 implementation
- 📦 Tiny bundle size (~5KB minified + gzipped)
- 🌐 Support for multiple providers (Google, Facebook)
- 💫 Built-in loading and error states
- ⚡ Zero external dependencies
- 🔥 Popup-based authentication flow
- 📱 Mobile-responsive design

## Installation

```bash
# npm
npm install react-oauth2

# yarn
yarn add react-oauth2

# pnpm
pnpm add react-oauth2
```

## Quick Start

```tsx
import { FacebookOauth2, GoogleOauth2 } from 'react-oauth2';

function App() {
  const handleSuccess = (response) => {
    console.log('Logged in successfully:', response.profile);
  };

  const handleError = (error) => {
    console.error('Login failed:', error);
  };

  return (
    <div>
      <GoogleOauth2
        clientId="your-google-client-id"
        clientSecret="your-google-client-secret"
        redirectUri="http://localhost:3000/auth/google/callback"
        scope={['openid', 'email', 'profile']}
        onSuccess={handleSuccess}
        onError={handleError}
      >
        Continue with Google
      </GoogleOauth2>

      <FacebookOauth2
        clientId="your-facebook-client-id"
        clientSecret="your-facebook-client-secret"
        redirectUri="http://localhost:3000/auth/facebook/callback"
        scope="email,public_profile"
        onSuccess={handleSuccess}
        onError={handleError}
      >
        Continue with Facebook
      </FacebookOauth2>
    </div>
  );
}
```

## OAuth Provider Setup

### Google Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to APIs & Services > Credentials
4. Click "Create Credentials" > "OAuth 2.0 Client ID"
5. Configure your OAuth consent screen
6. Add authorized redirect URIs
7. Copy your Client ID and Client Secret

### Facebook Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or select an existing one
3. Add the Facebook Login product
4. Configure OAuth settings
5. Add your redirect URI
6. Copy your App ID and App Secret

## API Reference

### GoogleButton Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| clientId | string | Yes | Your Google OAuth 2.0 client ID |
| clientSecret | string | Yes | Your Google OAuth 2.0 client secret |
| redirectUri | string | Yes | The URI to redirect to after authentication |
| scope | string[] | No | Array of permission scopes |
| onSuccess | (response: OAuthResponse) => void | Yes | Success callback |
| onError | (error: Error) => void | Yes | Error callback |
| className | string | No | Custom CSS class |
| style | CSSProperties | No | Custom styles |
| children | ReactNode | Yes | Button content |

### FacebookButton Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| clientId | string | Yes | Your Facebook App ID |
| clientSecret | string | Yes | Your Facebook App Secret |
| redirectUri | string | Yes | The URI to redirect to after authentication |
| scope | string | No | Comma-separated permission scopes |
| onSuccess | (response: OAuthResponse) => void | Yes | Success callback |
| onError | (error: Error) => void | Yes | Error callback |
| className | string | No | Custom CSS class |
| style | CSSProperties | No | Custom styles |
| children | ReactNode | Yes | Button content |

## Advanced Usage

### Custom Styling

```tsx
<GoogleButton
  className="custom-google-button"
  style={{
    backgroundColor: '#4285f4',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '4px',
  }}
>
  <GoogleIcon className="custom-icon" />
  Sign in with Google
</GoogleButton>
```

### Environment Variables

```typescript
// .env
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_GOOGLE_CLIENT_SECRET=your-google-client-secret
REACT_APP_FACEBOOK_CLIENT_ID=your-facebook-client-id
REACT_APP_FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
```

### TypeScript Usage

```typescript
import type { OAuthResponse, OAuthError } from 'react-oauth2';

const handleSuccess = (response: OAuthResponse) => {
  const { profile } = response;
  // Handle successful login
};

const handleError = (error: OAuthError) => {
  // Handle error
};
```

## Source Code
The full source code for this package is available on [GitHub](https://github.com/maxifjaved/react-oauth2).

## Security Considerations

- Never expose your client secrets in client-side code
- Use environment variables for sensitive data
- Implement proper CSRF protection
- Validate OAuth responses on your backend
- Use HTTPS for all OAuth endpoints
- Regularly rotate your client secrets

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari (latest)
- Android Chrome (latest)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT © maxifjaved

## Keywords

react, oauth, oauth2, social-login, google-login, facebook-login, react-component, typescript, authentication, social-authentication, google-oauth, facebook-oauth, react18, social-media-login, oauth2-client, react-oauth, social-signin, google-signin, facebook-signin, react-social-login

---

Made with ❤️ by [@maxifjaved](https://maxifjaved.com)