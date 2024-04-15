'use client';

import { LogOutIcon } from 'lucide-react';
import { useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Text } from '@/components/ui/text';

import WorkspaceProvider, { useWorkspaceContext } from '@/contexts/workspace-context';

export default function OrgLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { workspaces, isLoading } = useWorkspaceContext();

  useEffect(() => {
    console.log({ workspaces });
    if (workspaces && workspaces.length === 0 && isLoading === false) {
      router.push('/workspace/create');
    }
  }, [workspaces, isLoading, router]);

  return (
    <WorkspaceProvider>
      <section className="grid grid-cols-12 py-8">
        <div className="col-span-8">{children}</div>

        <aside className="bg-green col-span-4 flex flex-col gap-3 px-4">
          <div className="flex justify-end text-text-link hover:underline hover:transition hover:ease-in-out">
            <Link href={'/'} className="flex items-center gap-2 text-red-500">
              {' '}
              <LogOutIcon /> Log out
            </Link>
          </div>
          <Text weight={'bold'} size={'2xl'}>
            Effortless Facility Management!
          </Text>
          <Text weight={'medium'} size={'sm'}>
            Our platform simplifies every step of managing facilities, from reporting issues to tracking maintenance
            progress. Stay in control and save time with user-friendly tools tailored to your needs!
          </Text>
        </aside>
      </section>
    </WorkspaceProvider>
  );
}
