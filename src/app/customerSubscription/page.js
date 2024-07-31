/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import CustomerSubscription from "./customerSubscriptionView";
import withAuth from "../utils/withAuth";


const customerSubscription = () => {

  return (
    <>
      <div id="customerSubscriptionTable">
        <CustomerSubscription />
      </div>
    </>
  );

}

export default withAuth(customerSubscription,[1]);
