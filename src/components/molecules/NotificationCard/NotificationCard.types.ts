
export interface NotificationCardProps {
    id: string;
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error' | 'default';
    onClose: (id: string) => void;
    useNeumorphism?: boolean;
  }