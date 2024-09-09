"use client"
import OutSourceProduct from './outSourceProductView';
import withAuth from "../utils/withAuth";


const outSourceProduct = () => { 

  return (
    <OutSourceProduct />
  );

}

export default withAuth(outSourceProduct,[3]);
