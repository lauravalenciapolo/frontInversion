import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { User } from '../../domain/entities/AuthEntity';

// Hook para obtener estado de autenticación
export function useAuth() {
  const queryClient = useQueryClient();
  
  // Inicializar con datos de localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      queryClient.setQueryData(['auth'], user);
    }
  }, [queryClient]);
  
  return {
    user: queryClient.getQueryData<User>(['auth']),
    isAuthenticated: !!queryClient.getQueryData(['auth'])
  };
}
