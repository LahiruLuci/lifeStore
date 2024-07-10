'use client'
import ProductPortfolio from './productPortfolioView';
import withAuth from "../utils/withAuth";

const superAdminProductPortfolio = () => { 

  return (

      <ProductPortfolio />

  );

}

export default withAuth(superAdminProductPortfolio,[3]);
