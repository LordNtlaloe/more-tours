import React from 'react';
import AdminLayout from '../layout/AdminLayout';
import { AiFillBank, AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { MdHotel } from 'react-icons/md';
import { useWidgetHook } from '../hooks/widget-hook';
import Widget from '../components/Widget';
import BigWidget from '../components/BigWidget';
import dynamic from 'next/dynamic'; // Import dynamic for client-side rendering
import { Metadata } from 'next';
import { getCurrentUser } from "@/lib/currentUser";
import { redirect } from 'next/navigation';

// Dynamically import the charts with SSR disabled
const ChartOne = dynamic(() => import('../components/Chart/ChartOne'), { ssr: false });
const ChartTwo = dynamic(() => import('../components/Chart/ChartTwo'), { ssr: false });
const ChartThree = dynamic(() => import('../components/Chart/ChartThree'), { ssr: false });

export const metadata: Metadata = {
  title: "Admin"
}

export default async function Dashboard() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "Admin") {
    redirect("/api/auth/signin?callbackUrl=/admin");
    return null; // Prevent further execution
  }

  const [
    usersQuery,
    listingsQuery,
    reservationsQuery,
    revenueQuery,
    mostReservedQuery,
  ] = useWidgetHook();

  const widgetData = [
    {
      page: "users",
      data: usersQuery.data || {},
      icon: <AiOutlineUser color="#efefef" />
    },
    {
      page: "listings",
      data: listingsQuery.data || {},
      icon: <MdHotel color="#efefef" />
    },
    {
      page: "reservations",
      data: reservationsQuery.data || {},
      icon: <AiOutlineHome color="#efefef" />
    },
    {
      page: "revenue",
      data: revenueQuery.data || {},
      icon: <AiFillBank color="#efefef" />
    },
  ];

  return (
    <AdminLayout>
      <div className="ml-2 w-full h-full flex flex-col col-span-7 overflow-hidden">
        <div className="grid grid-cols-4 gap-8">
          {widgetData.map(({ page, data, icon }) => (
            <Widget
              key={page}
              page={page}
              data={data}
              icon={icon}
            />
          ))}
        </div>
        <div className="mt-28 grid grid-cols-7 gap-16">
          <BigWidget
            listing={mostReservedQuery.data || {}}
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </AdminLayout>
  );
}
