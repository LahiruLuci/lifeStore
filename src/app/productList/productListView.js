/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useState } from "react";
import Product from "./productView";
import AddProduct from './newAddProductView';
import Image from "next/image";
import SuccessMessageModal from "../mod/SuccessMessageModal";
import WarningMessageModal from "../mod/WarningMessageModal";


export async function getProductsProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL20}`);
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
  const [productName, setProductName] = useState('');
  const [descriptionTitle, setDescriptionTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sortNo, setSortNo] = useState('1');
  const [activeStatus, setActiveStatus] = useState('1');
  const [mainProductFeatures, setMainProductFeatures] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [amount, setAmount] = useState('');
  const [checkedFeatures, setCheckedFeatures] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState('1');

  const features = [
    { name: 'Security', label: 'Security', id: 'SecurityCheck' },
    { name: 'Performance', label: 'Performance', id: 'PerformanceCheck' },
    { name: 'Simplicity', label: 'Simplicity', id: 'SimplicityCheck' },
    { name: 'Pc, mac & mobile', label: 'Pc, mac & mobile', id: 'Pc,mac&mobileCheck' },
    { name: 'Privacy', label: 'Privacy', id: 'PrivacyCheck' },
    { name: 'Money', label: 'Money', id: 'MoneyCheck' },
    { name: 'Safe kids', label: 'Safe kids', id: 'SafekidsCheck' },
    { name: 'Passwords', label: 'Passwords', id: 'PasswordsCheck' },
    { name: 'File protection', label: 'File protection', id: 'FileProtectionCheck' },
    { name: 'Manual Scan', label: 'Manual Scan', id: 'ManualScanCheck' },
    { name: 'Android Wear', label: 'Android Wear', id: 'AndroidWearCheck' },
    { name: 'Automatic Scan', label: 'Automatic Scan', id: 'AutomaticScanCheck' },
    { name: 'Anti-Phishing', label: 'Anti-Phishing', id: 'AntiPhishingCheck' },
    { name: 'Confidentiality', label: 'Confidentiality', id: 'ConfidentialityCheck' },
    { name: 'Online Content Filter', label: 'Online Content Filter', id: 'OnlineContentFilterCheck' },
    { name: 'Safe Search in YOUTUBE', label: 'Safe Search in YOUTUBE', id: 'SafeSearchInYOUTUBECheck' },
    { name: 'Apps usage Control', label: 'Apps usage Control', id: 'AppsUsageControlCheck' },
    { name: 'Screen Time Scheduling', label: 'Screen Time Scheduling', id: 'ScreenTimeSchedulingCheck' },
    { name: 'Child Locator', label: 'Child Locator', id: 'ChildLocatorCheck' },
    { name: 'Battery Tracker', label: 'Battery Tracker', id: 'BatteryTrackerCheck' },
    { name: 'Social Network Monitoring', label: 'Social Network Monitoring', id: 'SocialNetworkMonitoringCheck' },
    { name: 'YOUTUBE Search History', label: 'YOUTUBE Search History', id: 'SimplicityCheck' },
    { name: 'Real - Time Alerts', label: 'Real - Time Alerts', id: 'RealTimeAlertsCheck' },
    { name: 'Parental control', label: 'Parental control', id: 'ParentalControlCheck' },
    { name: 'Identity', label: 'Identity', id: 'IdentityCheck' },
    { name: 'Premium support', label: 'Premium support', id: 'PremiumSupportCheck' },
  ];

  const features2 = [
    { name: 'Security', label: 'Security', id: 'SecurityCheck2' },
    { name: 'Performance', label: 'Performance', id: 'PerformanceCheck2' },
    { name: 'Simplicity', label: 'Simplicity', id: 'SimplicityCheck2' },
    { name: 'Pc, mac & mobile', label: 'Pc, mac & mobile', id: 'Pc,mac&mobileCheck2' },
    { name: 'Privacy', label: 'Privacy', id: 'PrivacyCheck2' },
    { name: 'Money', label: 'Money', id: 'MoneyCheck2' },
    { name: 'Safe kids', label: 'Safe kids', id: 'SafekidsCheck2' },
    { name: 'Passwords', label: 'Passwords', id: 'PasswordsCheck2' },
    { name: 'File protection', label: 'File protection', id: 'FileProtectionCheck2' },
    { name: 'Manual Scan', label: 'Manual Scan', id: 'ManualScanCheck2' },
    { name: 'Android Wear', label: 'Android Wear', id: 'AndroidWearCheck2' },
    { name: 'Automatic Scan', label: 'Automatic Scan', id: 'AutomaticScanCheck2' },
    { name: 'Anti-Phishing', label: 'Anti-Phishing', id: 'AntiPhishingCheck2' },
    { name: 'Confidentiality', label: 'Confidentiality', id: 'ConfidentialityCheck2' },
    { name: 'Online Content Filter', label: 'Online Content Filter', id: 'OnlineContentFilterCheck2' },
    { name: 'Safe Search in YOUTUBE', label: 'Safe Search in YOUTUBE', id: 'SafeSearchInYOUTUBECheck2' },
    { name: 'Apps usage Control', label: 'Apps usage Control', id: 'AppsUsageControlCheck2' },
    { name: 'Screen Time Scheduling', label: 'Screen Time Scheduling', id: 'ScreenTimeSchedulingCheck2' },
    { name: 'Child Locator', label: 'Child Locator', id: 'ChildLocatorCheck2' },
    { name: 'Battery Tracker', label: 'Battery Tracker', id: 'BatteryTrackerCheck2' },
    { name: 'Social Network Monitoring', label: 'Social Network Monitoring', id: 'SocialNetworkMonitoringCheck2' },
    { name: 'YOUTUBE Search History', label: 'YOUTUBE Search History', id: 'SimplicityCheck2' },
    { name: 'Real - Time Alerts', label: 'Real - Time Alerts', id: 'RealTimeAlertsCheck2' },
    { name: 'Parental control', label: 'Parental control', id: 'ParentalControlCheck2' },
    { name: 'Identity', label: 'Identity', id: 'IdentityCheck2' },
    { name: 'Premium support', label: 'Premium support', id: 'PremiumSupportCheck2' },
  ];

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
    if (selectedProduct) {
      const initialCheckedFeatures = features.reduce((acc, feature) => {
        acc[feature.name] = hasFeature(selectedProduct.PRODUCTFEATURES, feature.name);
        return acc;
      }, {});
      setCheckedFeatures(initialCheckedFeatures);
      setSelectedFeatures(Object.keys(initialCheckedFeatures).filter(key => initialCheckedFeatures[key]));
    }
  }, [selectedProduct]);

  const handleCheckboxChange = (e, featureName) => {
    const isChecked = e.target.checked;
    setSelectedFeatures((prevState) => {
      if (isChecked) {
        return [...prevState, featureName];
      } else {
        return prevState.filter((feature) => feature !== featureName);
      }
    });
    setCheckedFeatures((prevState) => ({
      ...prevState,
      [featureName]: isChecked,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  let successMessageModal;
  let warningMessageModal;

  const saveProduct = async () => {
    const productCode = document.getElementById("add_product_code").value;
    const productCategory = selectedDropdownItem;
    const productTitle = document.getElementById("add_product_title").value;
    const productName = document.getElementById("add_product_name").value;
    const preDescription = document.getElementById("add_product_preDescription").value;
    const descriptionTitle = document.getElementById("add_product_description").value;
    const description = document.getElementById("add_description").value;
    const mainProductFeatures = document.getElementById("add_features").value;
    const amount = document.getElementById("add_amount").value;
    let successMsgDescriptionHead = document.getElementById("successMsgDescriptionHead");
    let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
    let success_message_modal = document.getElementById("success_message_modal");
    let warning_message_modal = document.getElementById("warning_message_modal");
    warningMessageModal = new bootstrap.Modal(warning_message_modal);
    successMessageModal = new bootstrap.Modal(success_message_modal);
    let super_admin_id = localStorage.getItem("super_admin_id");

    if (productCode == "") {
      warningMsgDescriptionHead.innerText = "Please Enter a Product Code.";
      warningMessageModal.show();
    } else if (productTitle == "") {
      warningMsgDescriptionHead.innerText = "Please Enter a Product Title.";
      warningMessageModal.show();
    } else if (productName == "") {
      warningMsgDescriptionHead.innerText = "Please Enter a Product Name.";
      warningMessageModal.show();
    } else if (preDescription == "") {
      warningMsgDescriptionHead.innerText = "Please Enter a Product PreDescription.";
      warningMessageModal.show();
    } else if (descriptionTitle == "") {
      warningMsgDescriptionHead.innerText = "Please Enter a Product Description Title.";
      warningMessageModal.show();
    } else if (description == "") {
      warningMsgDescriptionHead.innerText = "Please Enter a Product Description.";
      warningMessageModal.show();
    } else if (mainProductFeatures == "") {
      warningMsgDescriptionHead.innerText = "Please Enter a Product Features.";
      warningMessageModal.show();
    } else if (amount == "") {
      warningMsgDescriptionHead.innerText = "Please Enter a Product Amount.";
      warningMessageModal.show();
    } else {

      try {

        let base64Image = null;
        if (selectedFile) {
          base64Image = await fileToBase64(selectedFile);
        }

        const paycreate = {
          super_admin_id,
          productCode,
          productCategory,
          productTitle,
          productName,
          preDescription,
          descriptionTitle,
          description,
          mainProductFeatures: mainProductFeatures.split('\n').join(' | '),
          amount,
          productFeatures: selectedFeatures.join(' | '),
          image: base64Image
        };

        const postData = await fetch(`${process.env.NEXT_PUBLIC_URL20}`, {
          method: "POST",
          headers: {
            "Content-Type": "products/json",
          },
          body: JSON.stringify(paycreate),
        });

        const result = await postData.json();
        if (result.message === "Product added successfully!") {
          const updatedProducts = products.filter((p) => p.PRODUCTID !== result.productId);
          setProducts(updatedProducts);
          successMsgDescriptionHead.innerText = "Product Successfully Entered.";

          success_message_modal.addEventListener('hidden.bs.modal', () => {
            window.location.href = '/productList';
          });

          successMessageModal.show();
        }

      } catch (error) {
        console.error('Error adding product:', error);
      }
    }

  };

  const updateProduct = async () => {
    const sortNumber = sortNo;
    const activeStatusId = activeStatus;
    let super_admin_id = localStorage.getItem("super_admin_id");

    try {

      let base64Image = null;
      if (selectedFile) {
        base64Image = await fileToBase64(selectedFile);
      }

      const payload = {
        super_admin_id,
        productId: selectedProduct.PRODUCTID,
        productName,
        descriptionTitle,
        description,
        sortNumber,
        activeStatusId,
        mainProductFeatures: mainProductFeatures.split('\n').join(' | '),
        amount,
        productFeatures: selectedFeatures.join(' | '),
        image: base64Image
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL20}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'products/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.message === 'Product updated successfully!') {
        const updatedProducts = products.map(p => (p.PRODUCTID === selectedProduct.PRODUCTID ? result.updatedProduct : p));
        setProducts(updatedProducts);
        successMsgDescriptionHead.innerText = "Product Successfully Updated.";
        window.location.href = '/productList';
        if (window.location.href = '/productList') {
          successMessageModal.show();
        }
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }

  };

  const deleteProduct = async (productId) => {
    try {
      const deleteData = await fetch(`${process.env.NEXT_PUBLIC_URL20}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const result = await deleteData.json();
      if (result.message === "Product deleted successfully!") {
        const updatedProducts = products.filter((p) => p.PRODUCTID !== productId);
        setProducts(updatedProducts);
        window.location.href = '/productList';
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setProductName(product.PRODUCTNAME);
    setDescriptionTitle(product.DESCRIPTIONTITLE);
    setDescription(product.DESCRIPTION);
    setMainProductFeatures(product.MAINPRODUCTFEATURES.split(' | ').join('\n'));
    setAmount(product.AMOUNT);
    setSortNo(product.SORTID);
    setActiveStatus(product.STATUS);
  };

  const onProductEditViewClick = () => {
    const productName = document.getElementById("update_product_name").value;
    const descriptionTitle = document.getElementById("update_product_description").value;
    const description = document.getElementById("update_product_description_full").value;
    const mainProductFeatures = document.getElementById("update_product_main_features").value;
    const amount = document.getElementById("update_product_amount").value;
    let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
    let success_message_modal = document.getElementById("success_message_modal");
    let warning_message_modal = document.getElementById("warning_message_modal");
    warningMessageModal = new bootstrap.Modal(warning_message_modal);
    successMessageModal = new bootstrap.Modal(success_message_modal);

    if (productName == "") {
      warningMsgDescriptionHead.innerText = "Please Enter a Product Name.";
      warningMessageModal.show();
    } else if (descriptionTitle == "") {
      warningMsgDescriptionHead.innerText = "Please Enter a Product Description Title.";
      warningMessageModal.show();
    } else if (description == "") {
      warningMsgDescriptionHead.innerText = "Please Enter a Product Description.";
      warningMessageModal.show();
    } else if (mainProductFeatures == "") {
      warningMsgDescriptionHead.innerText = "Please Enter a Product Features.";
      warningMessageModal.show();
    } else if (amount == "") {
      warningMsgDescriptionHead.innerText = "Please Enter a Product Amount.";
      warningMessageModal.show();
    } else {
      UpdateProductAsk();
    }
  };

  const handleEditProductConfirm = () => {
    if (selectedProduct) {
      updateProduct();
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedDropdownItem(event.target.value);
  };

  const productListHome = () => {
    const productListViewId = document.getElementById("productListViewId");
    const singleProductViewId = document.getElementById("singleProductViewId");
    const singleUpdateProductViewId = document.getElementById("singleUpdateProductViewId");
    const addProductViewId = document.getElementById("addProductViewId");
    productListViewId.classList.remove("d-none");
    singleProductViewId.classList.add("d-none");
    singleUpdateProductViewId.classList.add("d-none");
    addProductViewId.classList.add("d-none");
  }

  const hasFeature = (featuresString, feature) => {
    const regex = new RegExp(`\\b${feature}\\b`, 'i');
    return regex.test(featuresString);
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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
              {loading ? <p>Loading...</p> : <Product products={products} onProductClick={handleProductClick} />}
              <AddProduct />
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
                        <div className='row  justify-content-center align-content-center'>
                          <Image src={`${process.env.NEXT_PUBLIC_URL2 + selectedProduct.IMAGELOCATION}`} alt="No picture" className="productImage container-fluid" width={1000} height={1000} />
                        </div>
                      </div><br /><br /><br />
                      <span className="title18 text-start">MONTHLY PLAN</span><br />
                      <span className="title14">LKR {selectedProduct.AMOUNT}</span><br />
                      <span className="title02 text-center">All prices are exclusive of taxes</span>
                    </div>
                  </div>
                  <div className="col-lg-7 col-12 p-3">
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-10">
                            <span className="title15">{selectedProduct.PRODUCTNAME}</span>
                          </div>
                          <button className="col-1 editBtn2" onClick={() => updateProductView()}></button>
                          <button className="col-1 deleteBtn2" onClick={() => DeleteProductAsk()}></button>
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
                      <button className="col-lg-7 offset-lg-5 col-12 btn9 p-2"><span className="title10"></span>You already registered this item</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div id="singleUpdateProductViewId" className="d-none">
        {selectedProduct && (
          <div className="col-12">
            <div className="col-12 mt-3 mb-3 p-3">
              <span className="title21" onClick={productListHome}><i class="bi bi-arrow-bar-left"></i>&nbsp;Product List /</span><span className="title06"> UPDATE PRODUCT</span>
            </div>
            <div className="container align-items-center justify-content-center">
              <div className="col-12 border border-3 cardBoxView">
                <div className="text-black row">
                  <div className="col-lg-5 col-12 p-3 mt-5">
                    <div className="row">
                      <div className="col-12 mb-3">
                        <Image src={selectedProduct.IMAGELOCATION} alt="No picture" className="productImage container-fluid" width={600} height={600} />
                      </div>
                      <div className="col-12 mt-3 mb-5">
                        <label htmlFor="image" className="form-label">Update Photo</label>
                        <input type="file" className="form-control form-control-lg" id="image" onChange={(e) => setSelectedFile(e.target.files[0])} />
                      </div>
                      <span className="title18 text-center">MONTHLY PLAN</span><br />
                      <span className="title14">LKR <input type="text" id="update_product_amount"
                        value={amount} onChange={(e) => setAmount(e.target.value)} className="priceInput" /></span><br />

                      <span className="title02 text-center">All prices are exclusive of taxes</span>
                    </div>
                  </div>
                  <div className="col-lg-7 col-12 p-3">
                    <div className="row">
                      <div className="form-floating mb-3">
                        <input type="text" className="form-control textBox1" id="update_product_name"
                          value={productName} onChange={(e) => setProductName(e.target.value)}
                        />
                        <label htmlFor="update_product_title" className="p-3">&nbsp;&nbsp;&nbsp;Product Name</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input type="text" className="form-control textBox1" id="update_product_sortno"
                          value={sortNo} onChange={(e) => setSortNo(e.target.value)}
                        />
                        <label htmlFor="update_product_sortno" className="p-3">&nbsp;&nbsp;&nbsp;Product Sort No.</label>
                      </div>
                      <div className="form-floating mb-3">
                        <label for="add_product_active" className="p-3">&nbsp;&nbsp;&nbsp;Product Status</label><br /><br />
                        <select id="add_product_active" value={activeStatus} onChange={(e) => setActiveStatus(e.target.value)}>
                          <option value="1">Active</option>
                          <option value="2">Inactive</option>
                        </select>&nbsp;&nbsp;&nbsp;
                        <span>Selected Status: {activeStatus}</span>
                      </div>
                      <div className="form-floating mb-3">
                        <input type="text" className="form-control textBox1" id="update_product_description"
                          value={descriptionTitle} onChange={(e) => setDescriptionTitle(e.target.value)}
                        />
                        <label htmlFor="update_product_description" className="p-3">&nbsp;&nbsp;&nbsp;Description Title</label>
                      </div>

                      <div className="col-12 mb-3">
                        <div className="row">
                          <div className="form-floating">
                            <textarea className="form-control textBox1" placeholder="Leave a comment here" id="update_product_description_full" style={{ height: "100px" }}
                              value={description} onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                            <label htmlFor="update_product_description_full">&nbsp;&nbsp;&nbsp;Description</label>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 mb-3">
                        <div className="row">
                          <div className="form-floating">
                            <textarea className="form-control textBox1" placeholder="Leave a comment here" id="update_product_main_features" style={{ height: "200px" }}
                              value={mainProductFeatures} onChange={(e) => setMainProductFeatures(e.target.value)}
                            ></textarea>
                            <label htmlFor="update_product_main_features">&nbsp;&nbsp;&nbsp;Main Product Features</label>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="col-12 p-3 m-3">
                    <div className="row justify-content-center d-flex">
                      <table className="col-12">
                        <thead className="col-12">
                          <tr className="col-12">
                            <th className="col-3">&nbsp;</th>
                            <th className="col-3">&nbsp;</th>
                            <th className="col-3">&nbsp;</th>
                            <th className="col-3">&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {features.map((feature, index) => (
                            index % 4 === 0 && (
                              <tr key={index / 4}>
                                {features.slice(index, index + 4).map((feature, i) => (
                                  <td className="center-table" key={i}>
                                    <span className="title071 checkBox1">{feature.label}</span><br />
                                    <input
                                      className="form-check-input bg-black text-white"
                                      type="checkbox"
                                      id={feature.id}
                                      aria-label={`#${feature.label}`}
                                      checked={checkedFeatures[feature.name] || false}
                                      onChange={(e) => handleCheckboxChange(e, feature.name)}
                                    />
                                  </td>
                                ))}
                              </tr>
                            )
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <button className="col-lg-4 offset-lg-4 col-12 btn9 p-2" onClick={onProductEditViewClick} type="submit"><span
                    className="title10"></span>Update Product</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div id="addProductViewId" className="d-none">
        <div className="col-12 mt-3 mb-3 p-3">
          <span className="title21" onClick={productListHome}><i class="bi bi-arrow-bar-left"></i>&nbsp;Product List /</span><span className="title06"> ADD NEW PRODUCT</span>
        </div>

        <div className="container align-items-center justify-content-center">
          <div className="col-12 border border-3 cardBoxView">
            <div className="text-black row">
              <div className="col-lg-5 col-12 p-3 mt-5">
                <div className="row align-items-center">
                  <div className="col-12 mb-3">
                    <Image alt="No picture" className="addSingleProductBackground offset-1 col-10 offset-lg-2 col-lg-8" width={600} height={600} />
                  </div>
                  <div className="col-12 mt-3 mb-5">
                    <label htmlFor="image" className="form-label">Add Photo</label>
                    <input type="file" className="form-control form-control-lg" id="image" onChange={(e) => setSelectedFile(e.target.files[0])} />
                  </div><br /><br /><br />
                  <span className="title18 text-center">MONTHLY PLAN</span><br />
                  <span className="title14">LKR <input type="text" placeholder="0" className="priceInput" id="add_amount" /> .00
                  </span><br />

                  <span className="title02 text-center">All prices are exclusive of taxes</span>
                </div>
              </div>
              <div className="col-lg-7 col-12 p-3">
                <div className="row">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control textBox1" id="add_product_code"
                      placeholder="Product Code" />
                    <label for="add_product_code" className="p-3">&nbsp;&nbsp;&nbsp;Product Code</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control textBox1" id="add_product_name"
                      placeholder="Product Name" />
                    <label for="add_product_name" className="p-3">&nbsp;&nbsp;&nbsp;Product Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control textBox1" id="add_product_title"
                      placeholder="Product Title" />
                    <label for="add_product_title" className="p-3">&nbsp;&nbsp;&nbsp;Product Title</label>
                  </div>
                  <div className="form-floating mb-3">
                    <label for="add_product_category" className="p-3">&nbsp;&nbsp;&nbsp;Product Category</label><br /><br />
                    <select id="add_product_category" value={selectedDropdownItem} onChange={handleDropdownChange}>
                      <option value="1">Essential</option>
                      <option value="2">Advanced</option>
                      <option value="3">Premium</option>
                      <option value="4">Standard</option>
                      <option value="5">Plus</option>
                    </select>&nbsp;&nbsp;&nbsp;
                    <span>Selected category: {selectedDropdownItem}</span>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control textBox1" id="add_product_preDescription"
                      placeholder="Pre-Description" />
                    <label for="add_product_preDescription" className="p-3">&nbsp;&nbsp;&nbsp;Pre Description</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control textBox1" id="add_product_description"
                      placeholder="Description Title" />
                    <label for="add_product_description" className="p-3">&nbsp;&nbsp;&nbsp;Description Title</label>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="row">
                      <div className="form-floating">
                        <textarea className="form-control textBox1" placeholder="Leave a comment here"
                          id="add_description" style={{ height: "100px" }}></textarea>
                        <label for="add_description" className="p-3">&nbsp;&nbsp;&nbsp;
                          Description</label>
                      </div>&nbsp;
                      <div className="form-floating">
                        <textarea className="form-control textBox1" placeholder="Leave a comment here"
                          id="add_features" style={{ height: "200px" }}></textarea>
                        <label for="add_features" className="p-3">&nbsp;&nbsp;&nbsp;Features </label>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="col-12 p-3 m-3">
                <div className="row justify-content-center d-flex">
                  <table className="col-12">
                    <thead className="col-12">
                      <tr className="col-12">
                        <th className="col-3">&nbsp;</th>
                        <th className="col-3">&nbsp;</th>
                        <th className="col-3">&nbsp;</th>
                        <th className="col-3">&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {features2.map((feature, index) => (
                        index % 4 === 0 && (
                          <tr key={index / 4}>
                            {features.slice(index, index + 4).map((feature, i) => (
                              <td className="center-table" key={i}>
                                <span className="title071 checkBox1">{feature.label}</span><br />
                                <input
                                  className="form-check-input bg-black text-white"
                                  type="checkbox"
                                  id={feature.id}
                                  aria-label={`#${feature.label}`}
                                  onChange={(e) => handleCheckboxChange(e, feature.name)}
                                />
                              </td>
                            ))}
                          </tr>
                        )
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <button className="col-lg-4 offset-lg-4 col-12 btn9 p-2" onClick={saveProduct} type="submit"><span
                className="title10"></span>Save Product</button>
            </div>
          </div>
        </div>
      </div>

      <SuccessMessageModal />
      <WarningMessageModal />
      <div class="modal" tabIndex="-1" id="product_delete_selection_message_modal">
        <div class="modal-dialog position-relative p-3" style={{ maxWidth: "450px" }}>
          <div class="modal-content">
            <div class="modal-header bg-danger">
              <h5 class="modal-title text01 w-100">
                <i class="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>ALERT !</span>
              </h5>
              <button type="button" class="btn-close bg-white" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row g-2">
                <div class="col-12">
                  <h3 class="form-label text-center">
                    <span class="text03" id="deleteselectionMsgDescriptionHead"></span><br />
                  </h3><br /><br />
                  <div className="col-12">
                    <div className="row justify-content-center">
                      <div class="col-4 p-3">
                        <div class="row justify-content-center">
                          <button type="button" class="btn btn-danger" onClick={() => deleteProduct(selectedProduct.PRODUCTID)}>
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

      <div class="modal" tabIndex="-1" id="product_edit_selection_message_modal">
        <div class="modal-dialog position-relative p-3" style={{ maxWidth: "450px" }}>
          <div class="modal-content">
            <div class="modal-header bg-success">
              <h5 class="modal-title text01 w-100">
                <i class="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>CONFIRMATION</span>
              </h5>
              <button type="button" class="btn-close bg-white" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row g-2">
                <div class="col-12">
                  <h3 class="form-label text-center">
                    <span class="text03" id="editselectionMsgDescriptionHead"></span><br />
                  </h3><br /><br />
                  <div className="col-12">
                    <div className="row justify-content-center">
                      <div class="col-4 p-3">
                        <div class="row justify-content-center">
                          <button type="button" class="btn btn-success" onClick={handleEditProductConfirm}>
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

    </>
  );
}
