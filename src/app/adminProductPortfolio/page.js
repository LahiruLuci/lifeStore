'use client'
import ProductPortfolio from './productPortfolioView';
import withAuth from "../utils/withAuth";


const adminProductPortfolio = () => { 

  return (

      <ProductPortfolio />

  );

}

export default withAuth(adminProductPortfolio, [2,4]);
