"use client"
import { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import config from '../../config';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            try {
                const res = await fetch(`${config.api}/auth/@me`, {
                    credentials: 'include'
                });
                
                if (res.ok) {
                    const userData = await res.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Failed to load user', error);
            } finally {
                setLoading(false);
            }
        }
        loadUser();
    }, []);

    const login = () => {
        window.location.href = `${config.api}/auth/callback`;
    };

    const logout = async () => {
        try {
            const res = await fetch(`${config.api}/auth/logout`, {
                credentials: 'include'
            });
            if (res.ok) {
                setUser(null);
                Router.push('/');
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return {
        user,
        loading,
        login,
        logout
    };
}
