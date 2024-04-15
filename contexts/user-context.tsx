import { useQuery } from '@tanstack/react-query';
import { useState, createContext, useContext, useEffect } from 'react';

import { $http } from '@/lib/http';

import { User } from '@/types';

type UserContextType = {
  user: User | undefined;
  isUserLoading: boolean;
};

const UserContext = createContext({} as UserContextType);

export const useUserContext = () => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error('[useUserContext] must be used within a UserProvider');
  }

  return ctx;
};
const useCurrentUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: () => $http.get<User>('/user'),
  });
};
// migrate user request to react-query
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending } = useCurrentUser();

  return <UserContext.Provider value={{ user: data?.data, isUserLoading: isPending }}>{children}</UserContext.Provider>;
};

export default UserProvider;
