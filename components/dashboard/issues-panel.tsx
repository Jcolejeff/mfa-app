import React, { useEffect, useState } from 'react';

import { Button } from '../ui/button';
import { Sheet, SheetClose, SheetContent } from '../ui/sheet';

const IssuesPanel = ({ asset }: { asset: Record<string, any> }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(!!asset.id), [asset]);
  return (
    <Sheet open={open} modal={false} onOpenChange={val => setOpen(val)}>
      <SheetContent className="border-neutral-775 mt-[10.7em] overflow-scroll rounded-lg border-l border-t pb-24 shadow-2xl transition-all">
        <SheetClose>
          <Button aria-label="close" variant={'ghost'} className="flex shrink-0 items-center">
            x
          </Button>
        </SheetClose>
        <p>{asset.title}</p>
      </SheetContent>
    </Sheet>
  );
};

export default IssuesPanel;
