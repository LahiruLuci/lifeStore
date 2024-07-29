/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";

const CustomerDetailsView = () => {

  const [customerDetails, setCustomerDetails] = useState({});
  const [customerSLTBBID, setCustomerSLTBBID] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerJoinedDate, setCustomerJoinedDate] = useState('');
  useEffect(() => {
    const storedCustomerId = localStorage.getItem('customer_id');
    if (storedCustomerId) {
      setCustomerSLTBBID(storedCustomerId);
    }
  }, []);

  useEffect(() => {

    const fetchCustomerDetails = async () => {
      if (!customerSLTBBID) {
        return; 
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL17}${customerSLTBBID}`);
        const data = await response.json();

        if (data.error) {
          alert(data.error);
        } else {
          setCustomerDetails(data[0]);
          setCustomerName(data[0].INITIALS + " " + data[0].PREFERREDNAME + " " + data[0].LASTNAME);
          setCustomerEmail(data[0].EMAIL);
          setCustomerMobile(data[0].MOBILE);
          setCustomerJoinedDate((data[0].CREATEDDATETIME).toString().split('T')[0])
        }
      } catch (error) {
        alert("An error occurred while fetching the customer details");
      }
    };

    fetchCustomerDetails(customerSLTBBID);
  }, [customerSLTBBID]);

  

  return (
    <>
      <div className="col-12 mt-3 p-3">
        <span className="title06">CUSTOMER DETAILS</span>
      </div>

      <div className="container-fluid align-content-center justify-content-between">
        <div className="col-12">
          <div className="text-black row p-4 m-5 mt-0">
            <div className="col-12">
              <div className="row p-5 pt-0">
                <div className="col-12">
                  <div className="row">
                    <span className="title13 col-12 col-lg-3">Broadband ID </span>
                    <div className="mb-1 col-12 col-lg-9">
                      <input readOnly type="text" className="form-control" value={customerSLTBBID} />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <span className="title13 col-12 col-lg-3">Email </span>
                    <div className="mb-1 col-12 col-lg-9">
                      <input readOnly type="text" className="form-control" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
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

export default CustomerDetailsView;