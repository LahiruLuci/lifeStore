"use client"
import jwt from 'jsonwebtoken';
import { useEffect, useState } from "react";
import Product from "./productView";
import { getProductsProps } from './productView';
import Image from "next/image";
import WarningMessageModal from "../mod/WarningMessageModal";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [user, setUser] = useState('');
  const [descriptionTitle, setDescriptionTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mainProductFeatures, setMainProductFeatures] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [licensekey, setLicensekey] = useState('');
  let warningMessageModal;
  let successMessageModal;

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

  const handleProductClick = (product) => {
    setEmail(localStorage.getItem('user_email'));
    setUser(localStorage.getItem('customer_id'));
    setSelectedProduct(product);
    setProductName(product.PRODUCTNAME);
    setProductCode(product.PRODUCTCODE);
    setDescriptionTitle(product.DESCRIPTIONTITLE);
    setDescription(product.DESCRIPTION);
    setMainProductFeatures(product.MAINPRODUCTFEATURES.split(' | ').join('\n'));
    setAmount(product.AMOUNT);
  };

  const productListHome = () => {
    const productListViewId = document.getElementById("productListViewId");
    const singleProductViewId = document.getElementById("singleProductViewId");
    productListViewId.classList.remove("d-none");
    singleProductViewId.classList.add("d-none");
  }

  const BuySelectedPtoduct = async () => {
    ssva.hide();
    let user = localStorage.getItem('customer_id');

    try {

      const paycreate = {
        user,
        productName,
        licensekey,
        amount,
      };

      const postData = await fetch(`${process.env.NEXT_PUBLIC_URL13}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paycreate),
      });

      const result = await postData.json();
      if (result.message === "Product Subscribed Successfully!") {
        successMsgDescriptionHead.innerText = "Product Subscribed Successfully.";

        success_message_modal.addEventListener('hidden.bs.modal', () => {
          window.location.href = '/customerSubscription';
        });

        successMessageModal.show();
      }

    } catch (error) {
      console.error('Error adding product:', error);
    }

  };

  const generateUUID = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleBuyNowClick = async () => {

    const warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
    const warning_message_modal = document.getElementById("warning_message_modal");
    const successMsgDescriptionHead = document.getElementById("successMsgDescriptionHead");
    const success_message_modal = document.getElementById("success_message_modal");
    const subscriberId = `${user}_${productCode}_${generateUUID()}`;
    const email = localStorage.getItem("user_email");
    alert(subscriberId);

    const payload1 = {
      email,
      productName,
      productCode,
      amount,
    };

    try {

      const jwt = localStorage.getItem("customerToken");

      const postData1 = await fetch(`${/*process.env.NEXT_PRIVATE_URL4*/abc}${jwt}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(payload1),
      });
      const result1 = await postData1.json();
      if (result1.success) {
        const resultProps = result1.response;
        if (resultProps.role == "customer" && !resultProps.subscriberId == null || resultProps.role == "customer" && !resultProps.subscriberId == "") {
          // alert(resultProps.subscriberId + " "+ resultProps.role + " "+ resultProps.jwt);

          const payload2 = {
            subscriberId,
            user,
            productName,
            licensekey,
            amount,
          };

          const postData2 = await fetch(`${process.env.NEXT_PUBLIC_URL13}`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(payload2),
          });
          const result2 = await postData2.json();
          if (result2.message == "Product Subscribed Successfully!") {
            successMessageModal = new bootstrap.Modal(success_message_modal);
            successMsgDescriptionHead.innerText = "Product Subscribed Successfully!";
            success_message_modal.addEventListener('hidden.bs.modal', () => {
              window.location.href = '/customerSubscription';
            });
            successMessageModal.show();
          } else {
            warningMessageModal = new bootstrap.Modal(warning_message_modal);
            warningMsgDescriptionHead.innerText = "Subscription proccess Failed.";
            warningMessageModal.show();
          }
        } else {
          warningMessageModal = new bootstrap.Modal(warning_message_modal);
          warningMsgDescriptionHead.innerText = "Invalid Subscription.";
          warningMessageModal.show();
        }
      } else {
        warningMessageModal = new bootstrap.Modal(warning_message_modal);
        warningMsgDescriptionHead.innerText = "Something went Wrong!";
        warning_message_modal.addEventListener('hidden.bs.modal', () => {
          window.location.href = '/customerProductList';
        });
        warningMessageModal.show();
      }


    } catch (error) {
      console.error('Error generating token:', error);
    }
  };

  const emailConfirmation = async () => {
    const changeEmail1 = document.getElementById("changeEmail1").value;
    const changeEmail2 = document.getElementById("changeEmail2").value;
    let success_message_modal = document.getElementById("success_message_modal");
    const customerEmail = localStorage.getItem("user_email");
    const customer_id = localStorage.getItem("customer_id");

    if (changeEmail1 == changeEmail2) {
      localStorage.setItem("user_email", changeEmail1);

      if (customerEmail) {
        try {

          const payload = {
            userId: customer_id,
            email: customerEmail,
          };

          const response = await fetch(`${process.env.NEXT_PUBLIC_URL18}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'customerDetails/json',
            },
            body: JSON.stringify(payload),
          });

          const result = await response.json();
          if (result.message == "Email updated successfully!") {
            localStorage.setItem('user_email', result.updateEmail);
            successMessageModal = new bootstrap.Modal(success_message_modal);
            successMsgDescriptionHead.innerText = "Email updated successfully!";
            success_message_modal.addEventListener('hidden.bs.modal', () => {
              handleBuyNowClick();
            });
            successMessageModal.show();
          }
        } catch (error) {
          console.error('Error updating cutomer email:', error);
        }
      } else {
        alert("Please enter your email correctly!");
      }
    }
  }

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

  let swva;
  let productSubscribeWarningMessageModal;

  const SubscriptionsWarningSubscribeViewAsk = (x) => {
    productSubscribeWarningMessageModal = document.getElementById("product_subscribe_warning_message_modal");
    const subscribeWarningMsgDescriptionHead = document.getElementById("subscribeWarningMsgDescriptionHead");
    if (x > 1) {
      subscribeWarningMsgDescriptionHead.innerText = "You already subscribed this item " + x + " times.\nDo you want to subscribe it again ?";
    } else {
      subscribeWarningMsgDescriptionHead.innerText = "You already subscribed this item " + x + " time.\nDo you want to subscribe it again ?";
    }
    swva = new bootstrap.Modal(productSubscribeWarningMessageModal);
    swva.show();
  }

  let ssva;

  function SubscriptionsSubscribeViewAsk() {

    const productSubscribeSelectionMessageModal = document.getElementById("product_subscribe_selection_message_modal");
    const subscribeselectionMsgDescriptionHead = document.getElementById("subscribeselectionMsgDescriptionHead");
    subscribeselectionMsgDescriptionHead.innerText = "Do you want to subscribe this product ? ";
    ssva = new bootstrap.Modal(productSubscribeSelectionMessageModal);
    ssva.show();

  }

  let ssvea;

  function SubscriptionsSubscribeViewEmailAsk() {

    if (!localStorage.getItem('user_email')) {
      const productSubscribeEmailSelectionMessageModal = document.getElementById("product_subscribe_email_selection_message_modal");
      const subscribeEmailSelectionMsgDescriptionHead1 = document.getElementById("subscribeEmailSelectionMsgDescriptionHead1");
      const subscribeEmailSelectionMsgDescriptionHead2 = document.getElementById("subscribeEmailSelectionMsgDescriptionHead2");
      const subscribeEmailSelectionMsgDescriptionHead3 = document.getElementById("subscribeEmailSelectionMsgDescriptionHead3");
      subscribeEmailSelectionMsgDescriptionHead1.innerText = "Do you Wish to subscribe for";
      subscribeEmailSelectionMsgDescriptionHead2.innerText = productName.toString();
      subscribeEmailSelectionMsgDescriptionHead3.innerText = "With the following email address for \n User : " + user;
      ssvea = new bootstrap.Modal(productSubscribeEmailSelectionMessageModal);
      ssvea.show();
    } else {
      SubscriptionsSubscribeViewEmailChangeAsk();
    }

  }

  let ssveca;

  function SubscriptionsSubscribeViewEmailChangeAsk() {

    const productSubscribeEmailChangeMessageModal = document.getElementById("product_subscribe_email_change_message_modal");
    const subscribeEmailChangeMsgDescriptionHead1 = document.getElementById("subscribeEmailChangeMsgDescriptionHead1");
    const subscribeEmailChangeMsgDescriptionHead2 = document.getElementById("subscribeEmailChangeMsgDescriptionHead2");
    const subscribeEmailChangeMsgDescriptionHead3 = document.getElementById("subscribeEmailChangeMsgDescriptionHead3");
    const subscribeEmailChangeMsgDescriptionHead4 = document.getElementById("subscribeEmailChangeMsgDescriptionHead4");
    subscribeEmailChangeMsgDescriptionHead1.innerText = "Do you Wish to subscribe for";
    subscribeEmailChangeMsgDescriptionHead2.innerText = productName.toString();
    subscribeEmailChangeMsgDescriptionHead3.innerText = "With a new email address :";
    subscribeEmailChangeMsgDescriptionHead4.innerText = "confirm email address :";
    ssveca = new bootstrap.Modal(productSubscribeEmailChangeMessageModal);
    ssveca.show();

  }

  return (
    <>
      <div id="productListViewId">
        <div className="col-12 text-center mt-3 mb-3">
          <span className="title06">PRODUCT LIST</span>
        </div>

        <div className="container-fluid align-items-center justify-content-between">
          <div className="col-12">
            <div className="row align-content-center justify-content-center justify-content-lg-start p-3">
              <div className="horizontal-scroll-container">
                {loading ? <p>Loading...</p> : <Product products={products} onProductClick={handleProductClick} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="singleProductViewId" className="d-none">
        {selectedProduct && (
          <div className="col-12">
            <div className="col-12 mt-3 mb-3 p-3">
              <span className="title21" onClick={productListHome}><i class="bi bi-arrow-bar-left"></i>&nbsp;Product List /</span><span className="title06"> PRODUCT DETAILS</span>
            </div>

            <div className="container align-items-center justify-content-center">
              <div className="col-12 border border-3 cardBoxView">
                <div className="text-black row">
                  <div className="col-lg-5 col-12 p-3">
                    <div className="row">
                      <div className="col-12 mb-3">
                        <div className='row justify-content-center align-content-center'>
                          <Image src={`${process.env.NEXT_PUBLIC_URL2 + selectedProduct.IMAGELOCATION}`} alt="No picture" className="productImage container-fluid" height={1000} width={1000} />
                        </div>
                      </div>
                      <span className="title18 text-start">MONTHLY PLAN</span><br />
                      <span className="title14">LKR {selectedProduct.AMOUNT}</span><br />
                      <span className="title02 text-center">All prices are exclusive of taxes</span>
                    </div>
                  </div>
                  <div className="col-lg-7 col-12 p-3">
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-12">
                            <span className="title15">{selectedProduct.PRODUCTNAME}</span><br /><br />
                          </div>
                        </div>
                      </div>
                      <span className="title16 text-start col-12">{selectedProduct.DESCRIPTIONTITLE}</span><br /><br />
                      <span className="title02 text-start col-11">{selectedProduct.DESCRIPTION}</span><br /><br />
                      <div className="col-12 mb-3">
                        <div className="row">
                          {selectedProduct.MAINPRODUCTFEATURES.split(' | ').map((feature, index) => (
                            <>
                              <div className="col-12 CardfeatureText" key={index}>
                                <i className="bi bi-check fa-3x checkView"></i>&nbsp;&nbsp;&nbsp;&nbsp;<span className="title17">{feature}</span>
                              </div><br /><br /><br />
                            </>
                          ))}
                        </div>
                      </div>
                      <button className="col-lg-7 offset-lg-5 col-12 btn9 p-2" onClick={handleBuyConfirmationClick}><span className="title10"></span>Buy Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="modal justify-content-center align-content-center" tabIndex="-1" id="product_subscribe_selection_message_modal">
        <div className="modal-dialog position-relative p-3" style={{ maxWidth: "450px" }}>
          <div className="modal-content">
            <div className="modal-header bg-success">
              <h5 className="modal-title text01 w-100">
                <i className="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>INFORMATION !</span>
              </h5>
              <button type="button" className="btn-close bg-white" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row g-2">
                <div className="col-12">
                  <h3 className="form-label text-center">
                    <span className="text03" id="subscribeselectionMsgDescriptionHead"></span><br />
                  </h3><br /><br />
                  <div className="col-12">
                    <div className="row justify-content-center">
                      <div className="col-4 p-3">
                        <div className="row justify-content-center">
                          <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={SubscriptionsSubscribeViewEmailAsk}>
                            YES</button>
                        </div>
                      </div>
                      <div className="col-4 p-3">
                        <div className="row justify-content-center">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">NO</button>
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

      <div className="modal justify-content-center align-content-center" tabIndex="-1" id="product_subscribe_email_selection_message_modal">
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
                    <span className="text03" id="subscribeEmailSelectionMsgDescriptionHead1"></span><br />
                    <span className="text05" id="subscribeEmailSelectionMsgDescriptionHead2"></span><br />
                    <span className="text03" id="subscribeEmailSelectionMsgDescriptionHead3"></span><br />

                  </h3>
                  <div className="col-12">
                    <div className="row justify-content-center">
                      <div className='col-12'>
                        <div className='row p-3'>
                          <input type="email" className="form-control text-center" id="subscribeEmail" value={email} onChange={(e) => setEmail(e.target.value)} readOnly />
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

      <div className="modal justify-content-center align-content-center" tabIndex="-1" id="product_subscribe_email_change_message_modal">
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
                    <span className="text03" id="subscribeEmailChangeMsgDescriptionHead1"></span><br />
                    <span className="text05" id="subscribeEmailChangeMsgDescriptionHead2"></span><br />
                    <span className="text03" id="subscribeEmailChangeMsgDescriptionHead3"></span><br />

                  </h3>
                  <form>
                    <div className="col-12">
                      <div className="row justify-content-center">
                        <div className='col-12'>
                          <div className='row p-3'>
                            <input type="email" className="form-control text-center" id="changeEmail1" placeholder="example@gmail.com" title="Please enter a valid email address" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required />
                          </div>
                        </div>
                        <h3 className="form-label text-center">
                          <span className="text03" id="subscribeEmailChangeMsgDescriptionHead4"></span><br />
                        </h3><br />
                        <div className='col-12'>
                          <div className='row p-3'>
                            <input type="email" className="form-control text-center" id="changeEmail2" placeholder="example@gmail.com" title="Please enter a valid email address" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required />
                          </div>
                        </div>
                        <div className="col-5 p-3">
                          <div className="row justify-content-center">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                              CANCEL
                            </button>
                          </div>
                        </div>
                        <div className="col-5 p-3">
                          <div className="row justify-content-center">
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={emailConfirmation}>CONFIRM</button>
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

      <div className="modal justify-content-center align-content-center" tabIndex="-1" id="product_subscribe_warning_message_modal">
        <div className="modal-dialog position-relative p-3" style={{ maxWidth: "450px" }}>
          <div className="modal-content">
            <div className="modal-header bg-danger">
              <h5 className="modal-title text01 w-100">
                <i className="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>WARNING !</span>
              </h5>
              <button type="button" className="btn-close bg-white" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row g-2">
                <div className="col-12">
                  <h3 className="form-label text-center">
                    <span className="text03" id="subscribeWarningMsgDescriptionHead"></span><br />
                  </h3><br /><br />
                  <div className="col-12">
                    <div className="row justify-content-center">
                      <div className="col-4 p-3">
                        <div className="row justify-content-center">
                          <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={SubscriptionsSubscribeViewAsk}>
                            YES</button>
                        </div>
                      </div>
                      <div className="col-4 p-3">
                        <div className="row justify-content-center">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">NO</button>
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

    </>
  );
}
