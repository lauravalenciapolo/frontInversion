import { Outlet } from "react-router-dom";
import { isFeatureEnabled, FeatureFlags } from "../core/config/featureFlags";
import { cn } from "@utils/cn";
import { useTheme } from "../core/theme/ThemeProvider";

export const DashboardLayout = () => {
  const { isDarkMode } = useTheme();
  const useNeumorphism = isFeatureEnabled(FeatureFlags.USE_NEUMORPHISM);

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col",
        isDarkMode && "dark",
        "bg-[#f8f9fb] dark:bg-gray-900"
      )}
    >
      {/* Header */}
      <header className="w-full border-b border-neutral py-3 bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-xl font-bold dark:text-white">
              React Functional Template
            </h1>
        </div>
      </header>
        {/* Main content */}
        <div className="flex-1">
          <main className="py-2 px-0 bg-[#f8f9fb] dark:bg-gray-900">
            <div
              className={cn(
                "p-6 rounded-lg",
                useNeumorphism
                  ? "container-neumorph"
                  : "bg-white dark:bg-gray-800 shadow"
              )}
            >
              <Outlet />
            </div>
          </main>
        </div>
    </div>
  );
};
