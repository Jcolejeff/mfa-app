'use client';

import { ListFilterIcon, PlusIcon } from 'lucide-react';
import React from 'react';

import AssetsTable from '@/components/assets/assets-table';
import { useCreateAssetContext } from '@/components/assets/create-asset/create-asset-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

const Assets = () => {
  const { onOpenChange, open } = useCreateAssetContext();
  return (
    <section className="flex w-full flex-col gap-8 py-8">
      <div className="flex items-center justify-end">
        <Button variant={'outline'} className="shadow-md" onClick={() => onOpenChange(true)}>
          <Text>Create Asset</Text>
          <PlusIcon className="text-text-dim" />
        </Button>
      </div>

      <div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <Text weight={'bold'}>Total Assets</Text>
            <Button variant={'ghost'} className="shadow-sm">
              <Text>By Priority</Text>
              <ListFilterIcon className="text-text-dim" />
            </Button>
          </CardHeader>
          <CardContent>
            <AssetsTable />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Assets;
