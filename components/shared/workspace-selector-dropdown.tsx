import { LucidePlus } from 'lucide-react';
import React, { ComponentPropsWithoutRef } from 'react';

import Image from 'next/image';

// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown-menu';

import plusIcon from '@/icons/plus-icon.svg';

import { cn } from '@/lib/utils/css';

import { useWorkspaceContext } from '@/contexts/workspace-context';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Text } from '../ui/text';

// type Assignee = UserInfo;

// export const AssigneeInitials = ({ className, assignee }: { className?: string; assignee?: Assignee }) => {
//   return (
//     <div
//       className={cn(
//         'inline-flex h-[22px] w-[22px] items-center justify-center rounded-[16px] text-xs uppercase leading-[16px] text-[#f5f5f5]',
//         className,
//       )}
//     >
//       {(assignee?.firstName?.[0] || '') + (assignee?.lastName?.[0] || '')}
//     </div>
//   );
// };

type WorkspaceSelectorDropdownProps = {
  currentWorkspace?: object;
  onWorkspaceSelect?: (workspace: object) => void;
  buttonClassName?: string;
} & ComponentPropsWithoutRef<'div'>;

const WorkspaceSelectorDropdown = ({
  buttonClassName,
  onWorkspaceSelect,
  children,
}: WorkspaceSelectorDropdownProps) => {
  // const { currentWorkspace, workspaces, switchWorkspace } = useWorkspaceContext();
  // const { data: workspaceUsers } = useWorkspaceUsers(activeWorkspace?.id!);
  // remove before push
  const currentWorkspace = {
    name: 'Workspace',
  };
  const workspaces = [
    {
      name: 'Workspace one',
    },
    {
      name: 'Workspace two',
    },
    {
      name: 'Workspace three',
    },
  ];
  const switchWorkspace = (workspace: object) => {
    if (onWorkspaceSelect) {
      onWorkspaceSelect(workspace);
    }
  };

  return (
    <aside className="flex h-full flex-col items-center gap-4 border-r px-4 py-8">
      {workspaces.map(workspace => {
        return (
          <Avatar
            key={crypto.randomUUID()}
            onClick={() => switchWorkspace(workspace)}
            className="rounded-md border-2 border-primary-2 outline outline-2 outline-offset-2 outline-primary-2"
          >
            <AvatarImage
              className="h-full w-full rounded-none object-cover"
              src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
              alt="Colm Tuite"
            />

            <AvatarFallback>
              {/* {user?.first_name[0]}
                {user?.last_name[0]} */}
            </AvatarFallback>
          </Avatar>
        );
      })}
      <Button variant={'ghost'} className="flex gap-2 rounded-md  bg-primary-1 px-3 py-2">
        <LucidePlus className="w-4  text-primary-2" />
      </Button>
    </aside>
  );
};

export { WorkspaceSelectorDropdown };
