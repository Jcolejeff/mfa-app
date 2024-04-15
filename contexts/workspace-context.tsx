'use client';

import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { $http } from '@/lib/http';
import { workspaceKeys } from '@/lib/react-query/query-keys';

import { Workspace } from '@/types';

import { useUserContext } from './user-context';

interface IWorkspacesRequest {
  page: number;
  size: number;
  total: number;
  items: Workspace[];
  previous_page: string | null;
  next_page: string | null;
}

type WorkspaceContextType = {
  currentWorkspace: Workspace | undefined;
  switchWorkspace: (workspace: Workspace) => void;
  workspaces: Workspace[] | undefined;
  isLoading: boolean;
};

const WorkspaceContext = createContext({} as WorkspaceContextType);

export const useWorkspaceContext = () => {
  const ctx = useContext(WorkspaceContext);

  if (!ctx) {
    throw new Error('[useWorkspaceContext] must be used within a WorkspaceProvider');
  }

  return ctx;
};

const useUserWorkspaces = () => {
  return useQuery({
    queryKey: workspaceKeys.list(),
    queryFn: () => $http.get<IWorkspacesRequest>('/organizations'),
  });
};

// migrate user request to react-query
const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending } = useUserWorkspaces();
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>();

  const switchWorkspace = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
    sessionStorage.setItem('activeWorkspace', JSON.stringify(workspace));
  };

  const { user, isUserLoading } = useUserContext();
  const router = useRouter();

  // useEffect(() => {
  //   if (!user && isUserLoading === false) {
  //     router.push('/auth/signin');
  //   }
  // }, [user, router, isUserLoading]);
  // remove before push

  useEffect(() => {
    const currWorkspaceInSessionStorage = sessionStorage.getItem('currentWorkspace');
    if (currWorkspaceInSessionStorage) {
      setCurrentWorkspace(JSON.parse(currWorkspaceInSessionStorage) as Workspace);
    }
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{ workspaces: data?.data.items, currentWorkspace, switchWorkspace, isLoading: isPending }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceProvider;
