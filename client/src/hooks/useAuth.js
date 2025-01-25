import { useAuth } from '../contexts/AuthContext';

export const useAuth = () => {
  const authContext = useAuth();
  return authContext;
};