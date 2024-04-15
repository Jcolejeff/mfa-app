'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import UserProvider, { useUserContext } from '@/contexts/user-context';
import WorkspaceProvider from '@/contexts/workspace-context';

import './globals.css';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};
export default function RootClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Providers>{children}</Providers>;
}
