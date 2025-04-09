import React from 'react';
import { Button } from '@components/atoms/Button/Button';
import { ButtonBuilder } from '@/components/atoms/Button/ButtonBuilder';
import { cn } from '@utils/cn';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { NotificationCardProps } from './NotificationCard.types';

const variantStyles: Record<string, Record<string, string>> = {
  info: {
    normal: 'bg-[var(--primary-200)] shadow-lg dark:text-[var(--primary-200)]',
    neumorph: 'bg-[var(--primary-200)] dark:text-[var(--primary-200)]'
  },
  default: {
    normal: 'bg-[var(--info-200)] shadow-lg dark:bg-[var(--info-600)] dark:text-[var(--primary-200)]',
    neumorph: 'bg-[var(--info-200)] dark:bg-[var(--info-600)] dark:text-[var(--primary-200)]'
  },
  success: {
    normal: 'bg-[var(--success-200)] shadow-lg dark:bg-[var(--success-600)] dark:text-[var(--primary-200)]',
    neumorph: 'bg-[var(--success-200)] dark:bg-[var(--success-600)] dark:text-[var(--primary-200)]'
  },
  error: {
    normal: 'bg-[var(--danger-200)] shadow-lg dark:bg-[var(--danger-600)] dark:text-[var(--primary-200)]',
    neumorph: 'bg-[var(--danger-200)] dark:bg-[var(--danger-600)] dark:text-[var(--primary-200)]'
  },
  warning: {
    normal: 'bg-[var(--warning-200)] shadow-lg dark:bg-[var(--warning-600)] dark:text-[var(--primary-200)]',
    neumorph: 'bg-[var(--warning-200)] dark:bg-[var(--warning-600)] dark:text-[var(--primary-200)]'
  }
};

export const NotificationCard: React.FC<NotificationCardProps> = ({
  id,
  message,
  type = 'default',
  onClose,
  useNeumorphism = false
}) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <ExclamationCircleIcon className="h-6 w-6" />;
      case 'success':
        return <CheckCircleIcon className="h-6 w-6" />;
      case 'warning':
      case 'info':
      default:
        return <InformationCircleIcon className="h-6 w-6" />;
    }
  };

  const getButtonVariant = () => {
    switch (type) {
      case 'info':
      case 'warning':
        return 'secondary';
      case 'success':
        return 'success';
      case 'error':
        return 'danger';
      default:
        return 'primary';
    }
  };

  const closeButton = new ButtonBuilder()
    .setVariant(getButtonVariant())
    .setSize('xs')
    .setNeumorph(useNeumorphism)
    .setChildren('×')
    .setOnClick(() => onClose(id))
    .setClassName('font-bold text-xl leading-none hover:opacity-75')
    .build();

  return (
    <div
      className={cn(
        'p-4 rounded-lg transition-all duration-300 ease-in-out transform',
        useNeumorphism
          ? [
              'container-neumorph',
              'hover:shadow-[25px_25px_75px_var(--neumorph-shadow-dark),-25px_-25px_75px_var(--neumorph-shadow-light)]',
              variantStyles[type].neumorph
            ]
          : [
              'shadow-lg hover:shadow-xl',
              variantStyles[type].normal
            ]
      )}
    >
      <div className="flex items-center justify-between space-x-4">
        <span className="flex-1 flex items-center">
          {getIcon()}
          <span className="ml-2">{message}</span>
        </span>
        <div className="flex items-center">
          <Button {...closeButton} />
        </div>
      </div>
    </div>
  );
};
