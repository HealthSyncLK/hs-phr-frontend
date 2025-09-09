export interface User {
    id: string;
    email: string;
    phone: string;
    name: string;
    avatarUrl?: string;
    roles: ('patient' | 'admin')[];
}
