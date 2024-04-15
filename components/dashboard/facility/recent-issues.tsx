import { BuildingIcon, CheckCircle, Settings } from 'lucide-react';
import React from 'react';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

import IssuesTable from '../issues-table';

const RecentIssues = () => {
  return (
    <Card className="flex flex-col gap-6 bg-white p-4 ">
      <div>
        <Text className="font-bold" size={'xl'}>
          Recent Issues
        </Text>
      </div>
      <IssuesTable />
    </Card>
  );
};

export default RecentIssues;
