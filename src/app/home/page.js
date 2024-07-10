// import React, { useEffect, useState } from 'react';
"use client"
import HomeView from './homeView';
import HomeProductDescriptionView from "./homeProductDescriptionView";
import withAuth from "../utils/withAuth";

const customerHome = () => {

  return (
    <>
      <div id="customerHomeId">
        <HomeView />
      </div>
      <div id="customerProductDescriptionHomeId" className='d-none'>
        <HomeProductDescriptionView />
      </div>
    </>
  );
}

export default withAuth(customerHome,[1]);