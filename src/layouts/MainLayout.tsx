import { useState, useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isFeatureEnabled, FeatureFlags } from "@utils/featureFlags";
import { cn } from "@/utils/cn";
import { ProfileMenu } from "@/components/molecules/ProfileMenu/ProfileMenu";

import { useAuthStore } from "@modules/auth/features/login/application/store/useAuthStore";
import { useMobile } from "@/hooks/useMobile";
import { Sidebar } from "@/components/organisms/Sidebar/Sidebar";
import NotificationComponent from "@/components/organisms/Notification/Notification"; // ajusta el path según tu estructura
import { useNotification } from "@modules/notifications/application/hook/useNotification"; // ajusta el path
import { useTheme } from "@/core/theme/ThemeProvider";

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const useNeumorphism = isFeatureEnabled(FeatureFlags.USE_NEUMORPHISM);

  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const { toggleDarkMode } = useTheme();

  const handlerLogout = useCallback(() => {
    logout();
    navigate("/auth/login", { replace: true });
  }, [logout, navigate]);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);



    const { notifications, addNotification, removeNotification } = useNotification();

  const handleClickNotification = () => {
    addNotification("¡Tienes una orden pendiente!", "info");
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={cn("flex-1 transition-all duration-300 overflow-auto", sidebarOpen ? "ml-64" : "ml-20")}>
        <header className="h-16 flex items-center px-6 sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-end space-x-4 ml-auto">
            {isFeatureEnabled(FeatureFlags.NOTIFICATIONS) && (
              <button
                onClick={handleClickNotification}
                className={cn(
                  "rounded-full p-2",
                  useNeumorphism
                    ? "button-neumorph"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                🔔
              </button>
            )}
            {isFeatureEnabled(FeatureFlags.ENABLE_DARK_MODE) && (
              <button
                className={cn(
                  "rounded-full p-2",
                  useNeumorphism
                    ? "button-neumorph"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
                onClick={toggleDarkMode}
              >
                🌙
              </button>
            )}
            <ProfileMenu
              name={user?.name || ''}
              useNeumorphism={useNeumorphism}
              onLogout={handlerLogout}
            />
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>

        <NotificationComponent
          notifications={notifications}
          removeNotification={removeNotification}
          useNeumorphism={useNeumorphism}
        />
      </div>
    </div>
  );
};