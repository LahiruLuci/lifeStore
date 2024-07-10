"use client"
import ProductList from './productListView';
import withAuth from "../utils/withAuth";

const customerProductList = () => { 

  return (
    <ProductList />
  );

}

export default withAuth(customerProductList,[1]);
