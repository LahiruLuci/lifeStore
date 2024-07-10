"use client"
import ProductPortfolioItems1 from './productPortfolioItems1';
import ProductPortfolioItems2 from './productPortfolioItems2';
import ProductPortfolioItems3 from './productPortfolioItems3';

export default function ProductPortfolio() {
    return (
        <>
            <div className="col-12 p-3 bg-white">
                <h1>
                    <span className="title06">COMPARE PRODUCTS</span>
                </h1>
            </div>
            <div className="container-fluid align-content-center justify-content-between">
                <div className="col-12">
                    <div className="row p-3 justify-content-center">
                        <div className="col-12">
                            <div className="row">
                                <ProductPortfolioItems1 />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-12">
                    <div className="row p-3 justify-content-center">
                        <div className="col-12">
                            <div className="row">
                                <ProductPortfolioItems2 />
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="col-12">
                    <div className="row p-3 justify-content-center">
                        <div className="col-12">
                            <div className="row">
                                <ProductPortfolioItems3 />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
