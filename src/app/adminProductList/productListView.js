// "use client"
// import { useEffect, useState } from "react";
// import Product from "./productView";
// import Image from "next/image";
// import WarningMessageModal from "../mod/WarningMessageModal";
// import SuccessMessageModal from "../mod/SuccessMessageModal";

// export async function getProductsProps() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_URL11}`);
//   const products = await res.json();

//   return {
//     props: {
//       products: products || [],
//     },
//   };
// }

// export default function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [productId, setProductId] = useState('');
//   const [productName, setProductName] = useState('');
//   const [productCode, setProductCode] = useState('');
//   const [user, setUser] = useState('');
//   const [productTitle, setProductTitle] = useState('');
//   const [productImageLocation, setProductImageLocation] = useState('/productImages/addproduct.png');
//   const [descriptionTitle, setDescriptionTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [mainProductFeatures, setMainProductFeatures] = useState('');
//   const [amount, setAmount] = useState('');
//   const [email, setEmail] = useState('');
//   const [licensekey, setLicensekey] = useState('');
//   let warningMessageModal;
//   let successMessageModal;
//   let successMessageModal2;

//   //load products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const result = await getProductsProps();
//         setProducts(result.props.products);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   //setup the products details in admin view
//   const handleProductClick = async (product) => {
//     setUser(localStorage.getItem('customer_id'));
//     setEmail(localStorage.getItem('user_email'));
//     setSelectedProduct(product);
//     setProductId(product.PRODUCTID);
//     setProductName(product.PRODUCTNAME);
//     setProductCode(product.PRODUCTCODE);
//     setProductTitle(product.PRODUCTTITLE);
//     setDescriptionTitle(product.DESCRIPTIONTITLE);
//     setDescription(product.DESCRIPTION);
//     setMainProductFeatures(product.MAINPRODUCTFEATURES);
//     setAmount(product.AMOUNT);
//     setProductImageLocation(product.IMAGELOCATION);

//   };

//   //go back to productList view in admin view
//   const productListHome = () => {
//     const productListViewId = document.getElementById("productListViewId");
//     const singleAdminProductViewId = document.getElementById("singleAdminProductViewId");
//     productListViewId.classList.remove("d-none");
//     singleAdminProductViewId.classList.add("d-none");
//   }

//   //product buying process
//   const handleBuyNowClick = async () => {

//     const warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
//     const warning_message_modal = document.getElementById("warning_message_modal");
//     const successMsgDescriptionHead2 = document.getElementById("successMsgDescriptionHead2");
//     const successMsgDescriptionHead22 = document.getElementById("successMsgDescriptionHead22");
//     const success_message_modal2 = document.getElementById("success_message_modal2");
//     const email = localStorage.getItem("user_email");
//     const admin_id = localStorage.getItem("admin_id");
//     const user = localStorage.getItem("customer_id");

//     const payload = {
//       productCode: Number(productCode),
//       email,
//       amount: Number(amount),
//     };

//     // try {

//     //   const jwt = localStorage.getItem("customerToken");
//     //   const postData = await fetch(`${process.env.NEXT_PRIVATE_URL4}`, {
//     //     method: "POST",
//     //     headers: {
//     //       "Authorization": `Bearer ${jwt}`,
//     //       "Content-type": "application/json",
//     //       "Access-Control-Allow-Origin": "*"
//     //     },
//     //     body: JSON.stringify(payload),
//     //   });
//     //   const result = await postData.json();
//     //   if (result.success) {
//     //     const resultProps = result.response;
//     //     if (!resultProps.subscriptionId == null || !resultProps.subscriptionId == "") {

//     //       const subscriberId = resultProps.subscriptionId;
//     //       const licensekey = resultProps.key;

//     //       const payload2 = {
//     //         subscriberId,
//     //         admin_id,
//     //         user,
//     //         productId,
//     //         licensekey,
//     //         amount: Number(amount),
//     //       };

//     //       const postData2 = await fetch(`${process.env.NEXT_PUBLIC_URL9}`, {
//     //         method: "POST",
//     //         headers: {
//     //           "Content-type": "application/json",
//     //         },
//     //         body: JSON.stringify(payload2),
//     //       });
//     //       const result2 = await postData2.json();
//     //       if (result2.message == "Product Subscribed Successfully!") {
//     //         successMessageModal2 = new bootstrap.Modal(success_message_modal2);
//     //         successMsgDescriptionHead2.innerText = "Product Subscribed Successfully!";
//     //         successMsgDescriptionHead22.innerText = "The licensekey has been sent to your e-mail.";
//     //         success_message_modal2.addEventListener('hidden.bs.modal', () => {
//     //           window.location.href = '/adminSubscription';
//     //         });
//     //         successMessageModal2.show();
//     //       } else {
//     //         warningMessageModal = new bootstrap.Modal(warning_message_modal);
//     //         warningMsgDescriptionHead.innerText = "Subscription proccess Failed.";
//     //         warningMessageModal.show();
//     //       }

//     //     } else {
//     //       warningMessageModal = new bootstrap.Modal(warning_message_modal);
//     //       warningMsgDescriptionHead.innerText = "Invalid Subscription.";
//     //       warningMessageModal.show();
//     //     }
//     //   } else {
//     //     warningMessageModal = new bootstrap.Modal(warning_message_modal);
//     //     warningMsgDescriptionHead.innerText = result.error + " : "+result.reason;
//     //     warning_message_modal.addEventListener('hidden.bs.modal', () => {
//     //       window.location.href = '/adminProductList';
//     //     });
//     //     warningMessageModal.show();
//     //   }


//     // } catch (error) {
//     //   console.error('Error generating token:', error);
//     // }
//   };

//   //lifestore function to confirm email and payment
//   const emailConfirmation = async () => {
//     const first_name = document.getElementById("userFName").value;
//     const last_name = document.getElementById("userLName").value;
//     const phone = document.getElementById("userContactNumber").value;
//     const email = document.getElementById("userEmail").value;
//     const address = document.getElementById("address").value;
//     const city = document.getElementById("city").value;
//     const order_id = "ORDER_" + Date.now();
//     const items = productName;
//     const pCode = Number(productCode);
//     const currency = "LKR";
//     const fullName = first_name + " " + last_name;

//     let success_message_modal = document.getElementById("success_message_modal");
//     let successMsgDescriptionHead = document.getElementById("successMsgDescriptionHead");
//     let warning_message_modal = document.getElementById("warning_message_modal");
//     let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");




//     // Inside emailConfirmation function, after storing customer data:
//     if (first_name && last_name && phone && email && address && city && order_id && items && currency) {
//       const response = await fetch("../api/payhere", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           first_name,
//           last_name,
//           phone,
//           email,
//           address,
//           city,
//           order_id,
//           items,
//           currency,
//           amount,
//         }),
//       });

//       const html = await response.text();

//       // Open the PayHere payment form in a new window
//       const blob = new Blob([html], { type: "text/html" });
//       const url = URL.createObjectURL(blob);
//       const payhereWindow = window.open(url, "_blank");

//       // Store user details after opening PayHere window
//       try {
//         const storeResponse = await fetch("../api/store-customerData", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             order_id,
//             fullName,
//             phone,
//             email,
//             pCode,
//           })
//         });
//         console.log(storeResponse);

//         if (!storeResponse.ok) {
//           throw new Error('Failed to store order');
//         }

//         // Set up an interval to check payment status
//         const checkPaymentStatus = setInterval(async () => {
//           try {
//             const statusResponse = await fetch(`../api/get-customerData?orderId=${order_id}`);
//             const statusData = await statusResponse.json();

//             if (statusData.success && statusData.data) {
//               const customerData = statusData.data;
//               console.log(customerData);

//               // Check if payment status exists
//               if (customerData.PAYHERESTATUSCODE) {
//                 clearInterval(checkPaymentStatus); // Stop checking

//                 // Handle payment status
//                 if (customerData.PAYHERESTATUSCODE === 2) {
//                   console.log("Payment Successful!");

//                   try {
//                     // Ask server to generate & store the license in `subscription.LICENSEKEY`
//                     const genRes = await fetch("../api/generate-license", {
//                       method: "POST",
//                       headers: { "Content-Type": "application/json" },
//                       body: JSON.stringify({
//                         order_id,
//                         productCode: pCode,
//                         email,
//                       }),
//                     });

//                     const genJson = await genRes.json();

//                     if (!genRes.ok || !genJson.success) {
//                       console.error("License creation failed:", genJson);
//                       warningMessageModal = new bootstrap.Modal(warning_message_modal);
//                       warningMsgDescriptionHead.innerText =
//                         genJson?.error || "Failed to create license. Please contact support.";
//                       warningMessageModal.show();
//                       return;
//                     }

//                     const licensekey = genJson.licenseKey;
//                     setLicensekey(licensekey);

//                     // Show your existing success modal with the key
//                     successMessageModal2 = new bootstrap.Modal(success_message_modal2);
//                     successMsgDescriptionHead2.innerText = "Product Subscribed Successfully!";
//                     successMsgDescriptionHead22.innerText = `Your License Key: ${licensekey}`;
//                     success_message_modal2.addEventListener("hidden.bs.modal", () => {
//                       window.location.href = "/adminSubscription";
//                     });
//                     successMessageModal2.show();
//                   } catch (e) {
//                     console.error("Error creating license:", e);
//                     warningMessageModal = new bootstrap.Modal(warning_message_modal);
//                     warningMsgDescriptionHead.innerText =
//                       "Unexpected error creating license. Please try again.";
//                     warningMessageModal.show();
//                   }
//                 }
//               }
//             }
//           } catch (error) {
//             console.error('Error checking payment status:', error);
//           }
//         }, 5000); // Check every 5 seconds

//         // Stop checking after 5 minutes (300000 ms) to prevent infinite checking
//         setTimeout(() => {
//           clearInterval(checkPaymentStatus);
//         }, 300000);

//       } catch (error) {
//         console.error("Error storing order:", error);
//         warningMessageModal = new bootstrap.Modal(warning_message_modal);
//         warningMsgDescriptionHead.innerText = "Error storing order details.";
//         warningMessageModal.show();
//       }

//       setTimeout(() => URL.revokeObjectURL(url), 5000);

//     } else {
//       warningMessageModal = new bootstrap.Modal(warning_message_modal);
//       warningMsgDescriptionHead.innerText = "Fill all the informations.";
//       warningMessageModal.show();
//     }

//     // if (phone && email) {
//     //   try {
//     //     const payload = {
//     //       subscriberId: phone,
//     //       adminId: email,
//     //     };

//     //     const response = await fetch(`${process.env.NEXT_PRIVATE_URL3}`, {
//     //       method: 'POST',
//     //       headers: {
//     //         "Content-type": "application/json",
//     //         "Access-Control-Allow-Origin": "*",
//     //         "X-Secret": `${process.env.X_SECRET}`,
//     //       },
//     //       body: JSON.stringify(payload),
//     //     });

//     //     const result = await response.json();
//     //     if (result.success && result.jwt) {
//     //       localStorage.setItem('user_token', result.jwt);
//     //       console.log("User jwt: ", result.jwt);
//     //       // successMessageModal = new bootstrap.Modal(success_message_modal);
//     //       // successMsgDescriptionHead.innerText = "User Token successfull!";
//     //       // successMessageModal.show();
//     //     } else {
//     //       warningMessageModal = new bootstrap.Modal(warning_message_modal);
//     //       warningMsgDescriptionHead.innerText = result.response;
//     //       warningMessageModal.show();
//     //     }
//     //   } catch (error) {
//     //     console.error('Error updating cutomer email:', error);
//     //   }
//     // } else {
//     //   warningMessageModal = new bootstrap.Modal(warning_message_modal);
//     //   warningMsgDescriptionHead.innerText = "Missing parameters!";
//     //   warning_message_modal.addEventListener('hidden.bs.modal', () => {
//     //     assveca.show();
//     //   });
//     //   warningMessageModal.show();
//     // }
//   };


//   //product buying confirmation process
//   // const handleBuyConfirmationClick = async () => {
//   //   let user = localStorage.getItem('customer_id');

//   //   try {

//   //     const payload = {
//   //       user,
//   //       productName,
//   //     };

