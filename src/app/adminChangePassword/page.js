"use client"
import { useState } from "react";
import AdminChangePasswordView from "./adminChangePasswordView";
import withAuth from "../utils/withAuth";

const superadminDetails = () => {

  return (
    <>
        <AdminChangePasswordView/>
    </>
  );

}

export default withAuth(superadminDetails, [3]);
