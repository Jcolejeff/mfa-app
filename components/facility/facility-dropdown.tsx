import { ChevronDown, Minus } from 'lucide-react';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import { cn } from '@/lib/utils/css';

import { Facility } from '@/types';

import { Text } from '../ui/text';

const FacilityDropdown = ({ facility }: { facility: Facility }) => {
  const pathname = usePathname();
  const menuItems = [
    {
      text: 'Dashboard',
      href: `/dashboard/facility/${facility.id}/dashboard`,
      isActive: pathname === `/dashboard/facility/${facility.id}/dashboard`,
    },
    {
      text: 'Assets',
      href: `/dashboard/facility/${facility.id}/assets`,
      isActive: pathname === `/dashboard/facility/${facility.id}/assets`,
    },
    {
      text: 'Issues',
      href: `/dashboard/facility/${facility.id}/issues`,
      isActive: pathname === `/dashboard/facility/${facility.id}/issues`,
    },
    {
      text: 'Maintenance',
      href: `/dashboard/facility/${facility.id}/maintenance`,
      isActive: pathname === `/dashboard/facility/${facility.id}/maintenance`,
    },
    {
      text: 'Users & Settings',
      href: `/dashboard/facility/${facility.id}/settings`,
      isActive: pathname === `/dashboard/facility/${facility.id}/settings`,
    },
  ];

  return (
    <Collapsible defaultOpen={pathname.includes(`/dashboard/facility/${facility.id}`)}>
      <CollapsibleTrigger className="flex w-full items-center justify-between">
        <div className="my-1 flex items-center gap-2 ">
          <Image src="/svg/dashboard/facility.svg" width={18} height={18} alt=" Icon" />
          <Text variant={'primary'} className="font-medium">
            {facility.name}
          </Text>
        </div>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="my-4 text-sm">
        <ul className="w-full">
          {menuItems.map((menuItem, index) => (
            <li className="pl-3 " key={index}>
              {menuItem.href ? (
                <Link
                  href={menuItem.href}
                  className={cn(
                    'flex items-center justify-between whitespace-nowrap border-l-2 py-2 no-underline transition-all duration-200 ease-linear',
                    menuItem.isActive ? 'border-l-primary-2 text-primary' : '',
                  )}
                >
                  <span className="flex items-center gap-4">
                    <Minus
                      className={cn(
                        '-ml-1 w-full text-gray-300 transition-all duration-200 ease-linear',
                        menuItem.isActive ? 'text-primary-2' : '',
                      )}
                    />
                    {menuItem.text}
                  </span>
                  <Image
                    src="/svg/dashboard/active.svg"
                    width={18}
                    height={18}
                    alt=" Icon"
                    className={
                      menuItem.isActive
                        ? 'h-6 w-6 text-primary transition-all duration-200 ease-linear'
                        : 'h-0 w-0 text-transparent  transition-all duration-200 ease-linear'
                    }
                  />
                </Link>
              ) : (
                <span className={cn(menuItem.isActive ? 'text-primary' : '')}>{menuItem.text}</span>
              )}
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FacilityDropdown;
