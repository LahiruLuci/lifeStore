"use client"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const OutSourceProduct = () => {

  const [amount, setAmount] = useState('0');
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsBrowser(typeof window != undefined);

    const fetchUser = async () => {
      try {
        if (searchParams.get('jwt')) {
          const jwt = searchParams.get('jwt');
          // const jwt = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..wZq1eW1Y9w1QRtOrT5TC3g.kjuzfCMIHullPwr0PjaU70DQHH6NEIXiSidLrtHATa0GhCPV3Yyo2V6OcuKxBIy8by0m2cf9EQ1dfwMzwQOdNtFVhb1RvQvhKsrrP19c5I0wUehEf_UGxV-e-Q6oe9cDA9eUGZHWnCd4GBw_nTGnV5RCywTAEgUM1jSZ3co7_v_wDlkMwLOHqUffF-6qITPT.Ug6rvLgE7VuOMnvvojwatA";
          // alert(jwt);
          const postData = await fetch(`${process.env.NEXT_PRIVATE_URL1}${jwt}`, {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });
          const result = await postData.json();
          if (result.success) {
            const resultProps = result.response;
            if (resultProps.role == "customer" && !resultProps.subscriberId == null && !resultProps.email == null && resultProps.productCode == null || resultProps.role == "customer" && !resultProps.subscriberId == "" && !resultProps.email == "" && resultProps.productCode == "") {
              // alert(resultProps.subscriberId + " "+ resultProps.role + " "+ resultProps.jwt);

              try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL24}${resultProps.subscriberId}${process.env.NEXT_PUBLIC_URL25}${resultProps.email}`);
                const systemDetails = await response.json();

                if (systemDetails.error) {
                  alert(systemDetails.error);
                } else if (systemDetails.length > 0) {
                  if (systemDetails[0].USERID) {
                    const fetchedUSERID = systemDetails[0].USERID;
                    const fetchedEmail = systemDetails[0].EMAIL;
                    localStorage.setItem('customer_id', fetchedUSERID);
                    localStorage.setItem("customerToken", resultProps.jwt);
                    localStorage.setItem('user_email', fetchedEmail);
                    localStorage.setItem('product_code', resultProps.productCode);
                    if (systemDetails[0].EMAIL) {
                      // handleBuyNowClick();
                      alert("Login Success");
                    }

                  } else {
                    alert("No user found");
                  }
                } else {
                  alert("No user found");
                }
              } catch (error) {
                alert("An error occurred while searching for the user");
              }
            } else {
              alert("No user found");
            }
          } else {
            alert("oken expired or Invalid token. Please go back to MySlt App and try again!");
          }
        } else {
          alert('Please do the correct input.');
        }
      } catch (error) {
        console.error('Error fetching:', error);
      }
    }

    fetchUser();
  }, []);

  const handleBuyNowClick = async () => {

    const email = localStorage.getItem("user_email");
    const admin_id = "BizlifePackage";
    const user = localStorage.getItem("customer_id");
    const productCode = localStorage.getItem("product_code");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL26}${productCode}`);
      const systemProductDetails = await response.json();

      if (systemProductDetails.error) {
        alert(systemProductDetails.error);
      } else if (systemProductDetails.length > 0) {
        if (systemProductDetails[0].USERID) {
          const fetchedPRODUCTID = systemProductDetails[0].PRODUCTID;
          const fetchedPRODUCTCODE = systemProductDetails[0].PRODUCTCODE;
          localStorage.setItem('product_code', fetchedPRODUCTCODE);
          localStorage.setItem('product_id', fetchedPRODUCTID);
          if (systemProductDetails[0].PRODUCTID) {

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
                  const productId = localStorage.getItem("product_id");

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
                    localStorage.removeItem('customer_id');
                    localStorage.removeItem('customerToken');
                    localStorage.removeItem('user_email');
                    localStorage.removeItem('product_code');
                    localStorage.removeItem('product_id');
                    alert("Product Subscribed Successfully!");
                  } else {
                    alert("Subscription proccess Failed.");
                  }

                } else {
                  alert("Invalid Subscription.");
                }
              } else {
                alert(result.error + " : " + result.reason);
              }


            } catch (error) {
              console.error('Error generating token:', error);
            }

          }

        } else {
          alert("No product found");
        }
      } else {
        alert("No product found");
      }
    } catch (error) {
      alert("An error occurred while searching for the product");
    }

  };


  return ("Kaspersky Product Subscribed Successfully");
}

export default OutSourceProduct;
