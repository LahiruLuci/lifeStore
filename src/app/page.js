// import React, { useEffect, useState } from 'react';
import Login from './views/loginView';
import AdminProductList from './adminProductList/page';
import { Suspense } from 'react'
import Header from './components/Header' 
import Footer from './components/Footer';

export default function Home() {

  return (
    <>
      <Suspense>
        {/* <Login /> */}
        <Header/>
        <AdminProductList />
        <Footer/>
      </Suspense>
    </>
  );
}