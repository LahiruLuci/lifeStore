/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import AdminSubscription from "./adminSubscriptionView";
import withAuth from "../utils/withAuth";

const adminSubscription = () => {

  return (
    <>
      <div id="adminSubscriptionTable">
        <AdminSubscription />
      </div>
    </>
  );

}

export default withAuth(adminSubscription,[4]);
