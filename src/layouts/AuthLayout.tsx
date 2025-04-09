import { Link, Outlet, useLocation } from "react-router-dom";
import { isFeatureEnabled, FeatureFlags } from "../utils/featureFlags";
import { cn } from "@/utils/cn";
import { Button } from "@/components/atoms/Button";
import { ButtonBuilder } from "@/components/atoms/Button/ButtonBuilder";


export const AuthLayout = () => {
  const location = useLocation();
  const useNeumorphism = isFeatureEnabled(FeatureFlags.USE_NEUMORPHISM);
  const loginButton = new ButtonBuilder()
    .setVariant('primary')
    .setSize('sm')
    .setNeumorph(useNeumorphism)
    .setChildren('Login')
    .build();
    
    const isAuthRoot = location.pathname === "/auth";

  return (
    <div>
      {isAuthRoot && (
        <div className="flex justify-end p-4">
          <Link to="/auth/login">
            <Button {...loginButton} />
          </Link>
        </div>
      )}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div
          className={cn(
            "w-full max-w-md p-8 rounded-xl",
            useNeumorphism
              ? "container-neumorph"
              : "bg-white dark:bg-gray-800 shadow-lg"
          )}
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome to AppName</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Your productivity solution
            </p>
          </div>

          <Outlet />

          <div className="mt-8 pt-6 text-center text-sm text-gray-500 border-t border-gray-200 dark:border-gray-700">
            &copy; {new Date().getFullYear()} AppName Inc. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
