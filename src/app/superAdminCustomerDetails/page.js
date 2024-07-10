"use client"
import { useState } from "react";
import CustomerDetailsView from "./customerDetailsView";
import withAuth from "../utils/withAuth";

const superAdminCustomerDetails = () => {

  return (
    <>
        <CustomerDetailsView/>
    </>
  );

}

export default withAuth(superAdminCustomerDetails,[3]);
