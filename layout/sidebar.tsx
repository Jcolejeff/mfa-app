import {
  GitPullRequestCreate,
  LayoutDashboardIcon,
  Minus,
  PanelRightDashed,
  PlusIcon,
  StarIcon,
  Timer,
} from 'lucide-react';
import React, { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import CreateAssetModal from '@/components/assets/create-asset/create-asset-modal';
import FacilityDropdown from '@/components/facility/facility-dropdown';

import { cn } from '@/lib/utils/css';

import { useFacilities } from '@/app/dashboard/facility/hooks/use-facilities';

import CreateFacilityModal from '../components/facility/create-facility-modal';
import { Button } from '../components/ui/button';
import { Text } from '../components/ui/text';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';

const SIDEBAR_ITEMS = [
  {
    text: 'Dashboard',
    icon: (
      <LayoutDashboardIcon className="text-inherit transition-all  duration-200 ease-linear group-hover:text-primary" />
    ),
    href: '/dashboard',
  },
  {
    text: 'My Issues',
    icon: (
      <GitPullRequestCreate className="text-inherit transition-all  duration-200  ease-linear group-hover:text-primary" />
    ),
    href: '/issues',
  },
  {
    text: 'Starred',
    icon: <StarIcon className="text-gray-500 transition-all  duration-200  ease-linear group-hover:text-primary" />,
    href: '/starred',
  },
  {
    text: 'Maintenance Schedule',
    icon: <Timer className="text-gray-500 transition-all  duration-200  ease-linear group-hover:text-primary" />,
    href: '/maintenance-schedule',
  },
];

type SidebarItem = (typeof SIDEBAR_ITEMS)[0];

export const SidebarItem = ({ item }: { item: SidebarItem }) => {
  const pathname = usePathname();
  return (
    <Link
      href={item.href}
      className={cn(
        'hover:text-primary-9 hover:text-primary-9 group flex cursor-default items-center justify-start gap-3 whitespace-nowrap rounded px-8 py-3 transition-all duration-300 ease-in-out',
        pathname === item.href ? 'bg-primary-1 font-semibold text-primary-2' : 'hover:bg-primary-2',
      )}
    >
      {item.icon}
      <Text
        size={'sm'}
        weight={pathname === item.href ? 'semibold' : 'medium'}
        className="text-inherit hover:!bg-primary-2"
      >
        {item.text}
      </Text>
    </Link>
  );
};

const Sidebar = () => {
  const [openCreateFacilityModal, setOpenCreateFacilityModal] = useState(false);
  // const { data } = useFacilities();
  // remove before push
  const data = [
    {
      id: 1,
      name: 'Facility 1',
      organization_id: 1,
      description: 'Facility 1 description',
      address_line_1: 'Address line 1',
      city: 'City',
      state: 'State',
      country: 'Country',
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
      is_deleted: false,
      creator: {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: '',
        unique_id: '1',
        is_active: true,
        date_created: new Date(),

        last_updated: new Date(),
      },
      assets: [
        {
          id: '1',
          name: 'Asset 1',
        },
        {
          id: '2',
          name: 'Asset 2',
        },
      ],
    },
    {
      id: 2,
      name: 'Facility 2',
      organization_id: 1,
      description: 'Facility 1 description',
      address_line_1: 'Address line 1',
      city: 'City',
      state: 'State',
      country: 'Country',
      created_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
      is_deleted: false,
      creator: {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: '',
        unique_id: '1',
        is_active: true,
        date_created: new Date(),

        last_updated: new Date(),
      },
      assets: [
        {
          id: '3',
          name: 'Asset 3',
        },
        {
          id: '4',
          name: 'Asset 4',
        },
      ],
    },
  ];

  return (
    <section className=" py-3">
      {<CreateFacilityModal isOpen={openCreateFacilityModal} setIsOpen={setOpenCreateFacilityModal} />}
      <div className="">
        {SIDEBAR_ITEMS.map(item => {
          return <SidebarItem key={crypto.randomUUID()} item={item} />;
        })}
      </div>

      <div>
        <section className="my-6 flex w-full  items-center justify-between " style={{ paddingRight: '2rem' }}>
          <div className="flex items-center gap-2">
            <Minus className="text-gray-300" />
            <Text variant={'secondary'} className=" text-sm font-light uppercase">
              Facilities
            </Text>
          </div>

          <div className=" ">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setOpenCreateFacilityModal(true)}
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0"
                  >
                    <PlusIcon className="h-4 w-4 text-text-dim" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  className={cn(
                    'bg-neutral-750 border-neutral-725 flex items-center justify-between rounded-[4px] py-0',
                  )}
                >
                  Add new facility
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </section>
        <section className="px-8">
          {data?.map(facility => {
            return <FacilityDropdown key={facility.id} facility={facility} />;
          })}
        </section>
      </div>

      <CreateAssetModal />
    </section>
  );
};

export default Sidebar;
