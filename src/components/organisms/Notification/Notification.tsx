import React from 'react';
import { NotificationProps } from './Noification.type';
import { NotificationCard } from '@components/molecules/NotificationCard/NotificationCard';
import { cn } from '@utils/cn';

const NotificationComponent: React.FC<NotificationProps> = ({ notifications, removeNotification, useNeumorphism = false }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col space-y-4 z-50 p-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={cn(
            'transform transition-all duration-300 ease-in-out translate-y-full opacity-0',
            { 'opacity-100 translate-y-0': notification }
          )}
        >
          <NotificationCard
            id={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={removeNotification}
            useNeumorphism={useNeumorphism}
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationComponent;
