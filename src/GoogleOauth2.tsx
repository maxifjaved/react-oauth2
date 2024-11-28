import React from 'react';
import {googleLogin} from './utils/providers';

interface GoogleButtonProps {
    url?: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    authorizationUrl?: string;
    scope?: string[];
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    children: React.ReactNode;
    callback: (error: Error | null, result: any | null) => void;
}

const BUTTON_PROPS = ['style', 'className', 'disabled'] as const;

const DEFAULT_SCOPES = [
    'openid',
    'email',
    'profile'
];

export const GoogleOauth2: React.FC<GoogleButtonProps> = ({
                                                              url = 'http://localhost:3000/',
                                                              clientId,
                                                              clientSecret,
                                                              redirectUri = 'http://localhost:3000/',
                                                              authorizationUrl = 'https://accounts.google.com/o/oauth2/v2/auth',
                                                              scope = DEFAULT_SCOPES,
                                                              width = 580,
                                                              height = 400,
                                                              className,
                                                              style,
                                                              disabled,
                                                              children,
                                                              callback,
                                                              ...props
                                                          }) => {
    const getButtonAttributes = () => {
        const buttonProps: Partial<Pick<GoogleButtonProps, typeof BUTTON_PROPS[number]>> = {};

        BUTTON_PROPS.forEach(prop => {
            // @ts-expect-error
            const value = props[prop];
            if (value !== undefined) {
                buttonProps[prop] = value;
            }
        });

        return buttonProps;
    };

    const handleClick = async () => {
        try {
            const config = {
                url,
                clientId,
                clientSecret,
                redirectUri,
                authorizationUrl,
                scope: Array.isArray(scope) ? scope.join(' ') : scope,
                width,
                height,
            };

            const result = await googleLogin(config);
            callback(null, result);
        } catch (error) {
            callback(error instanceof Error ? error : new Error('Google login failed'), null);
        }
    };

    return (
        <button
            type="button"
            {...getButtonAttributes()}
            className={`google-oauth-button ${className || ''}`}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 500,
                border: '1px solid #dadce0',
                borderRadius: '4px',
                backgroundColor: 'white',
                color: '#3c4043',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.7 : 1,
                transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                ...style,
            }}
            onClick={handleClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};