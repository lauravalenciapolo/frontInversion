import { RouteObject } from "react-router-dom";
import { FeatureFlags } from "@/core/config/featureFlags";
import { MainLayout } from "@/layouts/MainLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { LoginPage } from "@modules/auth/features/login/presentation/LoginPage";
import { RegisterPage } from "@modules/auth/features/login/presentation/RegisterPage";
import { ForgotPasswordPage } from "@modules/auth/features/login/presentation/ForgotPasswordPage";
import { TodoList } from "@/features/todo/presentation/TodoList";
import { UserRoles } from "@modules/users/presentation/UserRoles";
import { SecuritySettings } from "@/modules/settings/presentation/SecuritySettings";
import { GeneralSettings } from "@modules/settings/presentation/GeneralSettings";
import { NotFound } from "@modules/errors/presentation/NotFound";
import { Unauthorized } from "@/modules/errors/presentation/Unauthorized";
import { ProtectedRoute } from "./ProtectedRoute";
import { FeatureFlagsAdmin } from "@/pages/admin/FeatureFlagsAdmin";
import DayOperations from "@/pages/investmentOrder/dayOperations/DayOperations";
import FixedIncomeOrder from "@/pages/investmentOrder/fixedIncomeOrder/FixedIncomeOrder";
import VariableIncomeOrder from "@/pages/investmentOrder/variableIncomeOrder/VariableIncomeOrder";
import { Dashboard } from "@/pages/dashboard/Dashboard";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute
            element={<DashboardLayout />}
            flag={FeatureFlags.TODO_MODULE}
          />
        ),
        children: [
          {
            index: true,
            element: <Dashboard />, // Este se muestra en "/"
          },
          {
            path: "todo",
            element: (
              <ProtectedRoute
                element={<TodoList />}
                flag={FeatureFlags.TODO_MODULE}
              />
            ),
          },
          {
            path: "users/roles",
            element: (
              <ProtectedRoute
                element={<UserRoles />}
                flag={FeatureFlags.USER_ROLES}
                permissions={["manage_roles"]}
              />
            ),
          },
          {
            path: "settings/general",
            element: (
              <ProtectedRoute
                element={<GeneralSettings />}
                flag={FeatureFlags.GENERAL_SETTINGS}
              />
            ),
          },
          {
            path: "settings/security",
            element: (
              <ProtectedRoute
                element={<SecuritySettings />}
                flag={FeatureFlags.SECURITY_SETTINGS}
                permissions={["manage_security"]}
              />
            ),
          },
          {
            path: "admin",
            children: [
              {
                path: "feature-flags",
                element: (
                  <ProtectedRoute
                    element={<FeatureFlagsAdmin />}
                    flag={FeatureFlags.ADMIN_MODULE}
                    permissions={["admin"]}
                  />
                ),
              },
            ],
          },
          {
            path: "investment-orders",
            children: [
              {
                path: "day-operations",
                element: (
                  <ProtectedRoute
                    element={<DayOperations />}
                    flag={FeatureFlags.INVESTMENT_ORDER_DAY_OPERATIONS}
                    permissions={["admin", "finance-manager"]}
                  />
                ),
              },
              {
                path: "fixed-income",
                element: (
                  <ProtectedRoute
                    element={<FixedIncomeOrder />}
                    flag={FeatureFlags.INVESTMENT_ORDER_FIXED_INCOME}
                    permissions={["admin", "finance-manager"]}
                  />
                ),
              },
              {
                path: "variable-income",
                element: (
                  <ProtectedRoute
                    element={<VariableIncomeOrder />}
                    flag={FeatureFlags.INVESTMENT_ORDER_VARIABLE_INCOME}
                    permissions={["admin", "finance-manager"]}
                  />
                ),
              },

            ],
          },
        ],
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
    ],
  },
  {
    path: "unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
