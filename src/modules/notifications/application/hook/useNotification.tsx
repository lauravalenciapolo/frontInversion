import { useState } from 'react';
import { Notification } from '@modules/notifications/domain/entities/NotificationEntity';

export const useNotification = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (message: string, type: Notification['type']) => {
        const id = Date.now().toString();
        const newNotification: Notification = { id, message, type };
        setNotifications((prev) => [...prev, newNotification]);
        // Automatically remove notification after 10 seconds
        setTimeout(() => removeNotification(id), 10000);
    };

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    return {
        notifications,
        addNotification,
        removeNotification,
    };
};