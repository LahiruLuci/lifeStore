// import React, { useEffect, useState } from 'react';
import Login from './views/loginView';
import { Suspense } from 'react'

export default function Home() {

  return (
    <>
      <Suspense>
        <Login />
      </Suspense>
    </>
  );
}