//   //     const postData = await fetch(`${process.env.NEXT_PUBLIC_URL10}`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(payload),
//   //     });

//   //     const result = await postData.json();
//   //     if (result.message === "Product Count!") {
//   //       if (result.subscriptionsCount >= 1) {
//   //         SubscriptionsWarningSubscribeViewAsk(result.subscriptionsCount);
//   //       } else {
//   //         SubscriptionsSubscribeViewAsk();
//   //       }

//   //     } else {
//   //       SubscriptionsSubscribeViewAsk();
//   //     }

//   //   } catch (error) {
//   //     console.error('Error adding product:', error);
//   //   }
//   // }

//   // const hasFeature = (featuresString, feature) => {
//   //   const regex = new RegExp(`\\b${feature}\\b`, 'i');
//   //   return regex.test(featuresString);
//   // };

//   let aswva;
//   let productSubscribeWarningMessageModal;

//   //same user same product buying confirmation
//   // const SubscriptionsWarningSubscribeViewAsk = (x) => {
//   //   productSubscribeWarningMessageModal = document.getElementById("admin_product_subscribe_warning_message_modal");
//   //   const subscribeWarningMsgDescriptionHead = document.getElementById("adminSubscribeWarningMsgDescriptionHead");
//   //   if (x > 1) {
//   //     subscribeWarningMsgDescriptionHead.innerText = "You already subscribed this item " + x + " times.\nDo you want to subscribe it again ?";
//   //   } else {
//   //     subscribeWarningMsgDescriptionHead.innerText = "You already subscribed this item " + x + " time.\nDo you want to subscribe it again ?";
//   //   }
//   //   aswva = new bootstrap.Modal(productSubscribeWarningMessageModal);
//   //   aswva.show();
//   // }

//   let assva;
//   let productSubscribeSelectionMessageModal;

//   //buying confirmation
//   function SubscriptionsSubscribeViewAsk() {

//     productSubscribeSelectionMessageModal = document.getElementById("admin_product_subscribe_selection_message_modal");
//     const subscribeselectionMsgDescriptionHead = document.getElementById("adminSubscribeselectionMsgDescriptionHead");
//     subscribeselectionMsgDescriptionHead.innerText = "Do you want to subscribe this product ? ";
//     assva = new bootstrap.Modal(productSubscribeSelectionMessageModal);
//     assva.show();

//   }

//   let assvea;

//   //buying email confirmation
//   // function SubscriptionsSubscribeViewEmailAsk() {

//   //   if (email == null || email == '') {
//   //     SubscriptionsSubscribeViewEmailChangeAsk();
//   //   } else {
//   //     const productSubscribeEmailSelectionMessageModal = document.getElementById("admin_product_subscribe_email_selection_message_modal");
//   //     const subscribeEmailSelectionMsgDescriptionHead1 = document.getElementById("adminSubscribeEmailSelectionMsgDescriptionHead1");
//   //     const subscribeEmailSelectionMsgDescriptionHead2 = document.getElementById("adminSubscribeEmailSelectionMsgDescriptionHead2");
//   //     const subscribeEmailSelectionMsgDescriptionHead3 = document.getElementById("adminSubscribeEmailSelectionMsgDescriptionHead3");
//   //     subscribeEmailSelectionMsgDescriptionHead1.innerText = "Do you Wish to subscribe for";
//   //     subscribeEmailSelectionMsgDescriptionHead2.innerText = productName.toString();
//   //     subscribeEmailSelectionMsgDescriptionHead3.innerText = "With the following email address for \n User : " + user;
//   //     assvea = new bootstrap.Modal(productSubscribeEmailSelectionMessageModal);
//   //     assvea.show();
//   //   }

//   // }

//   let assveca;

//   //buying new email confirmation
//   function SubscriptionsSubscribeViewEmailChangeAsk() {

//     const productSubscribeEmailChangeMessageModal = document.getElementById("admin_product_subscribe_email_change_message_modal");
//     const subscribeEmailChangeMsgDescriptionHead1 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead1");
//     const subscribeEmailChangeMsgDescriptionHead2 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead2");
//     const subscribeEmailChangeMsgDescriptionHead3 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead3");
//     const subscribeEmailChangeMsgDescriptionHead4 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead4");
//     const subscribeEmailChangeMsgDescriptionHead5 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead5");
//     const subscribeEmailChangeMsgDescriptionHead6 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead6");
//     const subscribeEmailChangeMsgDescriptionHead7 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead7");
//     const subscribeEmailChangeMsgDescriptionHead8 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead8");
//     const subscribeEmailChangeMsgDescriptionHead9 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead9");
//     subscribeEmailChangeMsgDescriptionHead1.innerText = "Do you Wish to subscribe for";
//     subscribeEmailChangeMsgDescriptionHead2.innerText = productName.toString();
//     subscribeEmailChangeMsgDescriptionHead3.innerText = "First Name :";
//     subscribeEmailChangeMsgDescriptionHead4.innerText = "Last Name : ";
//     subscribeEmailChangeMsgDescriptionHead5.innerText = "Contact Number : ";
//     subscribeEmailChangeMsgDescriptionHead6.innerText = "Email : ";
//     subscribeEmailChangeMsgDescriptionHead7.innerText = "*The Kaspersky key will be send to this email.";
//     subscribeEmailChangeMsgDescriptionHead8.innerText = "City : ";
//     subscribeEmailChangeMsgDescriptionHead9.innerText = "Address : ";
//     assveca = new bootstrap.Modal(productSubscribeEmailChangeMessageModal);
//     assveca.show();

//   }


//   return (
//     <>
//       <div id="productListViewId">
//         <div className="col-12 text-center mt-3 mb-3">
//           <span className="title06">PRODUCT LIST</span>
//         </div>

//         <div className="container-fluid">
//           <div className="row justify-content-center">
//             <div className="col-10">
//               <div className="row justify-content-center p-3">
//                 <div className="horizontal-scroll-container">
//                   {loading ? <p>Loading...</p> : <Product products={products} onProductClick={handleProductClick} />}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div id="singleAdminProductViewId" className="d-none">
//         <div className="col-12">
//           <div className="col-12 mt-3 mb-3 p-3">
//             <span className="title21" onClick={productListHome}><i class="bi bi-arrow-bar-left"></i>&nbsp;Product List /</span><span className="title06"> PRODUCT DETAILS</span>
//           </div>

//           <div className="container align-items-center justify-content-center">
//             <div className="col-12 border-3 cardBoxView">
//               <div className="text-black row">
//                 <div className="col-lg-5 col-12 p-3">
//                   <div className="row">
//                     <div className="col-12 mb-3">
//                       <div className='row  justify-content-center align-content-center'>
//                         <Image src={`${process.env.NEXT_PUBLIC_URL2 + productImageLocation}`} alt="No picture" className="productImage container-fluid" width={1000} height={1000} />
//                       </div>
//                     </div>
//                     <span className="title18 text-start">ANNUAL PLAN</span><br />
//                     <span className="title14">LKR {amount}</span><br />
//                     <span className="title02 text-center">All prices are exclusive of taxes</span>
//                   </div>
//                 </div>
//                 <div className="col-lg-7 col-12 p-3">
//                   <div className="row">
//                     <div className="col-12">
//                       <div className="row">
//                         <div className="col-12">
//                           <span className="title15">{productName}</span><br /><br />
//                         </div>
//                       </div>
//                     </div>
//                     <span className="title16 text-start col-12">{descriptionTitle}</span><br /><br />
//                     <span className="title02 text-start col-11">{description}</span><br /><br />
//                     <div className="col-12 mb-3">
//                       <div className="row">
//                         {mainProductFeatures.split(' | ').map((feature, index) => (
//                           <div className="col-12 CardfeatureText" key={index}>
//                             <i className="bi bi-check fa-3x checkView"></i>&nbsp;&nbsp;&nbsp;&nbsp;<span className="title17">{feature}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                     <button className="col-lg-7 offset-lg-5 col-12 btn9 p-2" onClick={SubscriptionsSubscribeViewEmailChangeAsk}><span className="title10"></span>Buy Now</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* <div class="modal justify-content-center align-content-center" tabIndex="-1" id="admin_product_subscribe_selection_message_modal">
//         <div class="modal-dialog position-relative p-3" style={{ maxWidth: "450px" }}>
//           <div class="modal-content">
//             <div class="modal-header bg-success">
//               <h5 class="modal-title text01 w-100">
//                 <i class="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>INFORMATION !</span>
//               </h5>
//               <button type="button" class="btn-close bg-white" data-bs-dismiss="modal"
//                 aria-label="Close"></button>
//             </div>
//             <div class="modal-body">
//               <div class="row g-2">
//                 <div class="col-12">
//                   <h3 class="form-label text-center">
//                     <span class="text03" id="adminSubscribeselectionMsgDescriptionHead"></span><br />
//                   </h3><br /><br />
//                   <div className="col-12">
//                     <div className="row justify-content-center">
//                       <div class="col-4 p-3">
//                         <div class="row justify-content-center">
//                           <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={SubscriptionsSubscribeViewEmailAsk}>
//                             YES</button>
//                         </div>
//                       </div>
//                       <div class="col-4 p-3">
//                         <div class="row justify-content-center">
//                           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">NO</button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div> */}

//       <div className="modal justify-content-center align-content-center" tabIndex="-1" id="admin_product_subscribe_email_selection_message_modal">
//         <div className="modal-dialog position-relative p-3" style={{ maxWidth: "450px" }}>
//           <div className="modal-content">
//             <div className="modal-header bg-success">
//               <h5 className="modal-title text01 w-100">
//                 <i className="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>CONFIRMATION !</span>
//               </h5>
//               <button type="button" className="btn-close bg-white" data-bs-dismiss="modal"
//                 aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               <div className="row g-2">
//                 <div className="col-12">
//                   <h3 className="form-label text-center">
//                     <span className="text03" id="adminSubscribeEmailSelectionMsgDescriptionHead1"></span><br />
//                     <span className="text05" id="adminSubscribeEmailSelectionMsgDescriptionHead2"></span><br />
//                     <span className="text03" id="adminSubscribeEmailSelectionMsgDescriptionHead3"></span><br />

//                   </h3>
//                   <div className="col-12">
//                     <div className="row justify-content-center">
//                       <div className='col-12'>
//                         <div className='row p-3'>
//                           <input type="email" className="form-control text-center" id="subscribeEmail" value={email} />
//                         </div>
//                       </div>
//                       <div className="col-5 p-3">
//                         <div className="row justify-content-center">
//                           <button type="button" className="btn btn-secondary btncat" data-bs-dismiss="modal" onClick={SubscriptionsSubscribeViewEmailChangeAsk}>
//                             UPDATE EMAIL
//                           </button>
//                         </div>
//                       </div>
//                       <div className="col-5 p-3">
//                         <div className="row justify-content-center">
//                           <button type="button" className="btn btn-success btncat" data-bs-dismiss="modal" onClick={handleBuyNowClick}>CONFIRM</button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="modal justify-content-center align-content-center" tabIndex="-1" id="admin_product_subscribe_email_change_message_modal">
//         <div className="modal-dialog position-relative p-3" style={{ maxWidth: "650px" }}>
//           <div className="modal-content">
//             <div className="modal-header bg-success">
//               <h5 className="modal-title text01 w-100">
//                 <i className="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>CONFIRMATION !</span>
//               </h5>
//               <button type="button" className="btn-close bg-white" data-bs-dismiss="modal"
//                 aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               <div className="row g-2">
//                 <div className="col-12">
//                   <h3 className="form-label text-center">
//                     <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead1"></span><br />
//                     <span className="text05" id="adminSubscribeEmailChangeMsgDescriptionHead2"></span><br />
//                     {/* <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead3"></span><br /> */}
//                   </h3>
//                   <form>
//                     <div className="col-12">
//                       <div className="row justify-content-center">
//                         <div className="row">
//                           {/* left side column */}
//                           <div className="col-md-6">
//                             <h3 className="form-label text-center">
//                               <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead3"></span><br />
//                             </h3>
//                             <div className='col-12'>
//                               <div className='row p-2'>
//                                 <input type="text" className="form-control form-control-lg text-center w-100" id="userFName" placeholder="Victor" title="Please enter your first name" required style={{ minWidth: '250px' }} />
//                               </div>
//                             </div>
//                             <br />

