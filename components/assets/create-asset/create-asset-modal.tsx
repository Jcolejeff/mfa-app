import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { X } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import processError from '@/lib/error';

import { useCreateAsset } from '@/app/dashboard/facility/[id]/assets/hooks/use-create-asset';

import { Button } from '../../ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader } from '../../ui/dialog';
import { Form, FormControl, FormField, FormItem } from '../../ui/form';
import { Label } from '../../ui/label';
import Spinner from '../../ui/spinner';
import { Switch } from '../../ui/switch';
import TextField from '../../ui/text-field';
import { Textarea } from '../../ui/textarea';

import { useCreateAssetContext } from './create-asset-context';

const createAssetSchema = z.object({
  name: z.string(),
  description: z.string(),
  installed_quantity: z.number({
    invalid_type_error: 'Amount must be a number',
    coerce: true,
  }),
  serial_number: z.string(),
});

type CreateAssetFormFields = z.infer<typeof createAssetSchema>;

// rewrite this to use a context exposing controls to trigger its open states
const CreateAssetModal = () => {
  const { open, onOpenChange, createMore, setCreateMore } = useCreateAssetContext();
  const form = useForm({
    resolver: zodResolver(createAssetSchema),
    defaultValues: {
      name: '',
      description: '',
      installed_quantity: 1,
      serial_number: '',
    },
    mode: 'onSubmit',
  });
  const { mutate, isPending: isCreateAssetPending } = useCreateAsset();

  const onCloseForm = (open: boolean) => {
    onOpenChange(open);
    form.reset();
  };

  const onSubmit = async (values: CreateAssetFormFields) => {
    console.log({ values });
    try {
      mutate(values, {
        onSuccess: () => {
          toast(`Asset ${values.name} created successfully`);
          onOpenChange(false);

          if (createMore) {
            onOpenChange(true);
            form.reset();
          }
        },
        onError: error => {
          console.log({ error });
          toast.error(`An error occured while creating asset ${values.name}. Try again`);
        },
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) processError(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onCloseForm} modal={true}>
      <DialogContent className="min-w-[750px] p-4" overlay={false}>
        <section className="flex flex-col gap-3">
          <div className="flex flex-row justify-between">
            <DialogHeader>Create asset</DialogHeader>

            <DialogClose className=" hover:bg-gray/10 data-[state=open]:bg-accent data-[state=open]:text-muted-foreground right-4 top-4 w-fit border-none p-1 opacity-70 ring-offset-transparent transition-opacity hover:opacity-100 focus:shadow-none focus:outline-none focus:ring focus:ring-[#777979]/20 focus-visible:ring-1 focus-visible:ring-[#777979]/20 disabled:pointer-events-none">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </section>

        <section>
          <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
              <TextField
                variant={'unstyled'}
                className="pl-1 text-lg placeholder:text-lg"
                control={form.control}
                placeholder="Asset name"
                required
                name="name"
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        variant={'noBorderAndFocus'}
                        size="sm"
                        className="resize-none pl-1"
                        placeholder="Add description..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-2">
                <TextField
                  control={form.control}
                  type="number"
                  required
                  name="installed_quantity"
                  label="Installed quantity"
                  placeholder="80"
                />

                <TextField
                  control={form.control}
                  required
                  name="serial_number"
                  label="Serial number"
                  placeholder="872932NM8"
                />
              </div>

              <div className="flex justify-end gap-4">
                <div className="flex items-center gap-1.5">
                  <Switch checked={createMore} onCheckedChange={() => setCreateMore(prev => !prev)} />
                  <Label htmlFor="create-more" className="text-xs text-[#767676]">
                    Create more
                  </Label>
                </div>
                <Button disabled={isCreateAssetPending} type="submit" className="h-7">
                  {form.formState.isSubmitting ? <Spinner /> : 'Save'}
                </Button>
              </div>
            </form>
          </Form>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssetModal;
