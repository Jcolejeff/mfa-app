import { CheckCircle, ChevronDown, Filter } from 'lucide-react';
import React, { useState } from 'react';

import Image from 'next/image';

import { Button } from '../../ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Dropdown } from '../../ui/dropdown-menu';
import { Text } from '../../ui/text';

const IssuesSummary = () => {
  const [sortCriterion, setSortCriterion] = useState('month');

  const CATEGORIZED_ISSUES = [
    {
      title: 'All issues',
      count: 0,
      icon: <Image src="/svg/dashboard/allIssues.svg" width={28} height={28} alt=" Icon" />,
    },
    {
      title: 'Pending issues',
      count: 0,
      icon: <Image src="/svg/dashboard/pendingIssues.svg" width={28} height={28} alt=" Icon" />,
    },
    {
      title: 'In progress issues',
      count: 0,
      icon: <Image src="/svg/dashboard/inProgress.svg" width={28} height={28} alt=" Icon" />,
    },
    {
      title: 'Closed issues',
      count: 0,
      icon: <Image src="/svg/dashboard/closed.svg" width={28} height={28} alt=" Icon" />,
    },
  ];

  const handleSortChange = (newValue: string) => {
    setSortCriterion(newValue);
  };
  return (
    <Card className="flex flex-col gap-6 bg-white p-4 shadow-sm ">
      <div className="flex w-full items-center justify-between">
        <Text className="font-bold" size={'xl'}>
          Issues Summary
        </Text>
        <Dropdown>
          <Dropdown.Trigger asChild>
            <Button
              variant="outline"
              className="group flex w-fit items-center justify-center gap-2 rounded-md border     px-2 py-1 text-base  font-semibold shadow-sm transition-all duration-300 ease-in-out hover:opacity-90"
            >
              <p className="text-[0.85rem] font-[500] capitalize">This {sortCriterion}</p>
              <ChevronDown className="w-4 cursor-pointer  transition-opacity duration-300 ease-in-out hover:opacity-95 active:opacity-100" />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content className="w-56 border bg-white text-[0.65rem] shadow-lg">
            <Dropdown.Separator />
            <Dropdown.RadioGroup value={sortCriterion} onValueChange={handleSortChange}>
              <Dropdown.RadioItem value="year">Year</Dropdown.RadioItem>
              <Dropdown.RadioItem value="month">Month</Dropdown.RadioItem>
              <Dropdown.RadioItem value="day">Day</Dropdown.RadioItem>
            </Dropdown.RadioGroup>
          </Dropdown.Content>
        </Dropdown>
      </div>
      <div className="grid grid-cols-4 place-items-stretch gap-4">
        {CATEGORIZED_ISSUES.map(issueCat => (
          <Card key={crypto.randomUUID()} className="flex flex-col gap-8 border p-6 shadow-none">
            <div>{issueCat.icon}</div>
            <div>
              <CardTitle className="mb-2 font-normal text-text-dim">{issueCat.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Text className="text-xl font-bold">{issueCat.count}</Text>
                <Text variant={'secondary'} className="text-sm">
                  issues to
                </Text>
              </CardDescription>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default IssuesSummary;
