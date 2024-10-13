import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex w-full">
      <DashboardSidebar />
      <div className="w-full bg-slate-100 px-2">
        <DashboardHeader />
        <DashboardSummary />
        <div className="mt-2 p-2 rounded mb-3">{children}</div>
      </div>
    </main>
  );
};

export default layout;