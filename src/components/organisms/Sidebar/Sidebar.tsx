import { isFeatureEnabled, FeatureFlags } from "@utils/featureFlags";
import { cn } from "@utils/cn";
import { useAuthStore } from "@modules/auth/features/login/application/store/useAuthStore";
import { SidebarProps } from './Sidebar.types';
import { Button } from "@/components/atoms/Button";
import { NavigationMenu } from "@/components/molecules/NavigationMenu/NavigationMenu";

export const Sidebar: React.FC<SidebarProps> = ({sidebarOpen, setSidebarOpen}) => {
  const useNeumorphism = isFeatureEnabled(FeatureFlags.USE_NEUMORPHISM);
  const { user } = useAuthStore();
  const MenuIcon = () => sidebarOpen ? <span>X</span>: <span>☰</span>;

  return (
      <div
      className={cn(
        "fixed inset-y-0 left-0 z-20 bg-white dark:bg-gray-800 border-r border-neutral dark:border-gray-700 transition-all duration-300 ease-in-out",
        "w-20 translate-x-0", // visible en mobile como colapsado
        sidebarOpen ? "md:w-64 md:translate-x-0" : "md:w-20" // control en desktop
      )}
      >
        <div className="p-4 border-b border-neutral dark:border-gray-700">
          <div className="font-semibold text-sm dark:text-white">
            {user?.name}
          </div>
          {sidebarOpen && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {user?.email}
            </div>
          )}
        </div>
        <div className="p-4 hidden sm:block">
          <Button
            variant="primary"
            size="xs"
            neumorph={useNeumorphism}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <MenuIcon />
          </Button>
        </div>
        <div className="p-4">
          <NavigationMenu
            className="w-full"
            orientation="vertical"
            isExpanded={sidebarOpen}
          />
        </div>
      </div>
  );
};
