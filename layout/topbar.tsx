'use client';

import { BellDotIcon, LucidePlus, Search } from 'lucide-react';
import React, { useState } from 'react';

import { useUserContext } from '@/contexts/user-context';

import ProfileIconDropdown from '../components/dashboard/profile-icon-dropdown';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Text } from '../components/ui/text';

const Topbar = () => {
  const { user } = useUserContext();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <section className="flex items-center justify-between  px-8">
      <div className="flex min-w-[24rem] items-center justify-between gap-8 ">
        <Text className="whitespace-nowrap font-bold">Hello, {user?.first_name ?? 'Dorcas'}</Text>

        <div className="flex h-full w-full items-center rounded-md bg-gray-100 px-4  ">
          <Search className="text-primary-9 h-full w-4" />
          <div className="flex-grow">
            <Input
              className=" border-0 shadow-none focus-within:border-0 focus-within:shadow-none focus-within:ring-0 focus:border-0 focus:shadow-none focus:!ring-0 focus-visible:border-0 focus-visible:shadow-none focus-visible:ring-0 md:w-full"
              placeholder="Search (Ctrl+/)"
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant={'ghost'} className="flex gap-2 rounded-full border px-3 py-2">
          <LucidePlus className="w-4 text-gray-200" />
          <Text className="text-xs">New Issue</Text>
        </Button>
        <Button variant={'ghost'} className="flex gap-2 rounded-full border px-3 py-2">
          <BellDotIcon className="w-5" />
        </Button>

        <ProfileIconDropdown />
      </div>
    </section>
  );
};

export default Topbar;
