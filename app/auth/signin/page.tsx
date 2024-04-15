'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { setCookie } from 'cookies-next';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Spinner from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import TextField from '@/components/ui/text-field';

import processError from '@/lib/error';
import { $http, addAccessTokenToHttpInstance } from '@/lib/http';

const signInSchema = z.object({
  email: z.string().min(2, {
    message: 'Email must be at least 2 characters',
  }),

  password: z.string().min(6, {
    message: 'password must be at least 2 characters.',
  }),
});

type SignInFormFields = z.infer<typeof signInSchema>;

const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [googleLoginLoading, setGoogleLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const googleLogin = async () => {
    setGoogleLoginLoading(true);
    try {
      const res = await $http.get('/api/auth/google');
    } catch (error) {
      console.log(error);
    }
    setGoogleLoginLoading(false);
  };

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: 'teniola@mfa.com',
      password: 'pass123',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (values: SignInFormFields) => {
    setIsLoading(true);
    try {
      // const { data } = await $http.post('/login', values);
      const data = {
        access_token: 'sample_access_token',
      };

      setCookie('access_token', data.access_token);
      toast('Login successful!');

      router.push('/workspace');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        processError(error);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="container h-full">
      <div>
        <Link
          href={'/'}
          className="flex w-fit items-center gap-2 font-bold text-text hover:underline hover:transition hover:ease-in-out"
        >
          <ArrowLeft className="w-5" />
          Go back
        </Link>
      </div>

      <section className="mx-auto flex h-full min-h-full max-w-lg flex-col justify-center py-12">
        <Text className="my-3 font-[700] md:text-[1.4rem]">Welcome back!</Text>
        <Text className="font-[400] md:text-[0.9rem]">Sign in to continue to your account</Text>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" w-[100%]  ">
            <div className="mb-5 grid grid-cols-1 gap-6 md:grid-cols-[1fr_1fr]"></div>
            <div className="mb-5">
              <TextField
                control={form.control}
                required
                name="email"
                label="Your Email"
                placeholder="yourmail@sample.com"
                className="rounded-md py-6"
              />
            </div>

            <div className="mb-5">
              <TextField
                control={form.control}
                required
                name="password"
                label="Enter Password"
                placeholder="password"
                className=" rounded-md py-6 focus-within:ring-0 focus:ring-0 focus-visible:ring-0"
                type={showPassword ? 'text' : 'password'}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                onChange={e => setRememberMe(e.target.checked)}
              />
              <label className="ms-2 text-sm font-medium text-gray-400">{'Remain signed in '}</label>
            </div>
            <Button
              type="submit"
              className={` ${!form.formState.isValid ? 'bg-slate-500' : 'bg-primary-2'} mt-8 w-full rounded-md py-4 text-base`}
              disabled={!form.formState.isValid || isLoading ? true : false}
            >
              {isLoading ? <Spinner /> : 'Continue'}
            </Button>
          </form>
        </Form>
        <div className="mx-auto my-6 flex w-1/2 items-center justify-center gap-4">
          <div className="w-[50%] border-t "></div>
          <p className="text-[1rem] leading-[24px] tracking-[0.15px] text-gray-400">Or</p>
          <div className="w-[50%] border-t "></div>
        </div>
        <button
          disabled={isLoading || googleLoginLoading}
          onClick={() => googleLogin()}
          type="submit"
          className="shadow-3 flex w-full items-center justify-center gap-4  rounded-md border   py-4 text-[1rem] font-[500]  transition-opacity duration-300 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50
              disabled:hover:cursor-not-allowed disabled:hover:opacity-50"
        >
          <Image width={30} height={30} src="/images/auth/googleIcon.svg" alt="" className="" />
          <span className="leading-[0.46px] ">Login with your Google Account</span>
        </button>
      </section>
    </div>
  );
};

export default SignIn;