//                             <h3 className="form-label text-center">
//                               <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead5"></span><br />
//                             </h3>
//                             <div className='col-12'>
//                               <div className='row p-2'>
//                                 <input type="text" className="form-control form-control-lg text-center w-100" id="userContactNumber" placeholder="07xxxxxxxx" title="Please enter a valid telephone number" pattern="^(\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$" required style={{ minWidth: '250px' }} />
//                               </div>
//                             </div>
//                             <br />

//                             <h3 className="form-label text-center">
//                               <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead6"></span><br />
//                             </h3>
//                             <div className='col-12'>
//                               <div className='row p-2 pb-0'>
//                                 <input type="email" className="form-control form-control-lg text-center w-100" id="userEmail" placeholder="example@gmail.com" title="Please enter a valid email address" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required style={{ minWidth: '250px' }} />
//                               </div>
//                             </div>
//                             <h3 className="form-label text-left pt-0">
//                               <span className="text07" id="adminSubscribeEmailChangeMsgDescriptionHead7"></span><br />
//                             </h3>
//                           </div>

//                           {/* right side column */}
//                           <div className="col-md-6">
//                             <h3 className="form-label text-center">
//                               <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead4"></span><br />
//                             </h3>
//                             <div className='col-12'>
//                               <div className='row p-2'>
//                                 <input type="text" className="form-control form-control-lg text-center w-100" id="userLName" placeholder="Tylor" title="Please enter your last name" required style={{ minWidth: '250px' }} />
//                               </div>
//                             </div>
//                             <br />
//                             <h3 className="form-label text-center">
//                               <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead8"></span><br />
//                             </h3>
//                             <div className='col-12'>
//                               <div className='row p-2'>
//                                 <input type="text" className="form-control form-control-lg text-center w-100" id="city" placeholder="Colombo" title="Please enter your last name" required style={{ minWidth: '250px' }} />
//                               </div>
//                             </div>
//                             <br />
//                             <h3 className="form-label text-center">
//                               <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead9"></span><br />
//                             </h3>
//                             <div className='col-12'>
//                               <div className='row p-2'>
//                                 <input type="text" className="form-control form-control-lg text-center w-100" id="address" placeholder="Colombo" title="Please enter your last name" required style={{ minWidth: '250px' }} />
//                               </div>
//                             </div>
//                             <br />
//                           </div>
//                         </div>

//                         <div className="row justify-content-center mt-3 gap-4">
//                           <div className="col-5 p-2">
//                             <div className="row justify-content-center">
//                               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
//                                 CANCEL
//                               </button>
//                             </div>
//                           </div>
//                           <div className="col-5 p-2">
//                             <div className="row justify-content-center">
//                               <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={emailConfirmation}>CONFIRM</button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div class="modal justify-content-center align-content-center" tabIndex="-1" id="admin_product_subscribe_warning_message_modal">
//         <div class="modal-dialog position-relative p-3" style={{ maxWidth: "450px" }}>
//           <div class="modal-content">
//             <div class="modal-header bg-danger">
//               <h5 class="modal-title text01 w-100">
//                 <i class="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>WARNING !</span>
//               </h5>
//               <button type="button" class="btn-close bg-white" data-bs-dismiss="modal"
//                 aria-label="Close"></button>
//             </div>
//             <div class="modal-body">
//               <div class="row g-2">
//                 <div class="col-12">
//                   <h3 class="form-label text-center">
//                     <span class="text03" id="adminSubscribeWarningMsgDescriptionHead"></span><br />
//                   </h3><br /><br />
//                   <div className="col-12">
//                     <div className="row justify-content-center">
//                       <div class="col-4 p-3">
//                         <div class="row justify-content-center">
//                           <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={SubscriptionsSubscribeViewAsk}>
//                             YES</button>
//                         </div>
//                       </div>
//                       <div class="col-4 p-3">
//                         <div class="row justify-content-center">
//                           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">NO</button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <WarningMessageModal />
//       <SuccessMessageModal />

//       <div className="modal" tabIndex="-1" id="success_message_modal2">
//         <div className="modal-dialog position-relative top-0 end-0 p-3" style={{ maxWidth: "450px" }}>
//           <div className="modal-content">
//             <div className="modal-header bg-success" id="msgModalHeader2">
//               <h5 className="modal-title text01 w-100">
//                 <span>SUCCESS</span>
//               </h5>
//               <button type="button" className="btn-close bg-white" data-bs-dismiss="modal"
//                 aria-label="Close"></button>
//             </div>
//             <div className="modal-body">

//               <div className="row g-2">

//                 <div className="col-12">
//                   <h3 className="form-label text-center">
//                     <span className="text04" id="successMsgDescriptionHead2"></span><br />
//                     <span className="text04" id="successMsgDescriptionHead22"></span><br />
//                   </h3><br /><br />
//                   <div className="container col-4 p-3">
//                     <div className="row justify-content-center">
//                       <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
//                         id="btnText">DONE</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// "use client"
// import { useEffect, useState } from "react";
// import Product from "./productView";
// import Image from "next/image";
// import WarningMessageModal from "../mod/WarningMessageModal";
// import SuccessMessageModal from "../mod/SuccessMessageModal";

// export async function getProductsProps() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_URL11}`);
//   const products = await res.json();

//   return {
//     props: {
//       products: products || [],
//     },
//   };
// }

// export default function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [productId, setProductId] = useState('');
//   const [productName, setProductName] = useState('');
//   const [productCode, setProductCode] = useState('');
//   const [user, setUser] = useState('');
//   const [productTitle, setProductTitle] = useState('');
//   const [productImageLocation, setProductImageLocation] = useState('/productImages/addproduct.png');
//   const [descriptionTitle, setDescriptionTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [mainProductFeatures, setMainProductFeatures] = useState('');
//   const [amount, setAmount] = useState('');
//   const [email, setEmail] = useState('');
//   const [licensekey, setLicensekey] = useState('');
//   let warningMessageModal;
//   let successMessageModal;
//   let successMessageModal2;

//   //load products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const result = await getProductsProps();
//         setProducts(result.props.products);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);


//   //setup the products details in admin view
//   const handleProductClick = async (product) => {
//     setUser(localStorage.getItem('customer_id'));
//     setEmail(localStorage.getItem('user_email'));
//     setSelectedProduct(product);
//     setProductId(product.PRODUCTID);
//     setProductName(product.PRODUCTNAME);
//     setProductCode(product.PRODUCTCODE);
//     setProductTitle(product.PRODUCTTITLE);
//     setDescriptionTitle(product.DESCRIPTIONTITLE);
//     setDescription(product.DESCRIPTION);
//     setMainProductFeatures(product.MAINPRODUCTFEATURES);
//     setAmount(product.AMOUNT);
//     setProductImageLocation(product.IMAGELOCATION);

//   };

//   //go back to productList view in admin view
//   const productListHome = () => {
//     const productListViewId = document.getElementById("productListViewId");
//     const singleAdminProductViewId = document.getElementById("singleAdminProductViewId");
//     productListViewId.classList.remove("d-none");
//     singleAdminProductViewId.classList.add("d-none");
//   }

//   //product buying process
//   const handleBuyNowClick = async () => {

//     const warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
//     const warning_message_modal = document.getElementById("warning_message_modal");
//     const successMsgDescriptionHead2 = document.getElementById("successMsgDescriptionHead2");
//     const successMsgDescriptionHead22 = document.getElementById("successMsgDescriptionHead22");
//     const success_message_modal2 = document.getElementById("success_message_modal2");
//     const email = localStorage.getItem("user_email");
//     const admin_id = localStorage.getItem("admin_id");
//     const user = localStorage.getItem("customer_id");

//     const payload = {
//       productCode: Number(productCode),
//       email,
//       amount: Number(amount),
//     };

//     // try {

//     //   const jwt = localStorage.getItem("customerToken");
//     //   const postData = await fetch(`${process.env.NEXT_PRIVATE_URL4}`, {
//     //     method: "POST",
//     //     headers: {
//     //       "Authorization": `Bearer ${jwt}`,
//     //       "Content-type": "application/json",
//     //       "Access-Control-Allow-Origin": "*"
//     //     },
//     //     body: JSON.stringify(payload),
//     //   });
//     //   const result = await postData.json();
//     //   if (result.success) {
//     //     const resultProps = result.response;
//     //     if (!resultProps.subscriptionId == null || !resultProps.subscriptionId == "") {

//     //       const subscriberId = resultProps.subscriptionId;
//     //       const licensekey = resultProps.key;

//     //       const payload2 = {
//     //         subscriberId,
//     //         admin_id,
//     //         user,
//     //         productId,
//     //         licensekey,
//     //         amount: Number(amount),
//     //       };

//     //       const postData2 = await fetch(`${process.env.NEXT_PUBLIC_URL9}`, {
//     //         method: "POST",
//     //         headers: {
//     //           "Content-type": "application/json",
//     //         },
//     //         body: JSON.stringify(payload2),
//     //       });
//     //       const result2 = await postData2.json();
//     //       if (result2.message == "Product Subscribed Successfully!") {
//     //         successMessageModal2 = new bootstrap.Modal(success_message_modal2);
//     //         successMsgDescriptionHead2.innerText = "Product Subscribed Successfully!";
//     //         successMsgDescriptionHead22.innerText = "The licensekey has been sent to your e-mail.";
//     //         success_message_modal2.addEventListener('hidden.bs.modal', () => {
//     //           window.location.href = '/adminSubscription';
//     //         });
//     //         successMessageModal2.show();
//     //       } else {
//     //         warningMessageModal = new bootstrap.Modal(warning_message_modal);
//     //         warningMsgDescriptionHead.innerText = "Subscription proccess Failed.";
//     //         warningMessageModal.show();
//     //       }

//     //     } else {
//     //       warningMessageModal = new bootstrap.Modal(warning_message_modal);
//     //       warningMsgDescriptionHead.innerText = "Invalid Subscription.";
//     //       warningMessageModal.show();
//     //     }
//     //   } else {
//     //     warningMessageModal = new bootstrap.Modal(warning_message_modal);
//     //     warningMsgDescriptionHead.innerText = result.error + " : "+result.reason;
//     //     warning_message_modal.addEventListener('hidden.bs.modal', () => {
//     //       window.location.href = '/adminProductList';
//     //     });
//     //     warningMessageModal.show();
//     //   }


//     // } catch (error) {
//     //   console.error('Error generating token:', error);
//     // }
//   };

//   //lifestore function to confirm email and payment
//   const emailConfirmation = async () => {
//     const first_name = document.getElementById("userFName").value;
//     const last_name = document.getElementById("userLName").value;
//     const phone = document.getElementById("userContactNumber").value;
//     const email = document.getElementById("userEmail").value;
//     const address = document.getElementById("address").value;
//     const city = document.getElementById("city").value;
//     const order_id = "ORDER_" + Date.now();
//     const items = productName;
//     const pCode = Number(productCode);
//     const currency = "LKR";
//     const fullName = first_name + " " + last_name;

//     let success_message_modal = document.getElementById("success_message_modal");
//     let successMsgDescriptionHead = document.getElementById("successMsgDescriptionHead");
//     let warning_message_modal = document.getElementById("warning_message_modal");
//     let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");




//     // Inside emailConfirmation function, after storing customer data:
//     if (first_name && last_name && phone && email && address && city && order_id && items && currency) {
//       const response = await fetch("../api/payhere", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           first_name,
//           last_name,
//           phone,
//           email,
//           address,
//           city,
//           order_id,
//           items,
//           currency,
//           amount,
//         }),
//       });

//       const html = await response.text();

//       // Open the PayHere payment form in a new window
//       const blob = new Blob([html], { type: "text/html" });
//       const url = URL.createObjectURL(blob);
//       const payhereWindow = window.open(url, "_self");

//       // Store user details after opening PayHere window
//       try {
//         const storeResponse = await fetch("../api/store-customerData", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             order_id,
//             fullName,
//             phone,
//             email,
//             pCode,
//           })
//         });
//         console.log(storeResponse);

