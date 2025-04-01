import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOauth2 } from '../src/GoogleOauth2';
import { FacebookOauth2 } from '../src/FacebookOauth2';

const App = () => {
  const handleGoogleCallback = (error: Error | null, result: any) => {
    if (error) {
      console.error('Google login error:', error);
      return;
    }
    console.log('Google login success:', result);
    debugger;
  };

  const handleFacebookCallback = (error: Error | null, result: any) => {
    if (error) {
      console.error('Facebook login error:', error);
      return;
    }
    console.log('Facebook login success:', result);
    debugger;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
      }}
    >
      <h1 style={{ marginBottom: '2rem', color: '#333' }}>OAuth2 Login Test</h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <GoogleOauth2
          clientId="575268215328-e3kffueqpfhho3m57b4quq8dbe907g7r.apps.googleusercontent.com"
          clientSecret="fW2w15epMMo5IqMTqdJGENMK"
          redirectUri="http://localhost:5173"
          callback={handleGoogleCallback}
        >
          Sign in with Google
        </GoogleOauth2>

        <FacebookOauth2
          clientId="468806966881566"
          clientSecret="b2226e287fca3fa4259161630666002a"
          redirectUri="http://localhost:5173"
          callback={handleFacebookCallback}
        >
          Sign in with Facebook
        </FacebookOauth2>
      </div>

      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#e8f5e9',
          borderRadius: '4px',
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0, color: '#2e7d32' }}>
          Check the browser console for login results
        </p>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
