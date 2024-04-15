import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import React from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import processError from '@/lib/error';
import { $http } from '@/lib/http';

import { useCreateFacility } from '@/app/dashboard/facility/hooks/use-create-facility';
import { useWorkspaceContext } from '@/contexts/workspace-context';

import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader } from '../ui/dialog';
import { Form } from '../ui/form';
import { inputVariants } from '../ui/input';
import { Label } from '../ui/label';
import Spinner from '../ui/spinner';
import { Text } from '../ui/text';
import TextField from '../ui/text-field';

const createFacilitySchema = z.object({
  name: z.string(),
  description: z.string(),
  address_line_1: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

type CreateFacilityFormFields = z.infer<typeof createFacilitySchema>;

// rewrite this to use a context exposing controls to trigger its open states
const CreateFacilityModal = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) => {
  const { currentWorkspace } = useWorkspaceContext();
  const { mutate } = useCreateFacility();
  const form = useForm({
    resolver: zodResolver(createFacilitySchema),
    defaultValues: {
      name: '',
      description: '',
      address_line_1: '',
      state: '',
      country: '',
      city: '',
      email: '',
      phone: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (values: CreateFacilityFormFields) => {
    try {
      // remove before push

      // mutate(values, {
      //   onSuccess: () => {
      //     toast(`Facility ${values.name} created successfully`);
      //     setIsOpen(false);
      //   },
      //   onError: error => {
      //     console.log({ error });
      //     toast.error(`An error occured while creating facility ${values.name}. Try again`);
      //   },
      // });
      toast(`Facility ${values.name} created successfully`);
    } catch (error: unknown) {
      if (error instanceof AxiosError) processError(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <DialogContent className="min-w-[750px] p-4" overlay={false}>
        <section className="flex flex-col gap-3">
          <DialogHeader>Create a new Facility</DialogHeader>
          <Text className="text-sm text-text-dim">Fill in the details of your new facility</Text>
        </section>

        <section>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <TextField control={form.control} placeholder="Building 1" required name="name" label="Name" />
              <TextField
                control={form.control}
                required
                name="description"
                label="Description"
                placeholder="Newly constructed building"
              />

              <section className="grid grid-cols-2 gap-2 pb-2">
                <div>
                  <Label htmlFor="country" className="mb-2 text-xs text-text-dim">
                    Country
                  </Label>
                  <CountryDropdown
                    classes={inputVariants({ variant: 'default' })}
                    name={'country'}
                    defaultOptionLabel="Choose country"
                    value={form.watch('country')}
                    onChange={country => {
                      //   console.log({ country });
                      form.setValue('country', country);
                      //   setCountry(country);
                      console.log('country', form.getValues());
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="state" className="mb-2 text-xs text-text-dim">
                    State
                  </Label>

                  <RegionDropdown
                    classes={inputVariants({ variant: 'default' })}
                    name={'state'}
                    defaultOptionLabel="Select state or region"
                    blankOptionLabel="Select state or region"
                    country={form.watch('country')}
                    value={form.watch('state')}
                    onChange={state => {
                      form.setValue('state', state);
                      console.log('state', form.getValues());
                    }}
                  />
                </div>
              </section>

              <section className="grid grid-cols-2 gap-2 pb-2">
                <TextField control={form.control} required name="city" label="City" placeholder="Evian city" />
                <TextField
                  control={form.control}
                  required
                  name="address_line_1"
                  label="Address"
                  placeholder="Plot 4, Building C"
                />
              </section>

              <div className="grid grid-cols-2 gap-2">
                <TextField
                  control={form.control}
                  required
                  name="email"
                  label="Email address"
                  placeholder="facility1@mfa.com"
                />
                <TextField control={form.control} required name="phone" label="Phone" placeholder="23480293023" />
              </div>

              <div className="flex justify-end gap-4">
                <Button disabled={form.formState.isSubmitting} type="submit">
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

export default CreateFacilityModal;
