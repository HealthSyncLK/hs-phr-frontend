'use client';

import React, { createContext, useContext } from 'react';
import useSWR from 'swr';
import { User } from '../app/types/user';
import { authService } from '../app/services/authService';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    error: any;
    isAuthenticated: boolean;
    mutate: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: user, error, isLoading, mutate } = useSWR<User>(
        'user-session', // A stable key for the session
        authService.getCurrentUser,
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        }
    );

    const isAuthenticated = !isLoading && !error && !!user;

    return (
        <AuthContext.Provider value={{ user: user || null, isLoading, error, isAuthenticated, mutate }}>
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