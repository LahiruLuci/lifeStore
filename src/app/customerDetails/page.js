"use client"
import { useState } from "react";
import CustomerDetailsView from "./customerDetailsView";
import withAuth from "../utils/withAuth";

const customerDetails = () => {

  return (
    <>
        <CustomerDetailsView/>
    </>
  );

}

export default withAuth(customerDetails, [1,2]);
