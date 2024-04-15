import { BuildingIcon, CheckCircle, Settings } from 'lucide-react';
import React from 'react';

import Image from 'next/image';

import { Card, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Text } from '../../ui/text';

const QuickActions = () => {
  const QUICK_ACTIONS = [
    {
      title: 'Add Facility',
      description: 'Add the buildings and facilities in your organisation',
      icon: <Image src="/svg/dashboard/addFacility.svg" width={28} height={28} alt="Facility Icon" />,
    },
    {
      title: 'Add Asset',
      description: 'Add the Assets under each Facility.',
      icon: <Image src="/svg/dashboard/addAsset.svg" width={38} height={28} alt=" Icon" />,
    },
    {
      title: 'Create issue',
      description: 'Having Issues? Create Issue Issues to be fixed!',
      icon: <Image src="/svg/dashboard/addAsset.svg" width={38} height={28} alt=" Icon" />,
    },
    {
      title: 'Create Schedule',
      description: 'Create an effective Maintenance Schedule!',
      icon: <Image src="/svg/dashboard/createSchedule.svg" width={38} height={28} alt=" Icon" />,
    },
  ];
  return (
    <Card className="flex flex-col gap-6 bg-white p-4 ">
      <div>
        <Text className="font-bold" size={'xl'}>
          Quick Actions
        </Text>
      </div>
      <div className="flex items-stretch gap-3 ">
        {QUICK_ACTIONS.map(action => (
          <Card key={crypto.randomUUID()} className="flex flex-col gap-4 border p-6 shadow-none">
            <div>{action.icon}</div>

            <CardTitle className="">{action.title}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Text weight={'normal'} className="text-sm text-text-dim">
                {action.description}
              </Text>
            </CardDescription>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
