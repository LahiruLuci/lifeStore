// import React, { useEffect, useState } from 'react';
"use client"
import Search from '../components/Search';
import Dashboard from "./dashboardView";
import withAuth from "../utils/withAuth";

const superAdminDashboard = () => {
  
  return (
    <>
      <Search />
      <Dashboard />
    </>
  );

}

export default withAuth(superAdminDashboard, [3]);