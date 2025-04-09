import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModuleFeatures } from "@/hooks/useModuleFeatures";
import { Button } from "@/components/atoms/Button";
import { ButtonBuilder } from "@/components/atoms/Button/ButtonBuilder";
import { useRegister } from "@/modules/auth/features/register/application/useRegister";
import { useNavigate } from "react-router-dom";

export const RegisterForm: React.FC = () => {
  const { features } = useModuleFeatures();
  const { registerUser } = useRegister();
  const navigate = useNavigate();
  const [dataRegisterUser, setDataRegisterUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dataRegisterUser.password !== dataRegisterUser.confirmPassword) {
      setDataRegisterUser({ ...dataRegisterUser, error: "Passwords do not match" });
      return;
    }
    try {
      const result = await registerUser({ name: dataRegisterUser.name, email: dataRegisterUser.email, password: dataRegisterUser.password });
      if (!result.success) {
        setDataRegisterUser({ ...dataRegisterUser, error: result.error || "Registration failed" });
      }
      navigate("/auth/login");
    } catch (err) {
      setDataRegisterUser({ ...dataRegisterUser, error: "Unexpected error occurred" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          value={dataRegisterUser.name}
          onChange={(e) => setDataRegisterUser({ ...dataRegisterUser, name: e.target.value })}
          required
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={dataRegisterUser.email}
          onChange={(e) => setDataRegisterUser({ ...dataRegisterUser, email: e.target.value })}
          required
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={dataRegisterUser.password}
          onChange={(e) => setDataRegisterUser({ ...dataRegisterUser, password: e.target.value })}
          required
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          type="password"
          value={dataRegisterUser.confirmPassword}
          onChange={(e) => setDataRegisterUser({ ...dataRegisterUser, confirmPassword: e.target.value })}
          required
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {dataRegisterUser.error && <p className="text-red-600 text-sm">{dataRegisterUser.error}</p>}

      <div>
        <Button
          {...new ButtonBuilder()
            .setVariant("primary")
            .setNeumorph(features.neumorphism)
            .setChildren("Create Account")
            .setFullWidth(true)
            .build()}
        />
      </div>

      <div className="text-center">
        <Link to="/auth/login" className="text-sm text-primary-600 hover:text-primary-500">
          Already have an account? Sign in
        </Link>
      </div>
    </form>
  );
};
