import React from 'react';
import DashboardSidebarMenu from './DashboardSidebarMenu';

export default function DashboardSidebar() {
  return (
    <main className="hidden md:flex h-screen">
      <DashboardSidebarMenu />
    </main>
  )
}
