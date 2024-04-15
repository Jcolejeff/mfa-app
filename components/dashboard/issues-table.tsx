'use client';

import { EllipsisVertical } from 'lucide-react';
import React, { useState } from 'react';

import { useAssets } from '@/app/dashboard/facility/[id]/assets/hooks/use-assets';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

import AssetPanel from './issues-panel';

const DUMMY_ASSETS = [
  {
    id: '1',
    title: 'Kitchen Sink',
    assetId: 'RES-1',
    quantity: 4,
    dateAdded: new Date(),
    spare: 2,
    name: 'Kitchen Sink',
    installed_quantity: 4,
    created_at: '2021-08-09T00:00:00.000Z',
  },
  {
    id: '1',
    title: 'Kitchen Sink',
    assetId: 'RES-1',
    quantity: 4,
    dateAdded: new Date(),
    spare: 2,
    name: 'Kitchen Sink',
    installed_quantity: 4,
    created_at: '2021-08-09T00:00:00.000Z',
  },
  {
    id: '1',
    title: 'Kitchen Sink',
    assetId: 'RES-1',
    quantity: 4,
    dateAdded: new Date(),
    spare: 2,
    name: 'Kitchen Sink',
    installed_quantity: 4,
    created_at: '2021-08-09T00:00:00.000Z',
  },
  {
    id: '1',
    title: 'Dining table',
    assetId: 'RES-1',
    quantity: 4,
    dateAdded: new Date(),
    spare: 2,
    name: 'Kitchen Sink',
    installed_quantity: 4,
    created_at: '2021-08-09T00:00:00.000Z',
  },
  {
    id: '1',
    title: 'Kitchen Sink',
    assetId: 'RES-1',
    quantity: 4,
    dateAdded: new Date(),
    spare: 2,
    name: 'Kitchen Sink',
    installed_quantity: 4,
    created_at: '2021-08-09T00:00:00.000Z',
  },
];

const IssuesTable = () => {
  const [currentAsset, setCurrentAsset] = useState({});
  const { data: assets } = useAssets();
  // remove before push

  return (
    <Table className="rounded-t-xl border">
      <TableHeader className=" bg-[#F6F6F9]">
        <TableRow>
          <TableHead>S/N</TableHead>
          <TableHead>TITLE</TableHead>
          <TableHead>ASSET ID</TableHead>
          <TableHead>QUANTITY</TableHead>

          <TableHead>DATE ADDED</TableHead>
          <TableHead>SPARE</TableHead>
          <TableHead>ACTION</TableHead>
        </TableRow>
      </TableHeader>

      <AssetPanel asset={currentAsset} />

      <TableBody>
        {/* // remove before push */}
        {DUMMY_ASSETS?.map((asset, idx) => {
          return (
            <TableRow onClick={() => setCurrentAsset(asset)} key={crypto.randomUUID()} className="hover:bg-[#F6F6F9]">
              <TableCell>{idx + 1}</TableCell>

              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.id}</TableCell>
              <TableCell>{asset.installed_quantity}</TableCell>
              <TableCell>{new Date(asset.created_at).toDateString()}</TableCell>
              <TableCell>0</TableCell>
              <TableCell>
                <EllipsisVertical />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default IssuesTable;