//         if (!storeResponse.ok) {
//           throw new Error('Failed to store order');
//         }

//      // Set up an interval to check payment status
// const checkPaymentStatus = setInterval(async () => {
//   try {
//     const statusResponse = await fetch(`../api/get-customerData?orderId=${order_id}`);
//     const statusData = await statusResponse.json();

//     if (statusData.success && statusData.data) {
//       const customerData = statusData.data;
//       console.log("Current customer data:", customerData);

//       // Check if payment status exists and is not 0 (pending)
//       if (customerData.PAYHERESTATUSCODE && customerData.PAYHERESTATUSCODE !== 0) {
//         clearInterval(checkPaymentStatus); // Stop checking

//         // Handle ALL payment statuses
//         if (customerData.PAYHERESTATUSCODE === 2) {
//           // SUCCESS - Status code 2
//           console.log("Payment Successful! Starting license key generation...");

//           if (phone && email) {
//             try {
//               console.log("Calling generate license API...");

//               const generateLicenseResponse = await fetch("../api/generate-license", {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   email: email,
//                   productCode: pCode,
//                   phone: phone,
//                   orderId: order_id
//                 })
//               });

//               const generateLicenseResult = await generateLicenseResponse.json();

//               if (generateLicenseResult.success) {
//                 console.log("License key generated and stored successfully!");

//                 // Show success message
//                 successMessageModal = new bootstrap.Modal(success_message_modal);
//                 successMsgDescriptionHead.innerText = "Product Subscribed Successfully! License key has been generated and sent to your email.";
//                 successMessageModal.show();

//               } else {
//                 console.error("License generation failed:", generateLicenseResult.error);
//                 warningMessageModal = new bootstrap.Modal(warning_message_modal);
//                 warningMsgDescriptionHead.innerText = `License generation failed: ${generateLicenseResult.error}`;
//                 warningMessageModal.show();
//               }

//             } catch (error) {
//               console.error('Error generating license:', error);
//               warningMessageModal = new bootstrap.Modal(warning_message_modal);
//               warningMsgDescriptionHead.innerText = `License generation error: ${error.message}`;
//               warningMessageModal.show();
//             }
//           } else {
//             console.error("Missing phone or email");
//             warningMessageModal = new bootstrap.Modal(warning_message_modal);
//             warningMsgDescriptionHead.innerText = "Enter all the details!";
//             warningMessageModal.show();
//           }
//         } 
//         else if (customerData.PAYHERESTATUSCODE === -1) {
//           // CANCELLED - Status code -1
//           console.log("Payment was cancelled by user");
//           warningMessageModal = new bootstrap.Modal(warning_message_modal);
//           warningMsgDescriptionHead.innerText = "Payment was cancelled. Please try again if you wish to purchase this product.";
//           warningMessageModal.show();
//         }
//         else if (customerData.PAYHERESTATUSCODE === -2) {
//           // FAILED - Status code -2  
//           console.log("Payment failed");
//           warningMessageModal = new bootstrap.Modal(warning_message_modal);
//           warningMsgDescriptionHead.innerText = "Payment failed. Please check your payment details and try again.";
//           warningMessageModal.show();
//         }
//         else if (customerData.PAYHERESTATUSCODE === -3) {
//           // CHARGED BACK - Status code -3
//           console.log("Payment was charged back");
//           warningMessageModal = new bootstrap.Modal(warning_message_modal);
//           warningMsgDescriptionHead.innerText = "Payment was charged back. Please contact support for assistance.";
//           warningMessageModal.show();
//         }
//         else {
//           // ANY OTHER STATUS CODE
//           console.log("Unknown payment status:", customerData.PAYHERESTATUSCODE);
//           warningMessageModal = new bootstrap.Modal(warning_message_modal);
//           warningMsgDescriptionHead.innerText = `Payment status unknown (Code: ${customerData.PAYHERESTATUSCODE}). Please contact support.`;
//           warningMessageModal.show();
//         }
//       }
//     }
//   } catch (error) {
//     console.error('Error checking payment status:', error);
//   }
// }, 5000); // Check every 5 seconds

// // Stop checking after 5 minutes (300000 ms) to prevent infinite checking
// setTimeout(() => {
//   clearInterval(checkPaymentStatus);
//   console.log("Payment status checking timeout - stopped checking after 5 minutes");
// }, 300000);

//       } catch (error) {
//         console.error("Error storing order:", error);
//         warningMessageModal = new bootstrap.Modal(warning_message_modal);
//         warningMsgDescriptionHead.innerText = "Error storing order details.";
//         warningMessageModal.show();
//       }

//       setTimeout(() => URL.revokeObjectURL(url), 5000);

//     } else {
//       warningMessageModal = new bootstrap.Modal(warning_message_modal);
//       warningMsgDescriptionHead.innerText = "Fill all the informations.";
//       warningMessageModal.show();
//     }

//     // if (phone && email) {
//     //   try {
//     //     const payload = {
//     //       subscriberId: phone,
//     //       adminId: email,
//     //     };

//     //     const response = await fetch(`${process.env.NEXT_PRIVATE_URL3}`, {
//     //       method: 'POST',
//     //       headers: {
//     //         "Content-type": "application/json",
//     //         "Access-Control-Allow-Origin": "*",
//     //         "X-Secret": `${process.env.X_SECRET}`,
//     //       },
//     //       body: JSON.stringify(payload),
//     //     });

//     //     const result = await response.json();
//     //     if (result.success && result.jwt) {
//     //       localStorage.setItem('user_token', result.jwt);
//     //       console.log("User jwt: ", result.jwt);
//     //       // successMessageModal = new bootstrap.Modal(success_message_modal);
//     //       // successMsgDescriptionHead.innerText = "User Token successfull!";
//     //       // successMessageModal.show();
//     //     } else {
//     //       warningMessageModal = new bootstrap.Modal(warning_message_modal);
//     //       warningMsgDescriptionHead.innerText = result.response;
//     //       warningMessageModal.show();
//     //     }
//     //   } catch (error) {
//     //     console.error('Error updating cutomer email:', error);
//     //   }
//     // } else {
//     //   warningMessageModal = new bootstrap.Modal(warning_message_modal);
//     //   warningMsgDescriptionHead.innerText = "Missing parameters!";
//     //   warning_message_modal.addEventListener('hidden.bs.modal', () => {
//     //     assveca.show();
//     //   });
//     //   warningMessageModal.show();
//     // }
//   };


//   //product buying confirmation process
//   // const handleBuyConfirmationClick = async () => {
//   //   let user = localStorage.getItem('customer_id');

//   //   try {

//   //     const payload = {
//   //       user,
//   //       productName,
//   //     };

//   //     const postData = await fetch(`${process.env.NEXT_PUBLIC_URL10}`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(payload),
//   //     });

//   //     const result = await postData.json();
//   //     if (result.message === "Product Count!") {
//   //       if (result.subscriptionsCount >= 1) {
//   //         SubscriptionsWarningSubscribeViewAsk(result.subscriptionsCount);
//   //       } else {
//   //         SubscriptionsSubscribeViewAsk();
//   //       }

//   //     } else {
//   //       SubscriptionsSubscribeViewAsk();
//   //     }

//   //   } catch (error) {
//   //     console.error('Error adding product:', error);
//   //   }
//   // }

//   // const hasFeature = (featuresString, feature) => {
//   //   const regex = new RegExp(`\\b${feature}\\b`, 'i');
//   //   return regex.test(featuresString);
//   // };

//   let aswva;
//   let productSubscribeWarningMessageModal;

//   //same user same product buying confirmation
//   // const SubscriptionsWarningSubscribeViewAsk = (x) => {
//   //   productSubscribeWarningMessageModal = document.getElementById("admin_product_subscribe_warning_message_modal");
//   //   const subscribeWarningMsgDescriptionHead = document.getElementById("adminSubscribeWarningMsgDescriptionHead");
//   //   if (x > 1) {
//   //     subscribeWarningMsgDescriptionHead.innerText = "You already subscribed this item " + x + " times.\nDo you want to subscribe it again ?";
//   //   } else {
//   //     subscribeWarningMsgDescriptionHead.innerText = "You already subscribed this item " + x + " time.\nDo you want to subscribe it again ?";
//   //   }
//   //   aswva = new bootstrap.Modal(productSubscribeWarningMessageModal);
//   //   aswva.show();
//   // }

//   let assva;
//   let productSubscribeSelectionMessageModal;

//   //buying confirmation
//   function SubscriptionsSubscribeViewAsk() {

//     productSubscribeSelectionMessageModal = document.getElementById("admin_product_subscribe_selection_message_modal");
//     const subscribeselectionMsgDescriptionHead = document.getElementById("adminSubscribeselectionMsgDescriptionHead");
//     subscribeselectionMsgDescriptionHead.innerText = "Do you want to subscribe this product ? ";
//     assva = new bootstrap.Modal(productSubscribeSelectionMessageModal);
//     assva.show();

//   }

//   let assvea;

//   //buying email confirmation
//   // function SubscriptionsSubscribeViewEmailAsk() {

//   //   if (email == null || email == '') {
//   //     SubscriptionsSubscribeViewEmailChangeAsk();
//   //   } else {
//   //     const productSubscribeEmailSelectionMessageModal = document.getElementById("admin_product_subscribe_email_selection_message_modal");
//   //     const subscribeEmailSelectionMsgDescriptionHead1 = document.getElementById("adminSubscribeEmailSelectionMsgDescriptionHead1");
//   //     const subscribeEmailSelectionMsgDescriptionHead2 = document.getElementById("adminSubscribeEmailSelectionMsgDescriptionHead2");
//   //     const subscribeEmailSelectionMsgDescriptionHead3 = document.getElementById("adminSubscribeEmailSelectionMsgDescriptionHead3");
//   //     subscribeEmailSelectionMsgDescriptionHead1.innerText = "Do you Wish to subscribe for";
//   //     subscribeEmailSelectionMsgDescriptionHead2.innerText = productName.toString();
//   //     subscribeEmailSelectionMsgDescriptionHead3.innerText = "With the following email address for \n User : " + user;
//   //     assvea = new bootstrap.Modal(productSubscribeEmailSelectionMessageModal);
//   //     assvea.show();
//   //   }

//   // }

//   let assveca;

//   //buying new email confirmation
//   function SubscriptionsSubscribeViewEmailChangeAsk() {

//     const productSubscribeEmailChangeMessageModal = document.getElementById("admin_product_subscribe_email_change_message_modal");
//     const subscribeEmailChangeMsgDescriptionHead1 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead1");
//     const subscribeEmailChangeMsgDescriptionHead2 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead2");
//     const subscribeEmailChangeMsgDescriptionHead3 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead3");
//     const subscribeEmailChangeMsgDescriptionHead4 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead4");
//     const subscribeEmailChangeMsgDescriptionHead5 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead5");
//     const subscribeEmailChangeMsgDescriptionHead6 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead6");
//     const subscribeEmailChangeMsgDescriptionHead7 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead7");
//     const subscribeEmailChangeMsgDescriptionHead8 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead8");
//     const subscribeEmailChangeMsgDescriptionHead9 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead9");
//     subscribeEmailChangeMsgDescriptionHead1.innerText = "Do you Wish to subscribe for";
//     subscribeEmailChangeMsgDescriptionHead2.innerText = productName.toString();
//     subscribeEmailChangeMsgDescriptionHead3.innerText = "First Name :";
//     subscribeEmailChangeMsgDescriptionHead4.innerText = "Last Name : ";
//     subscribeEmailChangeMsgDescriptionHead5.innerText = "Contact Number : ";
//     subscribeEmailChangeMsgDescriptionHead6.innerText = "Email : ";
//     subscribeEmailChangeMsgDescriptionHead7.innerText = "*The Kaspersky key will be send to this email.";
//     subscribeEmailChangeMsgDescriptionHead8.innerText = "City : ";
//     subscribeEmailChangeMsgDescriptionHead9.innerText = "Address : ";
//     assveca = new bootstrap.Modal(productSubscribeEmailChangeMessageModal);
//     assveca.show();

