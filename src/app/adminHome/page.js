// import React, { useEffect, useState } from 'react';
"use client"
import HomeView from './homeView';
import HomeProductDescriptionView from "./homeProductDescriptionView";
import withAuth from "../utils/withAuth";

const adminHome = () => {

  return (
    <>
      <div id="adminHomeId">
        <HomeView />
      </div>
      <div id="adminProductDescriptionHomeId" className='d-none'>
        <HomeProductDescriptionView />
      </div>
    </>
  );

}

export default withAuth(adminHome,[2,4]);