import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { clearTokens, getAccessToken, setTokens } from '../utils/secureStore';
import { getStorageItem, removeStorageItem, setStorageItem } from '../utils/storage';

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
}

interface AuthContextType extends AuthState {
    login: (user: User, accessToken: string, refreshToken: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        isLoading: true,
    });

    useEffect(() => {
        const restoreAuth = async () => {
            try {
                const token = await getAccessToken();
                const storedUser = await getStorageItem<User>('user_profile');

                if (token && storedUser) {
                    setState({ user: storedUser, token, isLoading: false });
                } else {
                    setState({ user: null, token: null, isLoading: false });
                }
            } catch (error) {
                setState({ user: null, token: null, isLoading: false });
            }
        };

        restoreAuth();
    }, []);

    const login = async (user: User, accessToken: string, refreshToken: string) => {
        await setTokens(accessToken, refreshToken);
        await setStorageItem('user_profile', user);
        setState({ user, token: accessToken, isLoading: false });
    };

    const logout = async () => {
        await clearTokens();
        await removeStorageItem('user_profile');
        setState({ user: null, token: null, isLoading: false });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