//   }


//   return (
//     <>
//       <div id="productListViewId">
//         <div className="col-12 text-center mt-3 mb-3">
//           <span className="title06">PRODUCT LIST</span>
//         </div>

//         <div className="container-fluid">
//           <div className="row justify-content-center">
//             <div className="col-10">
//               <div className="row justify-content-center p-3">
//                 <div className="horizontal-scroll-container">
//                   {loading ? <p>Loading...</p> : <Product products={products} onProductClick={handleProductClick} />}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div id="singleAdminProductViewId" className="d-none">
//         <div className="col-12">
//           <div className="col-12 mt-3 mb-3 p-3">
//             <span className="title21" onClick={productListHome}><i class="bi bi-arrow-bar-left"></i>&nbsp;Product List /</span><span className="title06"> PRODUCT DETAILS</span>
//           </div>

//           <div className="container align-items-center justify-content-center">
//             <div className="col-12 border-3 cardBoxView">
//               <div className="text-black row">
//                 <div className="col-lg-5 col-12 p-3">
//                   <div className="row">
//                     <div className="col-12 mb-3">
//                       <div className='row  justify-content-center align-content-center'>
//                         <Image src={`${process.env.NEXT_PUBLIC_URL2 + productImageLocation}`} alt="No picture" className="productImage container-fluid" width={1000} height={1000} />
//                       </div>
//                     </div>
//                     <span className="title18 text-start">ANNUAL PLAN</span><br />
//                     <span className="title14">LKR {amount}</span><br />
//                     <span className="title02 text-center">All prices are exclusive of taxes</span>
//                   </div>
//                 </div>
//                 <div className="col-lg-7 col-12 p-3">
//                   <div className="row">
//                     <div className="col-12">
//                       <div className="row">
//                         <div className="col-12">
//                           <span className="title15">{productName}</span><br /><br />
//                         </div>
//                       </div>
//                     </div>
//                     <span className="title16 text-start col-12">{descriptionTitle}</span><br /><br />
//                     <span className="title02 text-start col-11">{description}</span><br /><br />
//                     <div className="col-12 mb-3">
//                       <div className="row">
//                         {mainProductFeatures.split(' | ').map((feature, index) => (
//                           <div className="col-12 CardfeatureText" key={index}>
//                             <i className="bi bi-check fa-3x checkView"></i>&nbsp;&nbsp;&nbsp;&nbsp;<span className="title17">{feature}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                     <button className="col-lg-7 offset-lg-5 col-12 btn9 p-2" onClick={SubscriptionsSubscribeViewEmailChangeAsk}><span className="title10"></span>Buy Now</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* <div class="modal justify-content-center align-content-center" tabIndex="-1" id="admin_product_subscribe_selection_message_modal">
//         <div class="modal-dialog position-relative p-3" style={{ maxWidth: "450px" }}>
//           <div class="modal-content">
//             <div class="modal-header bg-success">
//               <h5 class="modal-title text01 w-100">
//                 <i class="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>INFORMATION !</span>
//               </h5>
//               <button type="button" class="btn-close bg-white" data-bs-dismiss="modal"
//                 aria-label="Close"></button>
//             </div>
//             <div class="modal-body">
//               <div class="row g-2">
//                 <div class="col-12">
//                   <h3 class="form-label text-center">
//                     <span class="text03" id="adminSubscribeselectionMsgDescriptionHead"></span><br />
//                   </h3><br /><br />
//                   <div className="col-12">
//                     <div className="row justify-content-center">
//                       <div class="col-4 p-3">
//                         <div class="row justify-content-center">
//                           <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={SubscriptionsSubscribeViewEmailAsk}>
//                             YES</button>
//                         </div>
//                       </div>
//                       <div class="col-4 p-3">
//                         <div class="row justify-content-center">
//                           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">NO</button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div> */}

//       <div className="modal justify-content-center align-content-center" tabIndex="-1" id="admin_product_subscribe_email_selection_message_modal">
//         <div className="modal-dialog position-relative p-3" style={{ maxWidth: "450px" }}>
//           <div className="modal-content">
//             <div className="modal-header bg-success">
//               <h5 className="modal-title text01 w-100">
//                 <i className="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>CONFIRMATION !</span>
//               </h5>
//               <button type="button" className="btn-close bg-white" data-bs-dismiss="modal"
//                 aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               <div className="row g-2">
//                 <div className="col-12">
//                   <h3 className="form-label text-center">
//                     <span className="text03" id="adminSubscribeEmailSelectionMsgDescriptionHead1"></span><br />
//                     <span className="text05" id="adminSubscribeEmailSelectionMsgDescriptionHead2"></span><br />
//                     <span className="text03" id="adminSubscribeEmailSelectionMsgDescriptionHead3"></span><br />

//                   </h3>
//                   <div className="col-12">
//                     <div className="row justify-content-center">
//                       <div className='col-12'>
//                         <div className='row p-3'>
//                           <input type="email" className="form-control text-center" id="subscribeEmail" value={email} />
//                         </div>
//                       </div>
//                       <div className="col-5 p-3">
//                         <div className="row justify-content-center">
//                           <button type="button" className="btn btn-secondary btncat" data-bs-dismiss="modal" onClick={SubscriptionsSubscribeViewEmailChangeAsk}>
//                             UPDATE EMAIL
//                           </button>
//                         </div>
//                       </div>
//                       <div className="col-5 p-3">
//                         <div className="row justify-content-center">
//                           <button type="button" className="btn btn-success btncat" data-bs-dismiss="modal" onClick={handleBuyNowClick}>CONFIRM</button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="modal justify-content-center align-content-center" tabIndex="-1" id="admin_product_subscribe_email_change_message_modal">
//         <div className="modal-dialog position-relative p-3" style={{ maxWidth: "650px" }}>
//           <div className="modal-content">
//             <div className="modal-header bg-success">
//               <h5 className="modal-title text01 w-100">
//                 <i className="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>CONFIRMATION !</span>
//               </h5>
//               <button type="button" className="btn-close bg-white" data-bs-dismiss="modal"
//                 aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               <div className="row g-2">
//                 <div className="col-12">
//                   <h3 className="form-label text-center">
//                     <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead1"></span><br />
//                     <span className="text05" id="adminSubscribeEmailChangeMsgDescriptionHead2"></span><br />
//                     {/* <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead3"></span><br /> */}
//                   </h3>
//                   <form>
//                     <div className="col-12">
//                       <div className="row justify-content-center">
//                         <div className="row">
//                           {/* left side column */}
//                           <div className="col-md-6">
//                             <h3 className="form-label text-center">
//                               <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead3"></span><br />
//                             </h3>
//                             <div className='col-12'>
//                               <div className='row p-2'>
//                                 <input type="text" className="form-control form-control-lg text-center w-100" id="userFName" placeholder="Victor" title="Please enter your first name" required style={{ minWidth: '250px' }} />
//                               </div>
//                             </div>
//                             <br />

//                             <h3 className="form-label text-center">
//                               <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead5"></span><br />
//                             </h3>
//                             <div className='col-12'>
//                               <div className='row p-2'>
//                                 <input type="text" className="form-control form-control-lg text-center w-100" id="userContactNumber" placeholder="07xxxxxxxx" title="Please enter a valid telephone number" pattern="^(\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$" required style={{ minWidth: '250px' }} />
//                               </div>
//                             </div>
//                             <br />

//                             <h3 className="form-label text-center">
//                               <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead6"></span><br />
//                             </h3>
//                             <div className='col-12'>
//                               <div className='row p-2 pb-0'>
//                                 <input type="email" className="form-control form-control-lg text-center w-100" id="userEmail" placeholder="example@gmail.com" title="Please enter a valid email address" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required style={{ minWidth: '250px' }} />
//                               </div>
//                             </div>
//                             <h3 className="form-label text-left pt-0">
//                               <span className="text07" id="adminSubscribeEmailChangeMsgDescriptionHead7"></span><br />
//                             </h3>
//                           </div>

//                           {/* right side column */}
//                           <div className="col-md-6">
//                             <h3 className="form-label text-center">
//                               <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead4"></span><br />
//                             </h3>
//                             <div className='col-12'>
//                               <div className='row p-2'>
//                                 <input type="text" className="form-control form-control-lg text-center w-100" id="userLName" placeholder="Tylor" title="Please enter your last name" required style={{ minWidth: '250px' }} />
//                               </div>
//                             </div>
//                             <br />
//                             <h3 className="form-label text-center">
//                               <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead8"></span><br />
//                             </h3>
//                             <div className='col-12'>
//                               <div className='row p-2'>
//                                 <input type="text" className="form-control form-control-lg text-center w-100" id="city" placeholder="Colombo" title="Please enter your last name" required style={{ minWidth: '250px' }} />
//                               </div>
//                             </div>
//                             <br />
//                             <h3 className="form-label text-center">
//                               <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead9"></span><br />
//                             </h3>
//                             <div className='col-12'>
//                               <div className='row p-2'>
//                                 <input type="text" className="form-control form-control-lg text-center w-100" id="address" placeholder="Colombo" title="Please enter your last name" required style={{ minWidth: '250px' }} />
//                               </div>
//                             </div>
//                             <br />
//                           </div>
//                         </div>

//                         <div className="row justify-content-center mt-3 gap-4">
//                           <div className="col-5 p-2">
//                             <div className="row justify-content-center">
//                               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
//                                 CANCEL
//                               </button>
//                             </div>
//                           </div>
//                           <div className="col-5 p-2">
//                             <div className="row justify-content-center">
//                               <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={emailConfirmation}>CONFIRM</button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div class="modal justify-content-center align-content-center" tabIndex="-1" id="admin_product_subscribe_warning_message_modal">
//         <div class="modal-dialog position-relative p-3" style={{ maxWidth: "450px" }}>
//           <div class="modal-content">
//             <div class="modal-header bg-danger">
//               <h5 class="modal-title text01 w-100">
//                 <i class="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>WARNING !</span>
//               </h5>
//               <button type="button" class="btn-close bg-white" data-bs-dismiss="modal"
//                 aria-label="Close"></button>
//             </div>
//             <div class="modal-body">
//               <div class="row g-2">
//                 <div class="col-12">
//                   <h3 class="form-label text-center">
//                     <span class="text03" id="adminSubscribeWarningMsgDescriptionHead"></span><br />
//                   </h3><br /><br />
//                   <div className="col-12">
//                     <div className="row justify-content-center">
//                       <div class="col-4 p-3">
//                         <div class="row justify-content-center">
//                           <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={SubscriptionsSubscribeViewAsk}>
//                             YES</button>
//                         </div>
//                       </div>
//                       <div class="col-4 p-3">
//                         <div class="row justify-content-center">
//                           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">NO</button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <WarningMessageModal />
//       <SuccessMessageModal />

//       <div className="modal" tabIndex="-1" id="success_message_modal2">
//         <div className="modal-dialog position-relative top-0 end-0 p-3" style={{ maxWidth: "450px" }}>
//           <div className="modal-content">
//             <div className="modal-header bg-success" id="msgModalHeader2">
//               <h5 className="modal-title text01 w-100">
//                 <span>SUCCESS</span>
//               </h5>
//               <button type="button" className="btn-close bg-white" data-bs-dismiss="modal"
//                 aria-label="Close"></button>
//             </div>
//             <div className="modal-body">

//               <div className="row g-2">

//                 <div className="col-12">
//                   <h3 className="form-label text-center">
//                     <span className="text04" id="successMsgDescriptionHead2"></span><br />
//                     <span className="text04" id="successMsgDescriptionHead22"></span><br />
//                   </h3><br /><br />
//                   <div className="container col-4 p-3">
//                     <div className="row justify-content-center">
//                       <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
//                         id="btnText">DONE</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client"
import { useEffect, useState } from "react";
import Product from "./productView";
import Image from "next/image";
import WarningMessageModal from "../mod/WarningMessageModal";
import SuccessMessageModal from "../mod/SuccessMessageModal";

