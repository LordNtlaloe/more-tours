"use client";
import React from 'react';
import AdminLayout from '../../layout/AdminLayout';
import { AiFillBank, AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { MdHotel } from 'react-icons/md';
import { useWidgetHook } from '../../hooks/widget-hook';
import Widget from '../../components/Widget';
import BigWidget from '../../components/BigWidget';
import Chart from '../../components/Chart/page';
import ChartOne from '../../components/Chart/ChartOne';
import ChartThree from '../../components/Chart/ChartThree';
import ChartTwo from '../../components/Chart/ChartTwo';

const Dashboard = () => {
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
      data: usersQuery.data || {}, // Fallback to an empty object if data is undefined
      icon: <AiOutlineUser color="#efefef" />
    },
    {
      page: "listings",
      data: listingsQuery.data || {}, // Same here
      icon: <MdHotel color="#efefef" />
    },
    {
      page: "reservations",
      data: reservationsQuery.data || {}, // Same here
      icon: <AiOutlineHome color="#efefef" />
    },
    {
      page: "revenue",
      data: revenueQuery.data || {}, // Same here
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
            listing={mostReservedQuery.data || {}} // Same here
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

export default Dashboard;
