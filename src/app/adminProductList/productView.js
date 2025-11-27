// /* eslint-disable react-hooks/rules-of-hooks */
// "use client"
// import Image from 'next/image';
// import PropTypes from 'prop-types';
// import { useCallback } from 'react';

// const Products = ({ products, onProductClick }) => {
//     if (!products || !Array.isArray(products) || products.length === 0) {
//         return <p>No products available</p>;
//     } else {

//         //feature identification
//         const hasFeature = (featuresString, feature) => {
//             const regex = new RegExp(`\\b${feature}\\b`, 'i');
//             return regex.test(featuresString);
//         };

//         const onSingleProductViewClick = useCallback((product) => {
//             AdminSingleProductView();
//             onProductClick(product);
//         }, [onProductClick]);


//         return (
//             <>
//                 {products.map((product) => (
//                     <div className="productCardView p-2" style={{ width: "18rem" }} key={product.PRODUCTID} onClick={() => onSingleProductViewClick(product)}>
//                         <div className="productCardViewHeader align-content-start">
//                             <div className="col-15">
//                                 <div className="row">
//                                     <div className="col-3 p-0">
//                                         <Image src={`${process.env.NEXT_PUBLIC_URL2 + product.IMAGELOCATION}`} alt="No picture" className="productBackground" width={600} height={600} />
//                                     </div>
//                                     <div className="col-9">
//                                         <div className="row">
//                                             <div className="col-12">
//                                                 <div className="row">
//                                                     <div className="col-12 p-0" style={{ height: "50px" }}>
//                                                         <span className="title07" style={{ wordBreak: "break-word", whiteSpace: "normal", maxWidth: "18rem" }}>{product.PRODUCTNAME}</span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-3">
//                                                 <div className="row">
//                                                     <div className="logoSM"></div><br />
//                                                 </div>
//                                             </div>
//                                             <div className="col-12">
//                                                 <div className="row">
//                                                     <span className="title08 p-0">{product.PRODUCTTITLE}</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="productCardViewBody">
//                             <div className="col-12">
//                                 <div className="row">
//                                     <span className="productCardViewTitle" style={{ wordBreak: "break-word", whiteSpace: "normal", maxWidth: "18rem" }}>{product.PREDESCRIPTION}</span>
//                                 </div>
//                             </div>
//                             <div className="productCardViewText">
//                                 <div className="col-12 p-3">
//                                     <div className="row scroll-bar">
//                                         <div className="scroll-inner">
//                                             {hasFeature(product.PRODUCTFEATURES, 'Security') && (
//                                                 <div>
//                                                     <i className="bi bi-shield-shaded"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Security</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Performance') && (
//                                                 <div>
//                                                     <i className="bi bi-speedometer2"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Performance</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Simplicity') && (
//                                                 <div>
//                                                     <i className="bi bi-emoji-smile-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Simplicity</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Pc, mac & mobile') && (
//                                                 <div>
//                                                     <i className="bi bi-laptop"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Pc, mac & mobile</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Privacy') && (
//                                                 <div>
//                                                     <i className="bi bi-person-rolodex"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Privacy</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Money') && (
//                                                 <div>
//                                                     <i className="bi bi-cash-stack"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Money</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Safe kids') && (
//                                                 <div>
//                                                     <i className="bi bi-people-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Safe kids</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Passwords') && (
//                                                 <div>
//                                                     <i className="bi bi-key-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Passwords</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'File protection') && (
//                                                 <div>
//                                                     <i className="bi bi-file-earmark"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">File protection</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Manual Scan') && (
//                                                 <div>
//                                                     <i className="bi bi-search"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Manual Scan</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Android Wear') && (
//                                                 <div>
//                                                     <i className="bi bi-gear-wide"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Android Wear</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Automatic Scan') && (
//                                                 <div>
//                                                     <i className="bi bi-zoom-in"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Automatic Scan</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Anti-Phishing') && (
//                                                 <div>
//                                                     <i className="bi bi-person-x"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Anti-Phishing</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Confidentiality') && (
//                                                 <div>
//                                                     <i className="bi bi-lock-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Confidentiality</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Online Content Filter') && (
//                                                 <div>
//                                                     <i className="bi bi-globe"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Online Content Filter</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Safe Search in YOUTUBE') && (
//                                                 <div>
//                                                     <i className="bi bi-search-heart"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Safe Search in YOUTUBE</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Apps usage Control') && (
//                                                 <div>
//                                                     <i className="bi bi-file-lock2"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Apps usage Control</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Screen Time Management') && (
//                                                 <div>
//                                                     <i className="bi bi-clock-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Screen Time Management</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Screen Time Scheduling') && (
//                                                 <div>
//                                                     <i className="bi bi-clock-history"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Screen Time Scheduling</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Child Locator') && (
//                                                 <div>
//                                                     <i className="bi bi-geo-alt-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Child Locator</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Battery Tracker') && (
//                                                 <div>
//                                                     <i className="bi bi-battery-half"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Battery Tracker</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Social Network Monitoring') && (
//                                                 <div>
//                                                     <i className="bi bi-gear-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Social Network Monitoring</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'YOUTUBE Search History') && (
//                                                 <div>
//                                                     <i className="bi bi-binoculars-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">YOUTUBE Search History</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Real-time alerts') && (
//                                                 <div>
//                                                     <i className="bi bi-exclamation-triangle-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Real - Time Alerts</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Parental control') && (
//                                                 <div>
//                                                     <i class="bi bi-hearts"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Parental control</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Identity') && (
//                                                 <div>
//                                                     <i class="bi bi-person-bounding-box"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Identity</span>
//                                                 </div>
//                                             )}
//                                             {hasFeature(product.PRODUCTFEATURES, 'Premium support') && (
//                                                 <div>
//                                                     <i class="bi bi-stars"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                     <span className="productCardViewText">Premium support</span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="productCardViewFooter">
//                             <div className="col-12 align-items-center justify-content-center">
//                                 <div className="row text-center">
//                                     <div className="col-12 mb-2">
//                                         <span className="title09">Version for</span>
//                                     </div>
//                                     <div className="col-12 mb-2">
//                                         <div className="row">
//                                             <div className="offset-4 col-4"><i className="bi bi-apple"></i>&nbsp;&nbsp;<i
//                                                 className="bi bi-windows"></i>&nbsp;&nbsp;<i className="bi bi-phone-fill"></i></div>
//                                         </div>
//                                     </div>
//                                     <div className="container mt-2">
//                                         <div className="tax-disclaimer text-center mt-0 mb-1">
//                                             <div style={{
//                                                 fontSize: '0.7rem',
//                                                 fontStyle: 'italic',
//                                                 color: '#6c757d',
//                                                 fontWeight: '500'
//                                             }}>
//                                                 <i className="bi bi-info-circle me-1"></i>
//                                                 All prices are inclusive of taxes
//                                             </div>
//                                         </div>
//                                         <button className="col-12 btn4 p-2" onClick={() => onSingleProductViewClick(product)} ><span className="title10">ANNUAL PLAN - LKR
//                                             &nbsp;{product.AMOUNT}</span>
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </>
//         );
//     }

