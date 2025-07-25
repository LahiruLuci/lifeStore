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

  //get the token from backend 
  const emailConfirmation = async () => {
    const first_name = document.getElementById("userFName").value;
    const last_name = document.getElementById("userLName").value;
    const phone = document.getElementById("userContactNumber").value;
    const email = document.getElementById("userEmail").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const order_id = "ORDER_" + Date.now();
    const items = productName;
    const currency = "LKR";

    let success_message_modal = document.getElementById("success_message_modal");
    let successMsgDescriptionHead = document.getElementById("successMsgDescriptionHead");
    let warning_message_modal = document.getElementById("warning_message_modal");
    let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead"); 

    console.log("first name ", first_name);

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
      console.log(html);

      //window.open(html.url, "_blank");
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const payhereWindow = window.open(url, "_blank");

      setTimeout(() => URL.revokeObjectURL(url), 5000);
      // if (data && data.url) {
      //     // Redirect to the PayHere URL
      //     window.location.href = data.url;
      //   } else {
      //     // Handle error case
      //     console.error('No URL received from PayHere');
      //     warningMessageModal = new bootstrap.Modal(warning_message_modal);
      //     warningMsgDescriptionHead.innerText = "Payment initialization failed";
      //     warningMessageModal.show();
      //   }
    }

    // if (userFName && userContactNumber && userEmail) {
    //   try {
    //     const payload = {
    //       subscriberId: userContactNumber,
    //       adminId: userEmail,
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
    //       successMessageModal = new bootstrap.Modal(success_message_modal);
    //       successMsgDescriptionHead.innerText = "User Token successfull!";
    //       successMessageModal.show();
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
    //   warningMsgDescriptionHead.innerText = "Enter all the details!";
    //   warning_message_modal.addEventListener('hidden.bs.modal', () => {
    //     assveca.show();
    //   });
    //   warningMessageModal.show();
    // }
  };


  //product buying confirmation process
  const handleBuyConfirmationClick = async () => {
    let user = localStorage.getItem('customer_id');

    try {

      const payload = {
        user,
        productName,
      };

      const postData = await fetch(`${process.env.NEXT_PUBLIC_URL10}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await postData.json();
      if (result.message === "Product Count!") {
        if (result.subscriptionsCount >= 1) {
          SubscriptionsWarningSubscribeViewAsk(result.subscriptionsCount);
        } else {
          SubscriptionsSubscribeViewAsk();
        }

      } else {
        SubscriptionsSubscribeViewAsk();
      }

    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  const hasFeature = (featuresString, feature) => {
    const regex = new RegExp(`\\b${feature}\\b`, 'i');
    return regex.test(featuresString);
  };

  let aswva;
  let productSubscribeWarningMessageModal;

  //same user same product buying confirmation
  const SubscriptionsWarningSubscribeViewAsk = (x) => {
    productSubscribeWarningMessageModal = document.getElementById("admin_product_subscribe_warning_message_modal");
    const subscribeWarningMsgDescriptionHead = document.getElementById("adminSubscribeWarningMsgDescriptionHead");
    if (x > 1) {
      subscribeWarningMsgDescriptionHead.innerText = "You already subscribed this item " + x + " times.\nDo you want to subscribe it again ?";
    } else {
      subscribeWarningMsgDescriptionHead.innerText = "You already subscribed this item " + x + " time.\nDo you want to subscribe it again ?";
    }
    aswva = new bootstrap.Modal(productSubscribeWarningMessageModal);
    aswva.show();
  }

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
                    <span className="title02 text-center">All prices are exclusive of taxes</span>
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

      <div className="modal justify-content-center align-content-center" tabIndex="-1" id="admin_product_subscribe_email_change_message_modal">
        <div className="modal-dialog position-relative p-3" style={{ maxWidth: "650px" }}>
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
                    <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead1"></span><br />
                    <span className="text05" id="adminSubscribeEmailChangeMsgDescriptionHead2"></span><br />
                    {/* <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead3"></span><br /> */}
                  </h3>
                  <form>
                    <div className="col-12">
                      <div className="row justify-content-center">
                        <div className="row">
                          {/* left side column */}
                          <div className="col-md-6">
                            <h3 className="form-label text-center">
                              <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead3"></span><br />
                            </h3>
                            <div className='col-12'>
                              <div className='row p-2'>
                                <input type="text" className="form-control form-control-lg text-center w-100" id="userFName" placeholder="Victor" title="Please enter your first name" required style={{ minWidth: '250px' }} />
                              </div>
                            </div>
                            <br />

                            <h3 className="form-label text-center">
                              <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead5"></span><br />
                            </h3>
                            <div className='col-12'>
                              <div className='row p-2'>
                                <input type="text" className="form-control form-control-lg text-center w-100" id="userContactNumber" placeholder="07xxxxxxxx" title="Please enter a valid telephone number" pattern="^(\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$" required style={{ minWidth: '250px' }} />
                              </div>
                            </div>
                            <br />

                            <h3 className="form-label text-center">
                              <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead6"></span><br />
                            </h3>
                            <div className='col-12'>
                              <div className='row p-2 pb-0'>
                                <input type="email" className="form-control form-control-lg text-center w-100" id="userEmail" placeholder="example@gmail.com" title="Please enter a valid email address" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required style={{ minWidth: '250px' }} />
                              </div>
                            </div>
                            <h3 className="form-label text-left pt-0">
                              <span className="text07" id="adminSubscribeEmailChangeMsgDescriptionHead7"></span><br />
                            </h3>
                          </div>

                          {/* right side column */}
                          <div className="col-md-6">
                            <h3 className="form-label text-center">
                              <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead4"></span><br />
                            </h3>
                            <div className='col-12'>
                              <div className='row p-2'>
                                <input type="text" className="form-control form-control-lg text-center w-100" id="userLName" placeholder="Tylor" title="Please enter your last name" required style={{ minWidth: '250px' }} />
                              </div>
                            </div>
                            <br />
                            <h3 className="form-label text-center">
                              <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead8"></span><br />
                            </h3>
                            <div className='col-12'>
                              <div className='row p-2'>
                                <input type="text" className="form-control form-control-lg text-center w-100" id="city" placeholder="Colombo" title="Please enter your last name" required style={{ minWidth: '250px' }} />
                              </div>
                            </div>
                            <br />
                            <h3 className="form-label text-center">
                              <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead9"></span><br />
                            </h3>
                            <div className='col-12'>
                              <div className='row p-2'>
                                <input type="text" className="form-control form-control-lg text-center w-100" id="address" placeholder="Colombo" title="Please enter your last name" required style={{ minWidth: '250px' }} />
                              </div>
                            </div>
                            <br />
                          </div>
                        </div>

                        <div className="row justify-content-center mt-3 gap-4">
                          <div className="col-5 p-2">
                            <div className="row justify-content-center">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                CANCEL
                              </button>
                            </div>
                          </div>
                          <div className="col-5 p-2">
                            <div className="row justify-content-center">
                              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={emailConfirmation}>CONFIRM</button>
                            </div>
                          </div>
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
