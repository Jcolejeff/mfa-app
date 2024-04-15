'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { ArrowLeft } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import React from 'react';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Spinner from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import TextField from '@/components/ui/text-field';

import processError from '@/lib/error';
import { $http } from '@/lib/http';

const signUpSchema = z.object({
  first_name: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  last_name: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  email: z.string().min(2, {
    message: 'Email must be at least 2 characters',
  }),

  password: z.string().min(8, {
    message: 'password must be at least 2 characters.',
  }),
});
type SignupFormFields = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const router = useRouter();
  const [validSubmit, setValidSubmit] = useState(false);
  const [agreeToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    },
    mode: 'onSubmit',
  });

  async function onSubmit(values: SignupFormFields) {
    setIsLoading(true);
    const { data } = await $http.post('/signup', values);
    localStorage.setItem('access_token', data.access_token);
    setCookie('token', data.access_token);

    toast('Signup successful');
    router.push('/workspace');
    setIsLoading(false);
  }

  useEffect(() => {
    if (!form.formState.isValid || !agreeToTerms) {
      setValidSubmit(false);
    } else {
      setValidSubmit(true);
    }
  }, [agreeToTerms, form.formState.isValid]);
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
      <section className="mx-auto flex h-full min-h-full max-w-lg  flex-col justify-center py-12">
        <Text className="my-3  font-[700] md:text-[1.4rem]">Let’s get started!</Text>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" w-[100%]  ">
            <div className="mb-5 grid grid-cols-1 gap-6 md:grid-cols-[1fr_1fr]">
              <TextField
                control={form.control}
                required
                name="first_name"
                label="First Name"
                placeholder="Tim"
                className=" rounded-md py-6"
              />
              <TextField
                control={form.control}
                required
                name="last_name"
                label="Last Name"
                placeholder="Tim"
                className=" rounded-md py-6"
              />
            </div>
            <div className="mb-5 ">
              <TextField
                control={form.control}
                required
                name="email"
                label="Your Email"
                placeholder="yourmail@sample.com"
                className=" rounded-md py-6"
              />
            </div>

            <div className="bord mb-5">
              <TextField
                control={form.control}
                required
                name="password"
                label="Create a Password"
                placeholder="(Minimum of 8 characters)"
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
                onChange={e => setAgreedToTerms(e.target.checked)}
              />
              <label className="ms-2 text-sm font-medium text-gray-400">
                {'I agree to My Food Angels '}
                <span className="cursor-pointer text-primary-2">Privacy Policy</span>, and{' '}
                <span className="cursor-pointer text-primary-2">Terms and conditions</span>.
              </label>
            </div>
            <Button
              type="submit"
              className={` ${!validSubmit ? 'bg-slate-500' : 'bg-primary-2'} mt-8 w-full rounded-md py-4 text-base`}
              disabled={!validSubmit || isLoading ? true : false}
            >
              {isLoading ? <Spinner /> : 'Get Started!'}
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
          className="shadow-3 flex w-full items-center justify-center gap-4  rounded-md border  py-4 text-[1rem] font-[500]  transition-opacity duration-300 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50
              disabled:hover:cursor-not-allowed disabled:hover:opacity-50"
        >
          <Image width={30} height={30} src="/images/auth/googleIcon.svg" alt="" className="" />
          <span className="leading-[0.46px] ">Sign Up with your Google Account</span>
        </button>
      </section>
    </div>
  );
};

export default SignUp;
