import React from 'react';
import {facebookLogin} from './utils/providers';

interface FacebookButtonProps {
    url?: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    authorizationUrl?: string;
    scope?: string;
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    children: React.ReactNode;
    callback: (error: Error | null, result: any | null) => void;
}

const BUTTON_PROPS = ['style', 'className', 'disabled'] as const;

export const FacebookOauth2: React.FC<FacebookButtonProps> = ({
                                                                  url = 'http://localhost:3000/',
                                                                  clientId,
                                                                  clientSecret,
                                                                  redirectUri = 'http://localhost:3000/',
                                                                  authorizationUrl = 'https://www.facebook.com/v18.0/dialog/oauth',
                                                                  scope = 'email,public_profile',
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
        const buttonProps: Partial<Pick<FacebookButtonProps, typeof BUTTON_PROPS[number]>> = {};

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
                scope,
                width,
                height,
            };

            const result = await facebookLogin(config);
            callback(null, result);
        } catch (error) {
            callback(error instanceof Error ? error : new Error('Facebook login failed'), null);
        }
    };

    return (
        <button
            type="button"
            {...getButtonAttributes()}
            className={`facebook-oauth-button ${className || ''}`}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 500,
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#1877f2',
                color: 'white',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.7 : 1,
                transition: 'background-color 0.2s ease',
                ...style,
            }}
            onClick={handleClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};