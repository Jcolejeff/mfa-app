import { ArrowLeft } from 'lucide-react';
import React from 'react';

import { Button } from '../ui/button';

const GoBackButton = () => {
  return (
    <Button
      variant={'ghost'}
      onClick={() => history.back()}
      className="flex w-fit items-center gap-2 font-bold text-text hover:bg-gray-100 hover:underline hover:transition hover:ease-in-out"
    >
      <ArrowLeft className="w-5" />
    </Button>
  );
};

export default GoBackButton;
