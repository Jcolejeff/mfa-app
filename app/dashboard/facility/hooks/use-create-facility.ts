import { useMutation, useQueryClient } from '@tanstack/react-query';

import { $http } from '@/lib/http';
import { facilityKeys } from '@/lib/react-query/query-keys';

import { useWorkspaceContext } from '@/contexts/workspace-context';
import { Facility } from '@/types';

export const useCreateFacility = () => {
  const { currentWorkspace } = useWorkspaceContext();
  const queryClient = useQueryClient();
  const workspaceId = currentWorkspace?.id;
  return useMutation({
    mutationFn: (facility: Partial<Facility>) =>
      $http.post('/facilities', { ...facility, organization_id: currentWorkspace?.id }).then(res => res.data),
    onMutate: facility => {
      const queryKey = facilityKeys.list(workspaceId.toString());
      const previousData = queryClient.getQueryData<Partial<Facility>[]>(queryKey);
      queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData<Partial<Facility>[]>(queryKey, oldData => {
        const tempFacility: Partial<Facility> = {
          id: Math.random() * 100,
          ...facility,
        };
        return oldData ? [tempFacility, ...oldData] : [tempFacility];
      });
      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: facilityKeys.list(workspaceId.toString()) });
    },
    onError: (_, vars, ctx) => {
      queryClient.setQueryData<Partial<Facility>[]>(facilityKeys.list(workspaceId.toString()), ctx);
    },
  });
};
