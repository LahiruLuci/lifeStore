"use client"
import ProductList from './productListView';
import withAuth from "../utils/withAuth";


const adminProductList = () => { 

  return (
    <ProductList />
  );

}

export default withAuth(adminProductList,[2]);
