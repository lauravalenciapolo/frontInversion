export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

export interface NotificationProps {
  useNeumorphism?: boolean;
  notifications: Notification[];
  removeNotification: (id: string) => void;
}
