"use client"
import ProductList from './productListView';
import withAuth from "../utils/withAuth";

const superAdminProductList = () => { 

  return (
    <ProductList />
  );

}

export default withAuth(superAdminProductList, [3]);