export async function getProductsProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL11}`);
  const products = await res.json();

  return {
    props: {
      products: products || [],
    },
  };
}

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [user, setUser] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productImageLocation, setProductImageLocation] = useState('/productImages/addproduct.png');
  const [descriptionTitle, setDescriptionTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mainProductFeatures, setMainProductFeatures] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [licensekey, setLicensekey] = useState('');
  let warningMessageModal;
  let successMessageModal;
  let successMessageModal2;

  //load products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProductsProps();
        setProducts(result.props.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.status) {
        if (event.data.status === "success") {
          console.log("✅ Payment success:", event.data.orderId);

          let success_message_modal = document.getElementById("success_message_modal");
          let successMessageModal = new bootstrap.Modal(success_message_modal);
          let successMsgDescriptionHead = document.getElementById("successMsgDescriptionHead");

          successMsgDescriptionHead.innerText =
            "Payment Successful!\nCheck your email for the license key.";


          success_message_modal.addEventListener("hidden.bs.modal", () => {
            document.body.classList.remove("modal-open");
            document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());
          });

          successMessageModal.show();

        } else if (event.data.status === "cancelled") {
          console.log("❌ Payment cancelled:", event.data.orderId);

          let warning_message_modal = document.getElementById("warning_message_modal");
          let warningMessageModal = new bootstrap.Modal(warning_message_modal);
          let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");

          warningMsgDescriptionHead.innerText =
            "Payment failed. Please check your payment details and try again.";

          warning_message_modal.addEventListener("hidden.bs.modal", () => {
            document.body.classList.remove("modal-open");
            document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());
          });

          warningMessageModal.show();
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);


  //setup the products details in admin view
  const handleProductClick = async (product) => {
    setUser(localStorage.getItem('customer_id'));
    setEmail(localStorage.getItem('user_email'));
    setSelectedProduct(product);
    setProductId(product.PRODUCTID);
    setProductName(product.PRODUCTNAME);
    setProductCode(product.PRODUCTCODE);
    setProductTitle(product.PRODUCTTITLE);
    setDescriptionTitle(product.DESCRIPTIONTITLE);
    setDescription(product.DESCRIPTION);
    setMainProductFeatures(product.MAINPRODUCTFEATURES);
    setAmount(product.AMOUNT);
    setProductImageLocation(product.IMAGELOCATION);

  };

  //go back to productList view in admin view
  const productListHome = () => {
    const productListViewId = document.getElementById("productListViewId");
    const singleAdminProductViewId = document.getElementById("singleAdminProductViewId");
    productListViewId.classList.remove("d-none");
    singleAdminProductViewId.classList.add("d-none");
  }

  //product buying process
  const handleBuyNowClick = async () => {

    const warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
    const warning_message_modal = document.getElementById("warning_message_modal");
    const successMsgDescriptionHead2 = document.getElementById("successMsgDescriptionHead2");
    const successMsgDescriptionHead22 = document.getElementById("successMsgDescriptionHead22");
    const success_message_modal2 = document.getElementById("success_message_modal2");
    const email = localStorage.getItem("user_email");
    const admin_id = localStorage.getItem("admin_id");
    const user = localStorage.getItem("customer_id");

    const payload = {
      productCode: Number(productCode),
      email,
      amount: Number(amount),
    };

    // try {

    //   const jwt = localStorage.getItem("customerToken");
    //   const postData = await fetch(`${process.env.NEXT_PRIVATE_URL4}`, {
    //     method: "POST",
    //     headers: {
    //       "Authorization": `Bearer ${jwt}`,
    //       "Content-type": "application/json",
    //       "Access-Control-Allow-Origin": "*"
    //     },
    //     body: JSON.stringify(payload),
    //   });
    //   const result = await postData.json();
    //   if (result.success) {
    //     const resultProps = result.response;
    //     if (!resultProps.subscriptionId == null || !resultProps.subscriptionId == "") {

    //       const subscriberId = resultProps.subscriptionId;
    //       const licensekey = resultProps.key;

    //       const payload2 = {
    //         subscriberId,
    //         admin_id,
    //         user,
    //         productId,
    //         licensekey,
    //         amount: Number(amount),
    //       };

    //       const postData2 = await fetch(`${process.env.NEXT_PUBLIC_URL9}`, {
    //         method: "POST",
    //         headers: {
    //           "Content-type": "application/json",
    //         },
    //         body: JSON.stringify(payload2),
    //       });
    //       const result2 = await postData2.json();
    //       if (result2.message == "Product Subscribed Successfully!") {
    //         successMessageModal2 = new bootstrap.Modal(success_message_modal2);
    //         successMsgDescriptionHead2.innerText = "Product Subscribed Successfully!";
    //         successMsgDescriptionHead22.innerText = "The licensekey has been sent to your e-mail.";
    //         success_message_modal2.addEventListener('hidden.bs.modal', () => {
    //           window.location.href = '/adminSubscription';
    //         });
    //         successMessageModal2.show();
    //       } else {
    //         warningMessageModal = new bootstrap.Modal(warning_message_modal);
    //         warningMsgDescriptionHead.innerText = "Subscription proccess Failed.";
    //         warningMessageModal.show();
    //       }

    //     } else {
    //       warningMessageModal = new bootstrap.Modal(warning_message_modal);
    //       warningMsgDescriptionHead.innerText = "Invalid Subscription.";
    //       warningMessageModal.show();
    //     }
    //   } else {
    //     warningMessageModal = new bootstrap.Modal(warning_message_modal);
    //     warningMsgDescriptionHead.innerText = result.error + " : "+result.reason;
    //     warning_message_modal.addEventListener('hidden.bs.modal', () => {
    //       window.location.href = '/adminProductList';
    //     });
    //     warningMessageModal.show();
    //   }


    // } catch (error) {
    //   console.error('Error generating token:', error);
    // }
  };

  // --- Validation helpers (phone: exactly 10 digits; email: basic RFC pattern) ---
  const phoneRe = /^\d{10}$/;
  const emailRe = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  function setInvalid(el, msg) {
    if (!el) return;
    el.classList.add("is-invalid");
    el.setCustomValidity(msg);
    el.reportValidity();
  }

  function clearInvalid(el) {
    if (!el) return;
    el.classList.remove("is-invalid");
    el.setCustomValidity("");
  }

  function validateContactAndEmail() {
    const phoneEl = document.getElementById("userContactNumber");
    const emailEl = document.getElementById("userEmail");

    const phone = (phoneEl?.value || "").trim();
    const email = (emailEl?.value || "").trim();

    let ok = true;

    if (!phoneRe.test(phone)) {
      setInvalid(phoneEl, "Contact number must be exactly 10 digits.");
      ok = false;
    } else {
      clearInvalid(phoneEl);
    }

    if (!emailRe.test(email)) {
      setInvalid(emailEl, "Please enter a valid email address.");
      ok = false;
    } else {
      clearInvalid(emailEl);
    }

    if (!ok) {
      document
        .querySelector("#admin_product_subscribe_email_change_message_modal .is-invalid")
        ?.focus();
    }
    return ok;
  }


  //lifestore function to confirm email and payment
  const emailConfirmation = async () => {
    // Validate before doing anything
    if (!validateContactAndEmail()) return;

    // Close the modal only after fields are valid
    assveca?.hide();


    const first_name = document.getElementById("userFName").value;
    const last_name = document.getElementById("userLName").value;
    const phone = document.getElementById("userContactNumber").value;
    const email = document.getElementById("userEmail").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const order_id = "ORDER_" + Date.now();
    const items = productName;
    const pCode = Number(productCode);
    const currency = "LKR";
    const fullName = first_name + " " + last_name;

    let success_message_modal = document.getElementById("success_message_modal");
    let successMsgDescriptionHead = document.getElementById("successMsgDescriptionHead");
    let warning_message_modal = document.getElementById("warning_message_modal");
    let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");




    // Inside emailConfirmation function, after storing customer data:
    if (first_name && last_name && phone && email && address && city && order_id && items && currency) {
      const response = await fetch("../api/payhere", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          phone,
          email,
          address,
          city,
          order_id,
          items,
          currency,
          amount,
        }),
      });

      const html = await response.text();

      // Open the PayHere payment form in a new window
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const payhereWindow = window.open(url, "_blank");

      // Store user details after opening PayHere window
      try {
        const storeResponse = await fetch("../api/store-customerData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id,
            fullName,
            phone,
            email,
            pCode,
          })
        });
        console.log(storeResponse);

        if (!storeResponse.ok) {
          throw new Error('Failed to store order');
        }

        // Set up an interval to check payment status
        const checkPaymentStatus = setInterval(async () => {
          try {
            const statusResponse = await fetch(`../api/get-customerData?orderId=${order_id}`);
            const statusData = await statusResponse.json();

            if (statusData.success && statusData.data) {
              const customerData = statusData.data;
              console.log("Current customer data:", customerData);

              // Check if payment status exists and is not 0 (pending)
              if (customerData.PAYHERESTATUSCODE && customerData.PAYHERESTATUSCODE !== 0) {
                clearInterval(checkPaymentStatus); // Stop checking

                // Handle ALL payment statuses
                if (customerData.PAYHERESTATUSCODE === 2) {
                  // SUCCESS - Status code 2
                  console.log("Payment Successful! Starting license key generation...");

                  if (phone && email) {
                    try {
                      console.log("Calling generate license API...");

                      const generateLicenseResponse = await fetch("../api/generate-license", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          email: email,
                          productCode: pCode,
                          phone: phone,
                          orderId: order_id
                        })
                      });

                      const generateLicenseResult = await generateLicenseResponse.json();

                      if (generateLicenseResult.success) {
                        console.log("License key generated and stored successfully!");

                        // Show success message
                        successMessageModal = new bootstrap.Modal(success_message_modal);
                        successMsgDescriptionHead.innerText = "Product Subscribed Successfully! License key has been generated and sent to your email.";
                        successMessageModal.show();

                      } else {
                        console.error("License generation failed:", generateLicenseResult.error);
                        warningMessageModal = new bootstrap.Modal(warning_message_modal);
                        warningMsgDescriptionHead.innerText = `License generation failed: ${generateLicenseResult.error}`;
                        warningMessageModal.show();
                      }

                    } catch (error) {
                      console.error('Error generating license:', error);
                      warningMessageModal = new bootstrap.Modal(warning_message_modal);
                      warningMsgDescriptionHead.innerText = `License generation error: ${error.message}`;
                      warningMessageModal.show();
                    }
                  } else {
                    console.error("Missing phone or email");
                    warningMessageModal = new bootstrap.Modal(warning_message_modal);
                    warningMsgDescriptionHead.innerText = "Enter all the details!";
                    warningMessageModal.show();
                  }
                }
                else if (customerData.PAYHERESTATUSCODE === -1) {
                  // CANCELLED - Status code -1
                  console.log("Payment was cancelled by user");
                  warningMessageModal = new bootstrap.Modal(warning_message_modal);
                  warningMsgDescriptionHead.innerText = "Payment was cancelled. Please try again if you wish to purchase this product.";
                  warningMessageModal.show();
                }
                else if (customerData.PAYHERESTATUSCODE === -2) {
                  // FAILED - Status code -2  
                  console.log("Payment failed");
                  warningMessageModal = new bootstrap.Modal(warning_message_modal);
                  warningMsgDescriptionHead.innerText = "Payment failed. Please check your payment details and try again.";
                  warningMessageModal.show();
                }
                else if (customerData.PAYHERESTATUSCODE === -3) {
                  // CHARGED BACK - Status code -3
                  console.log("Payment was charged back");
                  warningMessageModal = new bootstrap.Modal(warning_message_modal);
                  warningMsgDescriptionHead.innerText = "Payment was charged back. Please contact support for assistance.";
                  warningMessageModal.show();
                }
                else {
                  // ANY OTHER STATUS CODE
                  console.log("Unknown payment status:", customerData.PAYHERESTATUSCODE);
                  warningMessageModal = new bootstrap.Modal(warning_message_modal);
                  warningMsgDescriptionHead.innerText = `Payment status unknown (Code: ${customerData.PAYHERESTATUSCODE}). Please contact support.`;
                  warningMessageModal.show();
                }
              }
            }
          } catch (error) {
            console.error('Error checking payment status:', error);
          }
        }, 5000); // Check every 5 seconds

        // Stop checking after 5 minutes (300000 ms) to prevent infinite checking
        setTimeout(() => {
          clearInterval(checkPaymentStatus);
          console.log("Payment status checking timeout - stopped checking after 5 minutes");
        }, 300000);

      } catch (error) {
        console.error("Error storing order:", error);
        warningMessageModal = new bootstrap.Modal(warning_message_modal);
        warningMsgDescriptionHead.innerText = "Error storing order details.";
        warningMessageModal.show();
      }

      setTimeout(() => URL.revokeObjectURL(url), 5000);

    } else {
      warningMessageModal = new bootstrap.Modal(warning_message_modal);
      warningMsgDescriptionHead.innerText = "Fill all the informations.";
      warningMessageModal.show();
    }

    // if (phone && email) {
    //   try {
    //     const payload = {
    //       subscriberId: phone,
    //       adminId: email,
    //     };

    //     const response = await fetch(`${process.env.NEXT_PRIVATE_URL3}`, {
    //       method: 'POST',
    //       headers: {
    //         "Content-type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //         "X-Secret": `${process.env.X_SECRET}`,
    //       },
    //       body: JSON.stringify(payload),
    //     });

    //     const result = await response.json();
    //     if (result.success && result.jwt) {
    //       localStorage.setItem('user_token', result.jwt);
    //       console.log("User jwt: ", result.jwt);
    //       // successMessageModal = new bootstrap.Modal(success_message_modal);
    //       // successMsgDescriptionHead.innerText = "User Token successfull!";
    //       // successMessageModal.show();
    //     } else {
    //       warningMessageModal = new bootstrap.Modal(warning_message_modal);
    //       warningMsgDescriptionHead.innerText = result.response;
    //       warningMessageModal.show();
    //     }
    //   } catch (error) {
    //     console.error('Error updating cutomer email:', error);
    //   }
    // } else {
    //   warningMessageModal = new bootstrap.Modal(warning_message_modal);
    //   warningMsgDescriptionHead.innerText = "Missing parameters!";
    //   warning_message_modal.addEventListener('hidden.bs.modal', () => {
    //     assveca.show();
    //   });
    //   warningMessageModal.show();
    // }
  };


  //product buying confirmation process
  // const handleBuyConfirmationClick = async () => {
  //   let user = localStorage.getItem('customer_id');

  //   try {

  //     const payload = {
  //       user,
  //       productName,
  //     };

  //     const postData = await fetch(`${process.env.NEXT_PUBLIC_URL10}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const result = await postData.json();
  //     if (result.message === "Product Count!") {
  //       if (result.subscriptionsCount >= 1) {
  //         SubscriptionsWarningSubscribeViewAsk(result.subscriptionsCount);
  //       } else {
  //         SubscriptionsSubscribeViewAsk();
  //       }

  //     } else {
  //       SubscriptionsSubscribeViewAsk();
  //     }

  //   } catch (error) {
  //     console.error('Error adding product:', error);
  //   }
  // }

  // const hasFeature = (featuresString, feature) => {
  //   const regex = new RegExp(`\\b${feature}\\b`, 'i');
  //   return regex.test(featuresString);
  // };

  let aswva;
  let productSubscribeWarningMessageModal;

  //same user same product buying confirmation
  // const SubscriptionsWarningSubscribeViewAsk = (x) => {
  //   productSubscribeWarningMessageModal = document.getElementById("admin_product_subscribe_warning_message_modal");
  //   const subscribeWarningMsgDescriptionHead = document.getElementById("adminSubscribeWarningMsgDescriptionHead");
  //   if (x > 1) {
  //     subscribeWarningMsgDescriptionHead.innerText = "You already subscribed this item " + x + " times.\nDo you want to subscribe it again ?";
  //   } else {
  //     subscribeWarningMsgDescriptionHead.innerText = "You already subscribed this item " + x + " time.\nDo you want to subscribe it again ?";
  //   }
  //   aswva = new bootstrap.Modal(productSubscribeWarningMessageModal);
  //   aswva.show();
  // }

  let assva;
  let productSubscribeSelectionMessageModal;

  //buying confirmation
  function SubscriptionsSubscribeViewAsk() {

    productSubscribeSelectionMessageModal = document.getElementById("admin_product_subscribe_selection_message_modal");
    const subscribeselectionMsgDescriptionHead = document.getElementById("adminSubscribeselectionMsgDescriptionHead");
    subscribeselectionMsgDescriptionHead.innerText = "Do you want to subscribe this product ? ";
    assva = new bootstrap.Modal(productSubscribeSelectionMessageModal);
    assva.show();

  }

  let assvea;

  //buying email confirmation
  // function SubscriptionsSubscribeViewEmailAsk() {

  //   if (email == null || email == '') {
  //     SubscriptionsSubscribeViewEmailChangeAsk();
  //   } else {
  //     const productSubscribeEmailSelectionMessageModal = document.getElementById("admin_product_subscribe_email_selection_message_modal");
  //     const subscribeEmailSelectionMsgDescriptionHead1 = document.getElementById("adminSubscribeEmailSelectionMsgDescriptionHead1");
  //     const subscribeEmailSelectionMsgDescriptionHead2 = document.getElementById("adminSubscribeEmailSelectionMsgDescriptionHead2");
  //     const subscribeEmailSelectionMsgDescriptionHead3 = document.getElementById("adminSubscribeEmailSelectionMsgDescriptionHead3");
  //     subscribeEmailSelectionMsgDescriptionHead1.innerText = "Do you Wish to subscribe for";
  //     subscribeEmailSelectionMsgDescriptionHead2.innerText = productName.toString();
  //     subscribeEmailSelectionMsgDescriptionHead3.innerText = "With the following email address for \n User : " + user;
  //     assvea = new bootstrap.Modal(productSubscribeEmailSelectionMessageModal);
  //     assvea.show();
  //   }

  // }

  let assveca;

  //buying new email confirmation
  function SubscriptionsSubscribeViewEmailChangeAsk() {

    const productSubscribeEmailChangeMessageModal = document.getElementById("admin_product_subscribe_email_change_message_modal");
    const subscribeEmailChangeMsgDescriptionHead1 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead1");
    const subscribeEmailChangeMsgDescriptionHead2 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead2");
    const subscribeEmailChangeMsgDescriptionHead3 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead3");
    const subscribeEmailChangeMsgDescriptionHead4 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead4");
    const subscribeEmailChangeMsgDescriptionHead5 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead5");
    const subscribeEmailChangeMsgDescriptionHead6 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead6");
    const subscribeEmailChangeMsgDescriptionHead7 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead7");
    const subscribeEmailChangeMsgDescriptionHead8 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead8");
    const subscribeEmailChangeMsgDescriptionHead9 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead9");
    subscribeEmailChangeMsgDescriptionHead1.innerText = "Do you Wish to subscribe for";
    subscribeEmailChangeMsgDescriptionHead2.innerText = productName.toString();
    subscribeEmailChangeMsgDescriptionHead3.innerText = "First Name :";
    subscribeEmailChangeMsgDescriptionHead4.innerText = "Last Name : ";
    subscribeEmailChangeMsgDescriptionHead5.innerText = "Contact Number : ";
    subscribeEmailChangeMsgDescriptionHead6.innerText = "Email : ";
    subscribeEmailChangeMsgDescriptionHead7.innerText = "*The Kaspersky key will be send to this email.";
    subscribeEmailChangeMsgDescriptionHead8.innerText = "City : ";
    subscribeEmailChangeMsgDescriptionHead9.innerText = "Address : ";
    assveca = new bootstrap.Modal(productSubscribeEmailChangeMessageModal);
    assveca.show();

  }


  return (
    <>
      <div id="productListViewId">
        <div className="col-12 text-center mt-3 mb-3">
          <span className="title06">PRODUCT LIST</span>
        </div>

        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="row justify-content-center p-3">
                <div className="horizontal-scroll-container">
                  {loading ? <p>Loading...</p> : <Product products={products} onProductClick={handleProductClick} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="singleAdminProductViewId" className="d-none">
        <div className="col-12">
          <div className="col-12 mt-3 mb-3 p-3">
            <span className="title21" onClick={productListHome}><i class="bi bi-arrow-bar-left"></i>&nbsp;Product List /</span><span className="title06"> PRODUCT DETAILS</span>
          </div>

          <div className="container align-items-center justify-content-center">
            <div className="col-12 border-3 cardBoxView">
              <div className="text-black row">
                <div className="col-lg-5 col-12 p-3">
                  <div className="row">
                    <div className="col-12 mb-3">
                      <div className='row  justify-content-center align-content-center'>
                        <Image src={`${process.env.NEXT_PUBLIC_URL2 + productImageLocation}`} alt="No picture" className="productImage container-fluid" width={1000} height={1000} />
                      </div>
                    </div>
                    <span className="title18 text-start">ANNUAL PLAN</span><br />
                    <span className="title14">LKR {amount}</span><br />
                    <span className="title02 text-center">All prices are inclusive of taxes</span>
                  </div>
                </div>
                <div className="col-lg-7 col-12 p-3">
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12">
                          <span className="title15">{productName}</span><br /><br />
                        </div>
                      </div>
                    </div>
                    <span className="title16 text-start col-12">{descriptionTitle}</span><br /><br />
                    <span className="title02 text-start col-11">{description}</span><br /><br />
                    <div className="col-12 mb-3">
                      <div className="row">
                        {mainProductFeatures.split(' | ').map((feature, index) => (
                          <div className="col-12 CardfeatureText" key={index}>
                            <i className="bi bi-check fa-3x checkView"></i>&nbsp;&nbsp;&nbsp;&nbsp;<span className="title17">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="col-lg-7 offset-lg-5 col-12 btn9 p-2" onClick={SubscriptionsSubscribeViewEmailChangeAsk}><span className="title10"></span>Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
  #singleAdminProductViewId {
    animation: fadeIn 0.4s ease;
  }

  /* CARD WRAPPER */
  .cardBoxView {
    background: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(22px) saturate(180%);
    -webkit-backdrop-filter: blur(22px) saturate(180%);
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 10px 35px rgba(0,0,0,0.15);
    border: 1px solid rgba(255,255,255,0.45);
    transition: 0.3s ease;
  }

  .cardBoxView:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 40px rgba(0,0,0,0.22);
  }

  /* TITLE LEFT FIX */
  .title18 {
    margin-left: 180px;
    text-align: left;
  }

  /* PRODUCT IMAGE */
  .productImage {
    border-radius: 18px;
    box-shadow: 0 6px 25px rgba(0,0,0,0.25);
    transition: 0.3s ease;
  }

  .productImage:hover {
    transform: scale(1.03);
  }

  /* TEXT STYLES */
  .title15 {
    font-size: 1.8rem;
    font-weight: 800;
    color: #003366;
  }

  .title18 {
    font-weight: 700;
    font-size: 1.1rem;
    color: #006c3a;
  }

  .title14 {
    font-size: 2rem;
    font-weight: 700;
    color: #003366;
  }

  .title16 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #004a8f;
  }

  .title02 {
    font-size: 0.85rem;
    color: #444;
  }

  /* ===============================
     FEATURE LIST (UPDATED)
     =============================== */
  .CardfeatureText {
    background: rgba(255,255,255,0.6);
    backdrop-filter: blur(14px);
    border-radius: 10px;
    padding: 12px 16px;
    margin-bottom: 12px;
    display: flex;
    align-items: flex-start; /* ⭐ icon stays at top */
    gap: 14px;               /* ⭐ spacing between icon + text */
    box-shadow: 0 2px 12px rgba(0,0,0,0.12);
    transition: 0.25s ease;
  }

  .CardfeatureText:hover {
    transform: translateX(6px);
    background: rgba(255,255,255,0.85);
    box-shadow: 0 6px 18px rgba(0,0,0,0.20);
  }

  /* FEATURE TEXT FIX */
  .title17 {
    line-height: 1.45; /* ⭐ adds more space when 2 lines */
    display: block;
  }

  /* Check Icon */
  .checkView {
    font-size: 20px;
    color: #009639;
    font-weight: bold;
    margin-top: 3px;  /* ⭐ aligns perfectly with top text */
  }

  /* BUY BUTTON */
  .btn9 {
    background: linear-gradient(135deg, #009639, #007a2d);
    color: white;
    font-size: 1.15rem;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    transition: 0.25s ease;
    box-shadow: 0 6px 20px rgba(0,150,57,0.3);
  }

  .btn9:hover {
    background: linear-gradient(135deg, #00b44a, #008f38);
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,150,57,0.45);
  }

  /* BACK BUTTON */
  .title21 {
    cursor: pointer;
    color: #004a8f;
    font-weight: 700;
    transition: 0.2s ease;
  }

  .title21:hover {
    color: #009639;
  }

  /* ANIMATIONS */
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .title14 { font-size: 1.6rem; }
    .title15 { font-size: 1.6rem; }
    .productImage { border-radius: 14px; }
    .btn9 { width: 100%; }
    .title18 { margin-left: 0; }
  }
`}</style>

      </div>

      {/* <div class="modal justify-content-center align-content-center" tabIndex="-1" id="admin_product_subscribe_selection_message_modal">
        <div class="modal-dialog position-relative p-3" style={{ maxWidth: "450px" }}>
          <div class="modal-content">
            <div class="modal-header bg-success">
              <h5 class="modal-title text01 w-100">
                <i class="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>INFORMATION !</span>
              </h5>
              <button type="button" class="btn-close bg-white" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row g-2">
                <div class="col-12">
                  <h3 class="form-label text-center">
                    <span class="text03" id="adminSubscribeselectionMsgDescriptionHead"></span><br />
                  </h3><br /><br />
                  <div className="col-12">
                    <div className="row justify-content-center">
                      <div class="col-4 p-3">
                        <div class="row justify-content-center">
                          <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={SubscriptionsSubscribeViewEmailAsk}>
                            YES</button>
                        </div>
                      </div>
                      <div class="col-4 p-3">
                        <div class="row justify-content-center">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">NO</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="modal justify-content-center align-content-center" tabIndex="-1" id="admin_product_subscribe_email_selection_message_modal">
        <div className="modal-dialog position-relative p-3" style={{ maxWidth: "450px" }}>
          <div className="modal-content">
            <div className="modal-header bg-success">
              <h5 className="modal-title text01 w-100">
                <i className="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>CONFIRMATION !</span>
              </h5>
              <button type="button" className="btn-close bg-white" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row g-2">
                <div className="col-12">
                  <h3 className="form-label text-center">
                    <span className="text03" id="adminSubscribeEmailSelectionMsgDescriptionHead1"></span><br />
                    <span className="text05" id="adminSubscribeEmailSelectionMsgDescriptionHead2"></span><br />
                    <span className="text03" id="adminSubscribeEmailSelectionMsgDescriptionHead3"></span><br />

                  </h3>
                  <div className="col-12">
                    <div className="row justify-content-center">
                      <div className='col-12'>
                        <div className='row p-3'>
                          <input type="email" className="form-control text-center" id="subscribeEmail" value={email} />
                        </div>
                      </div>
                      <div className="col-5 p-3">
                        <div className="row justify-content-center">
                          <button type="button" className="btn btn-secondary btncat" data-bs-dismiss="modal" onClick={SubscriptionsSubscribeViewEmailChangeAsk}>
                            UPDATE EMAIL
                          </button>
                        </div>
                      </div>
                      <div className="col-5 p-3">
                        <div className="row justify-content-center">
                          <button type="button" className="btn btn-success btncat" data-bs-dismiss="modal" onClick={handleBuyNowClick}>CONFIRM</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* container or box for customer details entering */}

      <div className="modal justify-content-center align-content-center" tabIndex="-1" id="admin_product_subscribe_email_change_message_modal">
        <div className="modal-dialog position-relative p-3" style={{ maxWidth: "650px" }}>
          <div className="modal-content">
            <div className="modal-header bg-success">
              <h5 className="modal-title text01 w-100">
                <i className="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>CONFIRMATION !</span>
              </h5>
              <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="row g-2">
                <div className="col-12">
                  <h3 className="form-label text-center">
                    <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead1"></span><br />
                    <span className="text05" id="adminSubscribeEmailChangeMsgDescriptionHead2"></span><br />
                  </h3>

                  <form>
                    <div className="col-12 mx-auto" style={{ maxWidth: "520px" }}>
                      {/* First Name */}
                      <div className="mb-3">
                        <h3 className="form-label text-start">
                          <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead3"></span>
                        </h3>
                        <input
                          type="text"
                          className="form-control form-control-sm text-center mx-auto fs-6"
                          id="userFName"
                          placeholder="Victor"
                          title="Please enter your first name"
                          required
                          style={{ width: "320px", maxWidth: "100%" }}
                        />
                      </div>

                      {/* Last Name */}
                      <div className="mb-3">
                        <h3 className="form-label text-start">
                          <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead4"></span>
                        </h3>
                        <input
                          type="text"
                          className="form-control form-control-sm text-center mx-auto fs-6"
                          id="userLName"
                          placeholder="Tylor"
                          title="Please enter your last name"
                          required
                          style={{ width: "320px", maxWidth: "100%" }}
                        />
                      </div>

                      {/* Contact Number */}
                      <div className="mb-3">
                        <h3 className="form-label text-start">
                          <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead5"></span>
                        </h3>
                        <input
                          type="text"
                          className="form-control form-control-sm text-center mx-auto fs-6"
                          id="userContactNumber"
                          placeholder="07xxxxxxxx"
                          title="Please enter a 10-digit phone number"
                          inputMode="numeric"
                          maxLength={10}
                          pattern="^\d{10}$"
                          onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10); }}
                          required
                          style={{ width: "320px", maxWidth: "100%" }}
                        />
                      </div>

                      {/* City */}
                      <div className="mb-3">
                        <h3 className="form-label text-start">
                          <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead8"></span>
                        </h3>
                        <input
                          type="text"
                          className="form-control form-control-sm text-center mx-auto fs-6"
                          id="city"
                          placeholder="Kurunegala"
                          title="Please enter your city"
                          required
                          style={{ width: "320px", maxWidth: "100%" }}
                        />
                      </div>

                      {/* Email */}
                      <div className="mb-1">
                        <h3 className="form-label text-start">
                          <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead6"></span>
                        </h3>
                        <input
                          type="email"
                          className="form-control form-control-sm text-center mx-auto fs-6"
                          id="userEmail"
                          placeholder="example@gmail.com"
                          title="Please enter a valid email address"
                          required
                          style={{ width: "320px", maxWidth: "100%" }}
                        />
                      </div>

                      {/* Email note */}
                      <h3 className="form-label text-start pt-1">
                        <span className="text07" id="adminSubscribeEmailChangeMsgDescriptionHead7"></span>
                      </h3>

                      {/* Address */}
                      <div className="mb-3">
                        <h3 className="form-label text-start">
                          <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead9"></span>
                        </h3>
                        <input
                          type="text"
                          className="form-control form-control-sm text-center mx-auto fs-6"
                          id="address"
                          placeholder="No.107, Dambakandawatte"
                          title="Please enter your address"
                          required
                          style={{ width: "320px", maxWidth: "100%" }}
                        />
                      </div>

                      {/* Buttons */}
                      <div className="row justify-content-center mt-3 g-3">
                        <div className="col-12 col-sm-5">
                          <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">
                            CANCEL
                          </button>
                        </div>
                        <div className="col-12 col-sm-5">
                          <button type="button" className="btn btn-success w-100" onClick={emailConfirmation}>
                            CONFIRM
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* container or box for customer details entering */}



      {/* styles for the customer data entering box or container */}

      <style>
        {`

/* ===============================
   ADMIN EMAIL CHANGE MODAL STYLES
=================================*/

#admin_product_subscribe_email_change_message_modal .modal-dialog {
  max-width: 650px;
  margin: 1.5rem auto;
  transition: all 0.3s ease-in-out;
}

#admin_product_subscribe_email_change_message_modal .modal-content {
  border: none;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  animation: fadeInUp 0.4s ease-in-out;
}

