'use client'
import ProductPortfolio from './productPortfolioView';
import withAuth from "../utils/withAuth";

const customerProductPortfolio = () => { 

  return (

      <ProductPortfolio />

  );

}

export default withAuth(customerProductPortfolio, [1]);
