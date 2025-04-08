import { useState, useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isFeatureEnabled, FeatureFlags } from "@utils/featureFlags";
import { cn } from "@/utils/cn";
import { Button } from "@/components/atoms/Button";
import { ButtonBuilder } from "@/components/atoms/Button/ButtonBuilder";
import { useModuleFeatures } from "@/hooks/useModuleFeatures";
import { useAuthStore } from "@modules/auth/features/login/application/store/useAuthStore";
import { useMobile } from "@/hooks/useMobile";
import { Sidebar } from "@/components/organisms/Sidebar/Sidebar";

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const useNeumorphism = isFeatureEnabled(FeatureFlags.USE_NEUMORPHISM);
  const { features } = useModuleFeatures();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const isMobile = useMobile();

  const handlerLogout = useCallback(() => {
    logout();
    navigate("/auth/login", { replace: true });
  }, [logout, navigate]);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const logoutButton = new ButtonBuilder()
    .setVariant("secondary")
    .setNeumorph(features.neumorphism)
    .setChildren("Logout")
    .setOnClick(handlerLogout)
    .setFullWidth(true)
    .build();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Main Content */}
      <div
        className={cn(
          "flex-1 transition-all duration-300 overflow-auto",
          sidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        {/* Top Bar */}
        <header className="h-16 flex items-center px-6 sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-end space-x-4 ml-auto">
            {isFeatureEnabled(FeatureFlags.NOTIFICATIONS) && (
              <button
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
              >
                🌙
              </button>
            )}
            <Button {...logoutButton} />
          </div>
        </header>
        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
