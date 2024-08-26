/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const Products = ({ products, onProductClick }) => {
    if (!products || !Array.isArray(products) || products.length === 0) {
        return <p>No products available</p>;
    } else {
        const hasFeature = (featuresString, feature) => {
            const regex = new RegExp(`\\b${feature}\\b`, 'i');
            return regex.test(featuresString);
        };

        const onSingleProductViewClick = useCallback((product) => {
            CustomerSingleProductView();
            onProductClick(product);
        }, [onProductClick]);


        return (
            <>
                {products.map((product) => (
                    <div className="productCardView p-2" style={{ width: "18rem" }} key={product.PRODUCTID} onClick={() => onSingleProductViewClick(product)} >
                        <div className="productCardViewHeader align-content-start">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-3 p-0">
                                        <Image src={`${process.env.NEXT_PUBLIC_URL2 + product.IMAGELOCATION}`} alt="No picture" className="productBackground" width={300} height={300} />
                                    </div>
                                    <div className="col-9">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-12 p-0" style={{height:"50px"}}>
                                                        <span className="title07" style={{wordBreak:"break-word",whiteSpace:"normal",maxWidth:"18rem"}}>{product.PRODUCTNAME}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="row">
                                                    <div className="logoSM"></div><br />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="row">
                                                    <span className="title08 p-0">{product.PRODUCTTITLE}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="productCardViewBody">
                            <div className="col-12">
                                <div className="row">
                                    <span className="productCardViewTitle" style={{wordBreak:"break-word",whiteSpace:"normal",maxWidth:"18rem"}}>{product.PREDESCRIPTION}</span>
                                </div>
                            </div>
                            <div className="productCardViewText">
                                <div className="col-12 p-3">
                                    <div className="row scroll-bar">
                                        <div className="scroll-inner">
                                            {hasFeature(product.PRODUCTFEATURES, 'Security') && (
                                                <div>
                                                    <i className="bi bi-shield-shaded"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Security</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Performance') && (
                                                <div>
                                                    <i className="bi bi-speedometer2"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Performance</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Simplicity') && (
                                                <div>
                                                    <i className="bi bi-emoji-smile-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Simplicity</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Pc, mac & mobile') && (
                                                <div>
                                                    <i className="bi bi-laptop"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Pc, mac & mobile</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Privacy') && (
                                                <div>
                                                    <i className="bi bi-person-rolodex"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Privacy</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Money') && (
                                                <div>
                                                    <i className="bi bi-cash-stack"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Money</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Safe kids') && (
                                                <div>
                                                    <i className="bi bi-people-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Safe kids</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Passwords') && (
                                                <div>
                                                    <i className="bi bi-key-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Passwords</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'File protection') && (
                                                <div>
                                                    <i className="bi bi-file-earmark"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">File protection</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Manual Scan') && (
                                                <div>
                                                    <i className="bi bi-search"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Manual Scan</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Android Wear') && (
                                                <div>
                                                    <i className="bi bi-gear-wide"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Android Wear</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Automatic Scan') && (
                                                <div>
                                                    <i className="bi bi-zoom-in"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Automatic Scan</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Anti-Phishing') && (
                                                <div>
                                                    <i className="bi bi-person-x"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Anti-Phishing</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Confidentiality') && (
                                                <div>
                                                    <i className="bi bi-lock-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Confidentiality</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Online Content Filter') && (
                                                <div>
                                                    <i className="bi bi-globe"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Online Content Filter</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Safe Search in YOUTUBE') && (
                                                <div>
                                                    <i className="bi bi-search-heart"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Safe Search in YOUTUBE</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Apps usage Control') && (
                                                <div>
                                                    <i className="bi bi-file-lock2"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Apps usage Control</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Screen Time Management') && (
                                                <div>
                                                    <i className="bi bi-clock-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Screen Time Management</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Screen Time Scheduling') && (
                                                <div>
                                                    <i className="bi bi-clock-history"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Screen Time Scheduling</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Child Locator') && (
                                                <div>
                                                    <i className="bi bi-geo-alt-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Child Locator</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Battery Tracker') && (
                                                <div>
                                                    <i className="bi bi-battery-half"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Battery Tracker</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Social Network Monitoring') && (
                                                <div>
                                                    <i className="bi bi-gear-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Social Network Monitoring</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'YOUTUBE Search History') && (
                                                <div>
                                                    <i className="bi bi-binoculars-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">YOUTUBE Search History</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Real-time alerts') && (
                                                <div>
                                                    <i className="bi bi-exclamation-triangle-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Real - Time Alerts</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Parental control') && (
                                                <div>
                                                    <i class="bi bi-hearts"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Parental control</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Identity') && (
                                                <div>
                                                    <i class="bi bi-person-bounding-box"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Identity</span>
                                                </div>
                                            )}
                                            {hasFeature(product.PRODUCTFEATURES, 'Premium support') && (
                                                <div>
                                                    <i class="bi bi-stars"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Premium support</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="productCardViewFooter">
                            <div className="col-12 align-items-center justify-content-center">
                                <div className="row text-center">
                                    <div className="col-12 mb-2">
                                        <span className="title09">Version for</span>
                                    </div>
                                    <div className="col-12 mb-2">
                                        <div className="row">
                                            <div className="offset-4 col-4"><i className="bi bi-apple"></i>&nbsp;&nbsp;<i
                                                className="bi bi-windows"></i></div>
                                        </div>
                                    </div>
                                    <div className="container mt-2">
                                        <button className="col-12 btn4 p-2" onClick={() => onSingleProductViewClick(product)} ><span className="title10">MONTHLY PLAN - LKR
                                            &nbsp;{product.AMOUNT}</span>
                                        </button>
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
            PRODUCTCODE: PropTypes.string.isRequired,
            PREDESCRIPTION: PropTypes.string.isRequired,
            PRODUCTFEATURES: PropTypes.string.isRequired,
            AMOUNT: PropTypes.string.isRequired,
            PERIOD: PropTypes.string.isRequired
        })
    ).isRequired,
    onProductClick: PropTypes.func.isRequired,
};

export default Products;
