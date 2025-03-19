'use client'
import withAuth from "../utils/withAuth";
import AdminView from "./adminView";


const Admin = () => { 

  return (

    <AdminView/>

  );

}

export default withAuth(Admin, [3]);
