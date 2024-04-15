'use client';

import { ArrowLeft, EllipsisIcon } from 'lucide-react';
import React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import GoBackButton from '@/components/shared/go-back-button';
import { WorkspaceSelectorDropdown } from '@/components/shared/workspace-selector-dropdown';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

import { useAsset } from '../hooks/use-asset';

const ViewAsset = () => {
  const { data: asset } = useAsset();

  if (!asset) return <></>;

  return (
    <section className="container h-full space-y-6 pt-8">
      <div className="flex w-full items-center">
        <GoBackButton />
      </div>

      <div className="flex h-full items-center justify-between gap-2">
        <Card className="h-full w-3/5 space-y-3 p-6">
          <div>
            <section className="flex items-center justify-between">
              <CardTitle>{asset.name}</CardTitle>
              <EllipsisIcon className="w-5" />
            </section>
            <Text size={'sm'} className="text-text-dim">
              Date created: {new Date(asset.created_at).toDateString()}
            </Text>
          </div>

          <CardContent className="text-left text-text-dim">{asset.description}</CardContent>
        </Card>

        <Card className="container h-full w-[30%] pt-6">
          <ul>
            <li className="grid grid-cols-2">
              <Text variant={'secondary'} weight={'semibold'}>
                Labels
              </Text>
              <WorkspaceSelectorDropdown />
            </li>
          </ul>
        </Card>
      </div>

      <Card className="h-full p-6">
        <CardTitle>Maintenance Schedule</CardTitle>
      </Card>
    </section>
  );
};

export default ViewAsset;
