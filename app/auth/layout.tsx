'use client';

import { ArrowLeft } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Text } from '@/components/ui/text';

import { useUserContext } from '@/contexts/user-context';

// would handle some auth checks for authenticated users

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUserContext();
  const router = useRouter();

  const otherAuthPageLink = pathname === '/auth/signin' ? '/auth/signup' : '/auth/signin';
  const otherAuthPageText = pathname === '/auth/signup' ? 'Sign in' : 'Sign up';

  return (
    <section className=" grid h-screen w-full grid-cols-1   md:grid-cols-[4fr_1.8fr]">
      <div className="py-8">{children}</div>

      {/* <aside
        className="relative hidden h-full w-full flex-col items-center justify-center gap-[5rem] bg-primary-1 bg-no-repeat px-4 py-8  md:flex  2xl:gap-[7rem]"
        style={{
          backgroundImage: `url("/images/auth/authBg.svg")`,
          backgroundPosition: 'left bottom',
        }}
      >
        <div className="w-fit self-end text-sm font-semibold text-text-link underline hover:transition hover:ease-in-out ">
          <Link href={otherAuthPageLink}>{otherAuthPageText}</Link>
        </div>
        <div className="relative ">
          <div className="mt-10 flex w-full  max-w-md  flex-col items-center   md:mt-0">
            <div className=" relative z-40   ">
              <Image
                src="/images/auth/signUpImg.png"
                alt="auth image"
                className="h-auto w-auto object-contain"
                width={210}
                height={100}
              />
            </div>
            <div className="absolute right-[-8%] top-[-6%] z-[1] ">
              <div className="block max-w-sm">
                <Image
                  src="/images/auth/badgeTwo.svg"
                  className="w-[30vw] md:w-[8rem]"
                  width={210}
                  height={100}
                  alt="What track are you interested in?"
                />
              </div>
            </div>

            <div className="absolute bottom-[10%] right-[-10%] z-50 w-9/12 md:bottom-[40%] md:right-[-2%]">
              <div className="block max-w-sm">
                <Image
                  src="/images/auth/badgeOne.svg"
                  className="w-[35vw] md:w-auto"
                  width={240}
                  height={50}
                  alt="10 COHORTS"
                />
              </div>
            </div>
          </div>

          <Text className="my-3 text-center text-[1.4rem] font-bold">Effortless Facility Management!</Text>
          <Text className=" mx-auto max-w-[20rem] text-center text-sm">
            Our platform simplifies every step of managing facilities, from reporting issues to tracking maintenance
            progress. Stay in control and save time with user-friendly tools tailored to your needs!
          </Text>
        </div>
      </aside> */}

      <div className="container flex h-full flex-col border bg-primary-1 bg-[url('/images/auth/authBg.svg')] bg-left-bottom bg-no-repeat py-8">
        <div className="w-fit self-end text-sm font-semibold text-text-link underline hover:transition hover:ease-in-out ">
          <Link href={otherAuthPageLink}>{otherAuthPageText}</Link>
        </div>

        <section className="mx-auto flex h-full min-h-full max-w-lg flex-col justify-center py-12">
          <div className="relative ">
            <div className="mt-10 flex w-full  max-w-md  flex-col items-center   md:mt-0">
              <div className=" relative z-40   ">
                <Image
                  src="/images/auth/signUpImg.png"
                  alt="auth image"
                  className="h-auto w-auto object-contain"
                  width={210}
                  height={100}
                />
              </div>
              <div className="absolute right-[-8%] top-[-6%] z-[1] ">
                <div className="block max-w-sm">
                  <Image
                    src="/images/auth/badgeTwo.svg"
                    className="w-[30vw] md:w-[8rem]"
                    width={210}
                    height={100}
                    alt="What track are you interested in?"
                  />
                </div>
              </div>

              <div className="absolute bottom-[10%] right-[-10%] z-50 w-9/12 md:bottom-[40%] md:right-[-2%]">
                <div className="block max-w-sm">
                  <Image
                    src="/images/auth/badgeOne.svg"
                    className="w-[35vw] md:w-auto"
                    width={240}
                    height={50}
                    alt="10 COHORTS"
                  />
                </div>
              </div>
            </div>

            <Text className="my-3 text-center text-[1.4rem] font-bold">Effortless Facility Management!</Text>
            <Text className=" mx-auto max-w-[20rem] text-center text-sm">
              Our platform simplifies every step of managing facilities, from reporting issues to tracking maintenance
              progress. Stay in control and save time with user-friendly tools tailored to your needs!
            </Text>
          </div>
        </section>
      </div>
    </section>
  );
}
