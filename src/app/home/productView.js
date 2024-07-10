/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useCallback } from 'react';


export async function getProductsProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/routes/homeProducts`);
    const products = await res.json();

    return {
        props: {
            products: products || [],
        },
    };
}

const Products = ({ products, onProductClick }) => {
    if (!products || !Array.isArray(products) || products.length === 0) {
        return <p>No products available</p>;
    } else {

        return (
            <>
                {products.map((product) => (
                    <div className="col-lg-4 col-12 p-3" key={product.PRODUCTID}>
                        <div className=" col-12 bg-white rounded-3">
                            <div className="col-12 p-2">
                                <div className="row justify-content-center text-center">
                                    <div className="col-12">
                                        <div className="row align-content-center justify-content-center ">
                                            <Image src={product.IMAGELOCATION} alt="No picture" className=" container-fluid" width={400} height={400} />
                                        </div>
                                    </div>
                                    <div className="col-12" style={{height:"75px"}}>
                                        <span className="homeProductTopic">
                                            {product.PRODUCTNAME}
                                        </span>
                                    </div>
                                    <div className="col-12 mb-2">
                                        <span className="homeProductSubTopic">
                                            {product.PRODUCTTITLE}
                                        </span>
                                    </div>
                                    <div className="col-12 mb-2">
                                        <span className="homeProductPrice">
                                            LKR {product.AMOUNT}
                                        </span>
                                    </div>
                                    <div className="col-12">
                                        <div className="row justify-content-center">
                                            <div className="col-6 homeProductBtn">
                                                <Link href="/customerProductList" className='no-underline'>
                                                    <span className="homeProductBtn">
                                                        See more
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    }

};

Products.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            PRODUCTID: PropTypes.number.isRequired,
            PRODUCTTITLE: PropTypes.string.isRequired,
            PRODUCTNAME: PropTypes.string.isRequired,
            PREDESCRIPTION: PropTypes.string.isRequired,
            PRODUCTFEATURES: PropTypes.string.isRequired,
            AMOUNT: PropTypes.string.isRequired,
            PERIOD: PropTypes.string.isRequired
        })
    ).isRequired,
    onProductClick: PropTypes.func.isRequired,
};

export default Products;
