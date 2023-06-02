import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import MainNav from './nav/MainNav';
import DashNav from './nav/DashNav';
import Footer from './Footer';

function Layout({ children }) {
  // eslint-disable-next-line
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <>
      {status === 'authenticated' ? <DashNav /> : null}
      <div>
        {router.pathname === '/dashboard' ||
        router.pathname === '/dashboard/addproject' ||
        router.pathname === '/projects/[id]/edit' ||
        router.pathname === '/projects/[id]/images' ||
        router.pathname === '/dashboard/addart' ? null : (
          <MainNav />
        )}
        {children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
