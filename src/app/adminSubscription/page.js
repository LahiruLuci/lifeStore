/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useState } from "react";
import AdminSubscription from "./adminSubscriptionView";
import withAuth from "../utils/withAuth";

const adminSubscription = () => {

  const [sltbbid, setSltbbid] = useState('');

  const handleSearch = (sltbbid) => {
    setSltbbid(sltbbid);
  };

  return (
    <>
      <div id="adminSubscriptionTable">
        <AdminSubscription />
      </div>
    </>
  );

}

export default withAuth(adminSubscription,[2]);
