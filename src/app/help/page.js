'use client'
import HelpView from './helpView';
import withAuth from "../utils/withAuth";

const customerProductPortfolio = () => { 

  return (

      <HelpView />

  );

}

export default withAuth(customerProductPortfolio, [1,2]);
