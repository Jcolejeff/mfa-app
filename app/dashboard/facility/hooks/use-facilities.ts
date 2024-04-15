import { useQuery } from '@tanstack/react-query';

import { $http } from '@/lib/http';
import { facilityKeys } from '@/lib/react-query/query-keys';

import { useWorkspaceContext } from '@/contexts/workspace-context';
import { Facility } from '@/types';

export const useFacilities = () => {
  const { currentWorkspace } = useWorkspaceContext();

  return useQuery({
    queryKey: facilityKeys.list(currentWorkspace?.id.toString()),
    queryFn: async () => {
      return (await $http.get<Facility[]>('/facilities', { params: { organization_id: currentWorkspace?.id } })).data;
    },
    enabled: !!currentWorkspace?.id,
  });
};
