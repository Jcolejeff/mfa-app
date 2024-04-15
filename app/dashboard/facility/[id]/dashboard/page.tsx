'use client';

import { Eye, EyeOff, Link } from 'lucide-react';
import React from 'react';

import IssuesSummary from '@/components/dashboard/facility/issues-summary';
import QuickActions from '@/components/dashboard/facility/quick-actions';
import RecentIssues from '@/components/dashboard/facility/recent-issues';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

// maybe unify issue summary and quick actions component by delegating props to a base component
const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <section className="relative w-full space-y-4 rounded-md bg-black bg-[url('/images/dashboard/heroBg.png')] bg-contain bg-right-bottom  bg-no-repeat px-8 py-8 text-white md:bg-[url('/images/dashboard/heroBg.png')]">
        <Text className="text-2xl font-semibold text-white">
          Start collaborating by Inviting Co-workers to your Facility
        </Text>
        <Text className="text-sm font-light text-white">
          My Food Angelsis meant to be used by Facilities. Invite some of your team members to collaborate with you.
        </Text>
        <Button variant={'ghost'} className="flex gap-2 rounded-md border border-secondary-1 bg-secondary-1 px-3 py-2 ">
          <Text className="text-sm text-white ">Copy Invite Link</Text>
          <Link className="w-4 text-white" />
        </Button>
        <Button
          variant={'ghost'}
          className="absolute right-[1%] top-[1%] flex gap-2 rounded-full border bg-white px-2 py-1 "
        >
          {/* <Eye className="w-4 text-primary-2" /> */}
          <EyeOff className="w-4 text-primary-2" />
        </Button>
      </section>
      <IssuesSummary />
      <QuickActions />
      <RecentIssues />
    </div>
  );
};

export default Dashboard;
