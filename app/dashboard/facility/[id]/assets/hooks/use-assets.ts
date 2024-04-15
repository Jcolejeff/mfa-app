import { useQuery } from '@tanstack/react-query';

import { useParams } from 'next/navigation';

import { $http } from '@/lib/http';
import { assetKeys, facilityKeys } from '@/lib/react-query/query-keys';

import { useWorkspaceContext } from '@/contexts/workspace-context';
import { Asset, Facility } from '@/types';

interface IGetAssets {
  page: number;
  size: number;
  previous_page: string | null;
  next_page: string | null;
  items: Asset[];
  total: number;
}

export const useAssets = () => {
  const { currentWorkspace } = useWorkspaceContext();
  // const currentWorkspace = { id: 1 };
  // remove before push
  const { id: facilityId } = useParams();
  const queryKey = currentWorkspace ? assetKeys.list(currentWorkspace.id.toString()) : ['']; // current workspace shouldn't be null at this point, figure this out

  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      if (!currentWorkspace) return;
      return (
        await $http.get<IGetAssets>('/assets', {
          params: { organization_id: currentWorkspace.id, facility_id: facilityId },
        })
      ).data.items;
    },
    enabled: !!currentWorkspace,
  });
};
