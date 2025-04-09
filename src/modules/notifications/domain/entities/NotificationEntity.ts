export type Notification = {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
};