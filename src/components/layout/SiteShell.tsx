'use client';

import { usePathname } from 'next/navigation';
import { AnnouncementBar } from './AnnouncementBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin ? <AnnouncementBar /> : null}
      {!isAdmin ? <Navbar /> : null}
      <main className="min-h-screen">{children}</main>
      {!isAdmin ? <Footer /> : null}
    </>
  );
}
