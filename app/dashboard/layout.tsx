'use client';

import { LucidePlus } from 'lucide-react';
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import CreateAssetProvider from '@/components/assets/create-asset/create-asset-context';
import CurrentWorkplaceDropdown from '@/components/shared/current-workplace-dropdown';
import { WorkspaceSelectorDropdown } from '@/components/shared/workspace-selector-dropdown';
import { Button } from '@/components/ui/button';

import { useUserContext } from '@/contexts/user-context';
import WorkspaceProvider from '@/contexts/workspace-context';
import Sidebar from '@/layout/sidebar';
import Topbar from '@/layout/topbar';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WorkspaceProvider>
      <CreateAssetProvider>{children}</CreateAssetProvider>;
    </WorkspaceProvider>
  );
};

// would handle org redirect for users with one organization
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <section className="grid grid-cols-[0.7fr_4fr]">
        <aside className="bg-green grid  h-[100vh] w-full grid-cols-[1fr_3fr] flex-col  border-r border-r-gray-100">
          <div>
            <WorkspaceSelectorDropdown onWorkspaceSelect={() => null} />
          </div>
          <div className="flex flex-col gap-4 py-8 ">
            <div className="border-b border-b-gray-100 px-8 pb-4">
              <CurrentWorkplaceDropdown />
            </div>

            <Sidebar />
            {/* <Button variant={'ghost'} className="flex gap-2 rounded-md  bg-primary-1 px-3 py-2">
              <LucidePlus className="w-4  text-primary-2" />
            </Button> */}
          </div>
        </aside>

        <div className="  ">
          <div className=" py-[1.64rem] shadow-md">
            <Topbar />
          </div>
          <section className="bg-primary-3 p-8">{children}</section>
        </div>
      </section>
    </Providers>
  );
}