#admin_product_subscribe_email_change_message_modal .modal-header {
  background: linear-gradient(90deg, #198754, #28a745);
  border-bottom: none;
  padding: 1rem 1.25rem;
}

#admin_product_subscribe_email_change_message_modal .modal-header .modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  display: center;
  align-items: center;
}

#admin_product_subscribe_email_change_message_modal .modal-header .btn-close {
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

#admin_product_subscribe_email_change_message_modal .modal-header .btn-close:hover {
  opacity: 1;
}

#admin_product_subscribe_email_change_message_modal .modal-body {
  padding: 2rem 1.5rem;
  background: #ffffff;
}

#admin_product_subscribe_email_change_message_modal input.form-control {
  border-radius: 0.6rem;
  border: 1.5px solid #ced4da;
  transition: all 0.2s ease;
  box-shadow: none;
}

#admin_product_subscribe_email_change_message_modal input.form-control:focus {
  border-color: #198754;
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}

#admin_product_subscribe_email_change_message_modal h3.form-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #444;
}

#admin_product_subscribe_email_change_message_modal .btn {
  border-radius: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 0.5rem 1rem;
  transition: all 0.25s ease;
}

#admin_product_subscribe_email_change_message_modal .btn-success {
  background: linear-gradient(90deg, #198754, #28a745);
  border: none;
}

