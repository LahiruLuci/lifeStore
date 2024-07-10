/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useState } from "react";
import CustomerSubscription from "./customerSubscriptionView";
import withAuth from "../utils/withAuth";


const customerSubscription = () => {

  const [sltbbid, setSltbbid] = useState('');

  const handleSearch = (sltbbid) => {
    setSltbbid(sltbbid);
  };

  return (
    <>
      <div id="customerSubscriptionTable">
        <CustomerSubscription />
      </div>
    </>
  );

}

export default withAuth(customerSubscription,[1]);
