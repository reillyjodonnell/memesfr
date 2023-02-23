import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import Feed from '@/src/components/routes/home/feed';
import SidebarAndContent from '@/components/sidebar-and-content';
import Topbar from '@/components/topbar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Memesfr</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dashboard-content flex w-full justify-center">
        <Topbar />
        <SidebarAndContent />
        <Toaster position="bottom-right" />
      </div>
    </>
  );
}