// };

// Products.propTypes = {
//     products: PropTypes.arrayOf(
//         PropTypes.shape({
//             PRODUCTID: PropTypes.number.isRequired,
//             PRODUCTTITLE: PropTypes.string.isRequired,
//             PRODUCTNAME: PropTypes.string.isRequired,
//             PREDESCRIPTION: PropTypes.string.isRequired,
//             PRODUCTFEATURES: PropTypes.string.isRequired,
//             AMOUNT: PropTypes.string.isRequired,
//             PERIOD: PropTypes.string.isRequired
//         })
//     ).isRequired,
//     onProductClick: PropTypes.func.isRequired,
// };

// export default Products;


//2025/11/27 update


/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const Products = ({ products, onProductClick }) => {
    if (!products || !Array.isArray(products) || products.length === 0) {
        return <p>No products available</p>;
    } else {

        //feature identification
        const hasFeature = (featuresString, feature) => {
            const regex = new RegExp(`\\b${feature}\\b`, 'i');
            return regex.test(featuresString);
        };

        const onSingleProductViewClick = useCallback((product) => {
            AdminSingleProductView();
            onProductClick(product);
        }, [onProductClick]);


        return (
            <>
                {products.map((product) => (
                    <div className="productCardView p-2" style={{ width: "18rem" }} key={product.PRODUCTID} onClick={() => onSingleProductViewClick(product)}>
                        <div className="productCardViewHeader align-content-start">
                            <div className="col-15">
                                <div className="row">
                                    <div className="col-3 p-0">
                                        <Image src={`${process.env.NEXT_PUBLIC_URL2 + product.IMAGELOCATION}`} alt="No picture" className="productBackground" width={600} height={600} />
                                    </div>
                                    <div className="col-9">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-12 p-0" style={{ height: "50px" }}>
                                                        <span className="title07" style={{ wordBreak: "break-word", whiteSpace: "normal", maxWidth: "18rem" }}>{product.PRODUCTNAME}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="row">
                                                    <div className="logoSM"></div><br />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* 🔹 CENTERED SUITE NAME HERE */}
                                <div className="productCategoryCenter">
                                    {product.PRODUCTTITLE}
                                </div>
                            </div>
                        </div>
                        <div className="productCardViewBody">
                            <div className="col-12">
                                <div className="row">
                                    <span className="productCardViewTitle" style={{ wordBreak: "break-word", whiteSpace: "normal", maxWidth: "18rem" }}>{product.PREDESCRIPTION}</span>
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
                                                    <i className="bi bi-shield-lock-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Parental control</span>
                                                </div>
                                            )}

                                            {hasFeature(product.PRODUCTFEATURES, 'Identity') && (
                                                <div>
                                                    <i className="bi bi-person-badge-fill"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="productCardViewText">Identity</span>
                                                </div>
                                            )}

                                            {hasFeature(product.PRODUCTFEATURES, 'Premium support') && (
                                                <div>
                                                    <i className="bi bi-headset"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                                                className="bi bi-windows"></i>&nbsp;&nbsp;<i className="bi bi-phone-fill"></i></div>
                                        </div>
                                    </div>
                                    <div className="container mt-2">
                                        <div className="tax-disclaimer text-center mt-0 mb-1">
                                            <div style={{
                                                fontSize: '0.7rem',
                                                fontStyle: 'italic',
                                                color: '#6c757d',
                                                fontWeight: '500'
                                            }}>
                                                <i className="bi bi-info-circle me-1"></i>
                                                All prices are inclusive of taxes
                                            </div>
                                        </div>
                                        <button className="col-12 btn4 p-2" onClick={() => onSingleProductViewClick(product)} ><span className="title10">ANNUAL PLAN - LKR
                                            &nbsp;{product.AMOUNT}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <style jsx>{`
/* -----------------------------
    CARD WRAPPER
------------------------------*/
.productCardView {
  background: #ffffff;
  border-radius: 14px;
  padding: 0;
  margin: 15px;
  cursor: pointer;
  transition: all 0.25s ease;
  border: 1px solid #e6e6e6;
  box-shadow: 0 4px 6px rgba(0,0,0,0.08);
}

.productCardView:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

/* -----------------------------
    CARD HEADER
------------------------------*/
.productCardViewHeader {
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.productBackground {
  border-radius: 10px;
  object-fit: cover;
}

/* Titles */
.title07 {
  font-weight: 700;
  font-size: 18px;
  color: #003366;
}

.title08 {
  font-weight: 500;
  font-size: 14px;
  color: #666;
}

.productCategoryCenter {
    text-align: center;
    margin-top: 6px;
    font-size: 15px;
    font-weight: 700;
    color: #005baa;          /* nice SLT/Kaspersky style blue */
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* -----------------------------
    CARD BODY
------------------------------*/
.productCardViewBody {
  padding: 10px;
}

.productCardViewTitle {
  font-size: 14px;
  font-weight: 500;
  color: #444;
  display: block;
  margin-bottom: 6px;
}

/* Features scroll area */
.scroll-bar {
  max-height: 120px;
  overflow-y: auto;
  padding-right: 6px;
}

.scroll-bar::-webkit-scrollbar {
  width: 6px;
}

.scroll-bar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.scroll-bar::-webkit-scrollbar-thumb {
  background: #cccccc;
  border-radius: 4px;
}

.scroll-inner div {
  padding: 6px 0;
  display: flex;
  align-items: center;
  color: #333;
  font-size: 14px;
}

.scroll-inner i {
  font-size: 16px;
  color: #2b7cc0;
}

/* -----------------------------
    CARD FOOTER
------------------------------*/
.productCardViewFooter {
  padding: 15px;
  border-top: 1px solid #f0f0f0;
  text-align: center;
  background: #fafafa;
}

.title09 {
  font-weight: 600;
  font-size: 15px;
  color: #003366;
}

/* Icons row */
.productCardViewFooter i {
  font-size: 20px;
  color: #003366;
}

/* -----------------------------
    BUTTON STYLING
------------------------------*/
.btn4 {
  background: linear-gradient(135deg, #009639, #007a2d);
  color: white;
  border: none;
  width: 100%;
  font-weight: 700;
  font-size: 16px;
  border-radius: 10px;
  transition: 0.3s ease;
}

.btn4:hover {
  background: linear-gradient(135deg, #00b44a, #008a33);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,150,57,0.3);
}

.title10 {
  font-size: 15px;
  font-weight: 600;
}

/* For the Kaspersky mini logo area */
.logoSM {
  width: 40px;
  height: 40px;
  background-image: url('/kaspersky-icon.png'); /* Add your icon */
  background-size: cover;
}

`}</style>

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
