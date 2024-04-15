'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { inputVariants } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import TextField from '@/components/ui/text-field';

import processError from '@/lib/error';
import { $http } from '@/lib/http';
import { workspaceKeys } from '@/lib/react-query/query-keys';

const createOrganizationSchema = z.object({
  name: z.string(),
  country: z.string(),
  state: z.string(),
  address: z.string(),
  phone: z.string(),
});

type CreateOrganizationFormFields = z.infer<typeof createOrganizationSchema>;

const CreateOrganization = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: '',
      country: '',
      state: '',
      address: '',
      phone: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (values: CreateOrganizationFormFields) => {
    try {
      // const { data } = await $http.post('/organizations', values); // refactor to use react-query mutation
      // remove before push

      toast(`Workspace ${values.name} created successfully`);

      queryClient.cancelQueries({ queryKey: workspaceKeys.list() });
      queryClient.invalidateQueries({ queryKey: workspaceKeys.list() });

      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof AxiosError) processError(error);
    }
  };

  return (
    <section className="flex min-h-full flex-col justify-center gap-6 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-[30rem]">
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">You&#39;re almost done!</h2>
        <Text weight={'normal'} size={'xs'}>
          We&#39;d like to know more about your organization
        </Text>
        {/* {error ? <pre className="text-center text-red-400">{error}</pre> : null} */}
      </div>

      <section className="sm:mx-auto sm:w-full sm:max-w-[30rem]">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <TextField
              control={form.control}
              placeholder="admin@My Food Angel's.com"
              required
              name="name"
              label="Organization name"
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
            <TextField
              control={form.control}
              required
              name="address"
              label="Address"
              placeholder="Enter your business location"
            />
            <TextField
              control={form.control}
              required
              name="phone"
              type="tel"
              label="Phone number"
              placeholder="Enter phone number"
            />
            <Button disabled={form.formState.isSubmitting} type="submit" isFullWidth={true}>
              {form.formState.isSubmitting ? <Spinner /> : 'Continue'}
            </Button>
          </form>
        </Form>
      </section>
    </section>
  );
};

export default CreateOrganization;
