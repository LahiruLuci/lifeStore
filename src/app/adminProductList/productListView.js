"use client"
import { useEffect, useState } from "react";
import Product from "./productView";
import { getProductsProps } from './productView';
import Image from "next/image";
import WarningMessageModal from "../mod/WarningMessageModal";
import SuccessMessageModal from "../mod/SuccessMessageModal";

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

  const productListHome = () => {
    const productListViewId = document.getElementById("productListViewId");
    const singleAdminProductViewId = document.getElementById("singleAdminProductViewId");
    productListViewId.classList.remove("d-none");
    singleAdminProductViewId.classList.add("d-none");
  }

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

    try {

      const jwt = localStorage.getItem("customerToken");
      const postData = await fetch(`${process.env.NEXT_PRIVATE_URL4}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(payload),
      });
      const result = await postData.json();
      if (result.success) {
        const resultProps = result.response;
        if (!resultProps.subscriptionId == null || !resultProps.subscriptionId == "") {

          const subscriberId = resultProps.subscriptionId;
          const licensekey = resultProps.key;

          const payload2 = {
            subscriberId,
            admin_id,
            user,
            productId,
            licensekey,
            amount: Number(amount),
          };

          const postData2 = await fetch(`${process.env.NEXT_PUBLIC_URL9}`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(payload2),
          });
          const result2 = await postData2.json();
          if (result2.message == "Product Subscribed Successfully!") {
            successMessageModal2 = new bootstrap.Modal(success_message_modal2);
            successMsgDescriptionHead2.innerText = "Product Subscribed Successfully!";
            successMsgDescriptionHead22.innerText = "The licensekey has been sent to your e-mail.";
            success_message_modal2.addEventListener('hidden.bs.modal', () => {
              window.location.href = '/adminSubscription';
            });
            successMessageModal2.show();
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
          window.location.href = '/adminProductList';
        });
        warningMessageModal.show();
      }


    } catch (error) {
      console.error('Error generating token:', error);
    }
  };

  const emailConfirmation = async () => {
    const changeEmail1 = document.getElementById("adminChangeEmail1").value;
    const changeEmail2 = document.getElementById("adminChangeEmail2").value;
    let success_message_modal = document.getElementById("success_message_modal");
    let successMsgDescriptionHead = document.getElementById("successMsgDescriptionHead");
    let warning_message_modal = document.getElementById("warning_message_modal");
    let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
    const customer_id = localStorage.getItem("customer_id");

    if (changeEmail1 == changeEmail2) {

      if (changeEmail1) {
        try {

          const payload = {
            userId: customer_id,
            email: changeEmail1,
          };

          const response = await fetch(`${process.env.NEXT_PUBLIC_URL18}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          const result = await response.json();
          if (result.message == "Email updated successfully!") {
            localStorage.setItem('user_email', result.updatedEmail);
            successMessageModal = new bootstrap.Modal(success_message_modal);
            successMsgDescriptionHead.innerText = "Email updated successfully!";
            setEmail(localStorage.getItem('user_email'));
            success_message_modal.addEventListener('hidden.bs.modal', () => {
              handleBuyConfirmationClick();
            });
            successMessageModal.show();
          } else {
            warningMessageModal = new bootstrap.Modal(warning_message_modal);
            warningMsgDescriptionHead.innerText = result.response;
            warningMessageModal.show();
          }
        } catch (error) {
          console.error('Error updating cutomer email:', error);
        }
      } else {
        warningMessageModal = new bootstrap.Modal(warning_message_modal);
        warningMsgDescriptionHead.innerText = "Please enter your email correctly!";
        warning_message_modal.addEventListener('hidden.bs.modal', () => {
          assveca.show();
        });
        warningMessageModal.show();
      }
    } else {
      warningMessageModal = new bootstrap.Modal(warning_message_modal);
      warningMsgDescriptionHead.innerText = "Enter the same email address!";
      warning_message_modal.addEventListener('hidden.bs.modal', () => {
        assveca.show();
      });
      warningMessageModal.show();
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

  let aswva;
  let productSubscribeWarningMessageModal;

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

  function SubscriptionsSubscribeViewAsk() {

    productSubscribeSelectionMessageModal = document.getElementById("admin_product_subscribe_selection_message_modal");
    const subscribeselectionMsgDescriptionHead = document.getElementById("adminSubscribeselectionMsgDescriptionHead");
    subscribeselectionMsgDescriptionHead.innerText = "Do you want to subscribe this product ? ";
    assva = new bootstrap.Modal(productSubscribeSelectionMessageModal);
    assva.show();

  }

  let assvea;

  function SubscriptionsSubscribeViewEmailAsk() {

    if (email == null || email == '') {
      SubscriptionsSubscribeViewEmailChangeAsk();
    } else {
      const productSubscribeEmailSelectionMessageModal = document.getElementById("admin_product_subscribe_email_selection_message_modal");
      const subscribeEmailSelectionMsgDescriptionHead1 = document.getElementById("adminSubscribeEmailSelectionMsgDescriptionHead1");
      const subscribeEmailSelectionMsgDescriptionHead2 = document.getElementById("adminSubscribeEmailSelectionMsgDescriptionHead2");
      const subscribeEmailSelectionMsgDescriptionHead3 = document.getElementById("adminSubscribeEmailSelectionMsgDescriptionHead3");
      subscribeEmailSelectionMsgDescriptionHead1.innerText = "Do you Wish to subscribe for";
      subscribeEmailSelectionMsgDescriptionHead2.innerText = productName.toString();
      subscribeEmailSelectionMsgDescriptionHead3.innerText = "With the following email address for \n User : " + user;
      assvea = new bootstrap.Modal(productSubscribeEmailSelectionMessageModal);
      assvea.show();
    }

  }

  let assveca;

  function SubscriptionsSubscribeViewEmailChangeAsk() {

    const productSubscribeEmailChangeMessageModal = document.getElementById("admin_product_subscribe_email_change_message_modal");
    const subscribeEmailChangeMsgDescriptionHead1 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead1");
    const subscribeEmailChangeMsgDescriptionHead2 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead2");
    const subscribeEmailChangeMsgDescriptionHead3 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead3");
    const subscribeEmailChangeMsgDescriptionHead4 = document.getElementById("adminSubscribeEmailChangeMsgDescriptionHead4");
    subscribeEmailChangeMsgDescriptionHead1.innerText = "Do you Wish to subscribe for";
    subscribeEmailChangeMsgDescriptionHead2.innerText = productName.toString();
    subscribeEmailChangeMsgDescriptionHead3.innerText = "With a new email address :";
    subscribeEmailChangeMsgDescriptionHead4.innerText = "confirm email address :";
    assveca = new bootstrap.Modal(productSubscribeEmailChangeMessageModal);
    assveca.show();

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

      <div id="singleAdminProductViewId" className="d-none">
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
                      <div className='row  justify-content-center align-content-center'>
                        <Image src={`${process.env.NEXT_PUBLIC_URL2 + productImageLocation}`} alt="No picture" className="productImage container-fluid" width={1000} height={1000} />
                      </div>
                    </div>
                    <span className="title18 text-start">MONTHLY PLAN</span><br />
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
                    <button className="col-lg-7 offset-lg-5 col-12 btn9 p-2" onClick={handleBuyConfirmationClick}><span className="title10"></span>Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal justify-content-center align-content-center" tabIndex="-1" id="admin_product_subscribe_selection_message_modal">
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
      </div>

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
                    <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead1"></span><br />
                    <span className="text05" id="adminSubscribeEmailChangeMsgDescriptionHead2"></span><br />
                    <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead3"></span><br />

                  </h3>
                  <form>
                    <div className="col-12">
                      <div className="row justify-content-center">
                        <div className='col-12'>
                          <div className='row p-3'>
                            <input type="email" className="form-control text-center" id="adminChangeEmail1" placeholder="example@gmail.com" title="Please enter a valid email address" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required />
                          </div>
                        </div>
                        <h3 className="form-label text-center">
                          <span className="text03" id="adminSubscribeEmailChangeMsgDescriptionHead4"></span><br />
                        </h3><br />
                        <div className='col-12'>
                          <div className='row p-3'>
                            <input type="email" className="form-control text-center" id="adminChangeEmail2" placeholder="example@gmail.com" title="Please enter a valid email address" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required />
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
                <div className="modal-dialog position-relative top-0 end-0 p-3" style={{maxWidth: "450px"}}>
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
