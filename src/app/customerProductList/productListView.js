"use client"
import jwt from 'jsonwebtoken';
import { useEffect, useState } from "react";
import Product from "./productView";
import { getProductsProps } from './productView';
import Image from "next/image";
import WarningMessageModal from "../mod/WarningMessageModal";

const secretKey = process.env.ACCESS_SECRET_CODE;

export const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productName, setProductName] = useState('');
  const [descriptionTitle, setDescriptionTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mainProductFeatures, setMainProductFeatures] = useState('');
  const [amount, setAmount] = useState('');
  const [licensekey, setLicensekey] = useState('');

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
    setSelectedProduct(product);
    setProductName(product.PRODUCTNAME);
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

    let user = localStorage.getItem('customer_id');

      try {

        const paycreate = {
          user,
          productName,
          licensekey,
          amount,
        };

        const postData = await fetch(`${process.env.NEXT_PUBLIC_URL}/routes/customerSubscription`, {
          method: "POST",
          headers: {
            "Content-Type": "products/json",
          },
          body: JSON.stringify(paycreate),
        });

        const result = await postData.json();
        if (result.message === "Product Subscribed Successfully!") {
          successMsgDescriptionHead.innerText = "Product Subscribed Successfully.";

          success_message_modal.addEventListener('hidden.bs.modal', () => {
            window.location.href = '/productList';
          });

          successMessageModal.show();
        }

      } catch (error) {
        console.error('Error adding product:', error);
      }

  };

  const handleBuyNowClick = async () => {
    const payload = { name: productName, amount: amount };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/utils/generateToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ payload })
      });
      const data = await response.json();
      const token = data.token;

      alert("Generated JWT token: ", token);

      const backendUrl = "https://your-backend-url.com/api/purchase";

      fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ token })
      })
        .then(response => response.json())
        .then(data => {
          console.log("Purchase successful:", data);
          BuySelectedPtoduct();
        })
        .catch(error => {
          console.error("Error during purchase:", error);
        });
    } catch (error) {
      console.error('Error generating token:', error);
    }
  };

  const hasFeature = (featuresString, feature) => {
    const regex = new RegExp(`\\b${feature}\\b`, 'i');
    return regex.test(featuresString);
  };

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
                        <Image src={`${process.env.NEXT_PUBLIC_URL2 + selectedProduct.IMAGELOCATION}`} alt="No picture" className="productImage offset-1 col-10 offset-lg-2 col-lg-8" width={300} height={300} />
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
                            <span className="title15">{selectedProduct.PRODUCTNAME}</span>
                          </div>
                        </div>
                      </div>
                      <span className="title16 text-start col-12">{selectedProduct.DESCRIPTIONTITLE}</span><br /><br />
                      <span className="title02 text-start col-11">{selectedProduct.DESCRIPTION}</span><br /><br />
                      <div className="col-12 mb-3">
                        <div className="row">
                          {selectedProduct.MAINPRODUCTFEATURES.split(' | ').map((feature, index) => (
                            <div className="col-12 CardfeatureText" key={index}>
                              <i className="bi bi-check fa-3x checkView"></i>&nbsp;&nbsp;&nbsp;&nbsp;<span className="title17">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button className="col-lg-7 offset-lg-5 col-12 btn9 p-2" onClick={handleBuyNowClick}><span className="title10"></span>Buy Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <WarningMessageModal />

    </>
  );
}
