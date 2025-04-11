import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useModuleFeatures } from '@/hooks/useModuleFeatures';
import { Button } from '@/components/atoms/Button';
import { ButtonBuilder } from '@/components/atoms/Button/ButtonBuilder';
import { useAuth } from '@modules/auth/features/application/hooks/useAuthQueries';
import { useLogin } from '@modules/auth/features/login/application/hooks/useLoginQueries';
import {useNavigate} from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const { mutate: login, isPending: isLoading } = useLogin();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [dataLogin, setDataLogin] = useState({ email: '', password: '' });
  const { features } = useModuleFeatures();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { email: dataLogin.email, password: dataLogin.password },
      {
        onSuccess: () => {
          setDataLogin({ email: '', password: '' });
        },
      }
    );
  };
  const loginButton = new ButtonBuilder()
    .setVariant('primary')
    .setNeumorph(features.neumorphism)
    .setChildren(isLoading ? 'Signing in...' : 'Sign in')
    .setFullWidth(true)
    .setDisabled(isLoading)
    .build();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          onChange={(e) => setDataLogin({ ...dataLogin, email: e.target.value })}
          value={dataLogin.email}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })}
          value={dataLogin.password}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          disabled={isLoading}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            disabled={isLoading}
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Remember me
          </label>
        </div>
        <Link to="/auth/forgot-password" className="text-sm text-primary-600 hover:text-primary-500">
          Forgot password?
        </Link>
      </div>
      <div>
        <Button {...loginButton}
        />
      </div>
      <div className="text-center">
        <Link to="/auth/register" className="text-sm text-primary-600 hover:text-primary-500">
          Don't have an account? Sign up
        </Link>
      </div>
    </form>
  );
};