import React from "react";
import { Navigate, } from "react-router-dom";
import { FeatureFlags } from "@/core/config/featureFlags";
import { useModuleFeatures } from "@/hooks/useModuleFeatures";

// Función para verificar si el usuario está autenticado
const isAuthenticated = (): boolean => {
  const user = localStorage.getItem("user"); 
  const token = user ? JSON.parse(user).token : null;
  return !!token; 
};

interface ProtectedRouteProps {
  element: React.ReactNode;
  flag: FeatureFlags;
  permissions?: string[];
}

const permissionsGuard = (permissions: string[]): boolean => {
  // Aquí puedes implementar lógica real para verificar permisos
  return true; // Simula que el usuario tiene permisos
};

/**
 * Protege rutas requeridas por autenticación
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  element, 
  flag, 
  permissions 
}) => {
  const { hasFeature } = useModuleFeatures();

  // Verificar autenticación
  if (!isAuthenticated()) {
    console.log("No autenticado, redirigiendo a inicio de sesión");
    return <Navigate to="/auth/login" replace />; // Redirigir a la página de inicio de sesión
  }

  // Verificar Feature Flag
  if (flag && !hasFeature(flag)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Verificar Permisos
  if (permissions && !permissionsGuard(permissions)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element as JSX.Element;
};
