'use client';

import { PlusIcon } from 'lucide-react';
import React from 'react';

import Link from 'next/link';

import { useWorkspaceContext } from '@/contexts/workspace-context';

const ListOrganizations = () => {
  const { workspaces } = useWorkspaceContext();
  return (
    <div>
      <section className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">Your workspaces</h2>
        </div>

        <section className="mt-10 h-52 space-y-3 py-4 sm:mx-auto sm:w-full sm:max-w-sm">
          {workspaces &&
            workspaces.map(workspace => {
              return (
                <div key={crypto.randomUUID()} className="flex flex-col gap-2">
                  <Link
                    className="w-full rounded-md border px-3 py-4 hover:cursor-pointer"
                    href={'/dashboard'}
                    onClick={() => sessionStorage.setItem('currentWorkspace', JSON.stringify(workspace))}
                  >
                    {workspace.name}
                  </Link>
                </div>
              );
            })}
          <div className="flex">
            <Link
              className="flex w-full items-center text-primary hover:cursor-pointer hover:underline"
              href={'/workspace/create'}
            >
              <PlusIcon /> Create a new workspace
            </Link>{' '}
          </div>
        </section>
      </section>
    </div>
  );
};

export default ListOrganizations;