#admin_product_subscribe_email_change_message_modal .btn-success:hover {
  background: linear-gradient(90deg, #157347, #1f8f3c);
  transform: translateY(-2px);
}

#admin_product_subscribe_email_change_message_modal .btn-secondary {
  background: #6c757d;
  border: none;
}

#admin_product_subscribe_email_change_message_modal .btn-secondary:hover {
  background: #5a6268;
  transform: translateY(-2px);
}

/* Subtext color */
#admin_product_subscribe_email_change_message_modal .text07 {
  font-size: 0.85rem;
  color: #e74c3c;
}

/* Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 576px) {
  #admin_product_subscribe_email_change_message_modal .modal-dialog {
    margin: 1rem;
  }

  #admin_product_subscribe_email_change_message_modal .modal-body {
    padding: 1.25rem;
  }

  #admin_product_subscribe_email_change_message_modal input.form-control {
    width: 100% !important;
  }

  #admin_product_subscribe_email_change_message_modal .btn {
    width: 100%;
  }
}
`}
      </style>


      {/* styles for the customer data entering box box or container  */}


      <div class="modal justify-content-center align-content-center" tabIndex="-1" id="admin_product_subscribe_warning_message_modal">
        <div class="modal-dialog position-relative p-3" style={{ maxWidth: "450px" }}>
          <div class="modal-content">
            <div class="modal-header bg-danger">
              <h5 class="modal-title text01 w-100">
                <i class="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>WARNING !</span>
              </h5>
              <button type="button" class="btn-close bg-white" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row g-2">
                <div class="col-12">
                  <h3 class="form-label text-center">
                    <span class="text03" id="adminSubscribeWarningMsgDescriptionHead"></span><br />
                  </h3><br /><br />
                  <div className="col-12">
                    <div className="row justify-content-center">
                      <div class="col-4 p-3">
                        <div class="row justify-content-center">
                          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={SubscriptionsSubscribeViewAsk}>
                            YES</button>
                        </div>
                      </div>
                      <div class="col-4 p-3">
                        <div class="row justify-content-center">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">NO</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <WarningMessageModal />
      <SuccessMessageModal />

      <div className="modal" tabIndex="-1" id="success_message_modal2">
        <div className="modal-dialog position-relative top-0 end-0 p-3" style={{ maxWidth: "450px" }}>
          <div className="modal-content">
            <div className="modal-header bg-success" id="msgModalHeader2">
              <h5 className="modal-title text01 w-100">
                <span>SUCCESS</span>
              </h5>
              <button type="button" className="btn-close bg-white" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="row g-2">

                <div className="col-12">
                  <h3 className="form-label text-center">
                    <span className="text04" id="successMsgDescriptionHead2"></span><br />
                    <span className="text04" id="successMsgDescriptionHead22"></span><br />
                  </h3><br /><br />
                  <div className="container col-4 p-3">
                    <div className="row justify-content-center">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                        id="btnText">DONE</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}