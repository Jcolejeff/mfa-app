import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useParams } from 'next/navigation';

import { $http } from '@/lib/http';
import { assetKeys, facilityKeys } from '@/lib/react-query/query-keys';

import { useWorkspaceContext } from '@/contexts/workspace-context';
import { Asset } from '@/types';

export const useCreateAsset = () => {
  const { currentWorkspace } = useWorkspaceContext();
  const queryClient = useQueryClient();
  const workspaceId = currentWorkspace?.id;
  const { id: facilityId } = useParams();

  return useMutation({
    mutationFn: (asset: Partial<Asset>) =>
      $http
        .post('/assets', { ...asset, organization_id: currentWorkspace?.id, facility_id: facilityId })
        .then(res => res.data),
    onMutate: facility => {
      const queryKey = assetKeys.list(workspaceId!.toString());
      const previousData = queryClient.getQueryData<Partial<Asset>[]>(queryKey);
      queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData<Partial<Asset>[]>(queryKey, oldData => {
        const tempAsset: Partial<Asset> = {
          id: Math.random() * 100,
          ...facility,
        };
        return oldData ? [tempAsset, ...oldData] : [tempAsset];
      });
      return previousData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assetKeys.list(workspaceId!.toString()) });
    },
    onError: (_, vars, ctx) => {
      queryClient.setQueryData<Partial<Asset>[]>(assetKeys.list(workspaceId!.toString()), ctx);
    },
  });
};
