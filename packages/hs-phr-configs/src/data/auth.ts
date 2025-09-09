// The User Type - This is the API contract for the backend
export interface User {
    id: string;
    email: string;
    phone: string;
    name: string;
    avatarUrl?: string;
    roles: ('patient' | 'admin')[];
    password?: string; // For mock login only
}

// Mock user data for development
export const mockUser: User = {
    id: 'user-001',
    email: 'test@example.com',
    phone: '719247080',
    password: 'admin321', // Add a mock password
    name: 'John Wink',
    roles: ['patient'],
};