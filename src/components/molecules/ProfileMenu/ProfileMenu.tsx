import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/atoms/Button/Button';
import { ButtonBuilder } from '@/components/atoms/Button/ButtonBuilder';
import { ProfileMenuProps } from './ProfileMenu.types';

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  name,
  useNeumorphism = false,
  onLogout
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitial = () => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const logoutButton = new ButtonBuilder()
    .setVariant('secondary')
    .setSize('sm')
    .setNeumorph(useNeumorphism)
    .setChildren('Logout')
    .setOnClick(() => {
      setIsOpen(false);
      onLogout();
    })
    .setFullWidth(true)
    .build();

  return (
    <div className="relative z-50" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold',
          useNeumorphism
            ? 'button-neumorph'
            : 'bg-primary-100 hover:bg-primary-200 dark:bg-primary-800 dark:hover:bg-primary-700',
          'text-primary-700 dark:text-primary-200'
        )}
      >
        {getInitial()}
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 z-50',
            useNeumorphism
              ? 'container-neumorph'
              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
          )}
        >
          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
            {name}
          </div>
          <div className="px-2 py-2">
            <Button {...logoutButton} />
          </div>
        </div>
      )}
    </div>
  );
};
