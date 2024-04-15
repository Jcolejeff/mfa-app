import { useQuery } from '@tanstack/react-query';

import { useParams } from 'next/navigation';

import { $http } from '@/lib/http';
import { assetKeys } from '@/lib/react-query/query-keys';

import { useWorkspaceContext } from '@/contexts/workspace-context';
import { Asset } from '@/types';

export const useAsset = () => {
  const { currentWorkspace } = useWorkspaceContext();
  const { assetId } = useParams();

  return useQuery({
    queryKey: assetKeys.detail(assetId.toString()),
    queryFn: async () => {
      if (!currentWorkspace) return;
      return (
        await $http.get<Asset>(`/assets/${assetId}`, {
          params: { organization_id: currentWorkspace.id },
        })
      ).data;
    },
    enabled: !!currentWorkspace || !!assetId,
  });
};
