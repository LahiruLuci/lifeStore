/* eslint-disable react-hooks/exhaustive-deps */

"use client"
import React from "react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import WarningMessageModal from "../mod/WarningMessageModal";

const Navbar = () => {
    const [userrole, setUserrole] = useState('');
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [sltbbid, setSltbbid] = useState('');
    const [userId, setUserId] = useState('');
    const [userToken, setUserToken] = useState('');
    let warningMessageModal;

    // useEffect(() => {
    //     const role = localStorage.getItem('userRole');
    //     const updatedNowString = localStorage.getItem('SignOutTime');
    //     if (role) {
    //         const now = new Date();
    //         const updatedNow = updatedNowString ? new Date(updatedNowString) : null;
    //         // alert(now + " and " + updatedNow);
    //         if (updatedNow && now >= updatedNow) {
    //             localStorage.removeItem('customer_id');
    //             localStorage.removeItem('admin_id');
    //             localStorage.removeItem('super_admin_id');
    //             localStorage.removeItem('user_id');
    //             localStorage.removeItem('userRole');
    //             localStorage.removeItem('user_email');
    //             localStorage.removeItem("customerToken");
    //             localStorage.removeItem('SignOutTime');
    //         } else {
    //             setUserrole(role);
    //             setEmail(localStorage.getItem('user_email'));
    //             setSltbbid(localStorage.getItem('customer_id'));
    //         }

    //     } else {
    //         alert("No User Found");
    //     }

    // }, []);

    //let csm;
    // const handleCustomerSearchModal = () => {

    //     const customerSearchModal = document.getElementById("customerSearchModal");
    //     if (customerSearchModal) {
    //         csm = new bootstrap.Modal(customerSearchModal);
    //         csm.show();
    //     }
    // };

    //let csm2;
    // const handleCustomerSearchModal2 = () => {

    //     const customerSearchModal = document.getElementById("customerSearchModal2");
    //     if (customerSearchModal) {
    //         csm2 = new bootstrap.Modal(customerSearchModal);
    //         csm2.show();
    //     }
    // };

    //let csm3;
    // const handleCustomerSearchModal3 = () => {

    //     const customerSearchModal = document.getElementById("customerSearchModal3");
    //     if (customerSearchModal) {
    //         csm2 = new bootstrap.Modal(customerSearchModal);
    //         csm2.show();
    //     }
    // };

    // const handleSearch = (sltbbid) => {
    //     let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
    //     let warning_message_modal = document.getElementById("warning_message_modal");
    //     warningMessageModal = new bootstrap.Modal(warning_message_modal);
    //     if (!sltbbid) {
    //         warningMsgDescriptionHead.innerText = "Please enter a Broadband ID";
    //         warningMessageModal.show();
    //         return;
    //     }
    //     customerSearchView(sltbbid);
    // };

    // const handleSearchTwo = async (sltbbid) => {
    //     const warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
    //     const warning_message_modal = document.getElementById("warning_message_modal");

    //     warningMessageModal = new bootstrap.Modal(warning_message_modal);
    //     if (!sltbbid) {
    //         warningMsgDescriptionHead.innerText = "Please enter a Broadband ID";
    //         warningMessageModal.show();
    //         return;
    //     } else if (!/^[a-zA-Z0-9]{1,11}$/.test(sltbbid)) {
    //         warningMsgDescriptionHead.innerText = "Broadband ID must be exactly 11 characters long and contain only letters and numbers";
    //         warningMessageModal.show();
    //         return;
    //     } else if (sltbbid) {
    //         try {
    //             const adminId = localStorage.getItem("admin_id");
    //             const postData1 = await fetch(`${process.env.NEXT_PRIVATE_URL3}`, {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-type": "application/json",
    //                     "Access-Control-Allow-Origin": "*",
    //                     "X-Secret": `${process.env.X_SECRET}`,
    //                 },
    //                 body: JSON.stringify({
    //                     "subscriberId": sltbbid,
    //                     "adminId": adminId,
    //                 }),
    //             });
    //             const result1 = await postData1.json();
    //             if (result1.success && result1.jwt) {

    //                 try {
    //                     warningMessageModal = new bootstrap.Modal(warning_message_modal);
    //                     const response = await fetch(`${process.env.NEXT_PUBLIC_URL5}${sltbbid}`);
    //                     const systemDetails = await response.json();

    //                     if (systemDetails.error) {
    //                         warningMsgDescriptionHead.innerText = systemDetails.error;
    //                         warningMessageModal.show();
    //                     } else if (systemDetails.length > 0) {
    //                         if (systemDetails[0].USERID) {
    //                             const fetchedUSERID = systemDetails[0].USERID;
    //                             const fetchedUserRole = systemDetails[0].USERROLE;
    //                             if (fetchedUserRole == 1) {
    //                                 const startTime = new Date();
    //                                 const updatedNow = new Date(startTime.getTime() + 60 * 60 * 1000);
    //                                 localStorage.setItem('SignOutTime', updatedNow.toISOString());
    //                                 localStorage.setItem('customer_id', fetchedUSERID);
    //                                 localStorage.removeItem('user_email');
    //                                 localStorage.setItem("customerToken", result1.jwt);
    //                                 setUserId(sltbbid);
    //                                 setUserToken(result1.jwt);
    //                                 if (systemDetails[0].EMAIL) {
    //                                     const fetchedEmail = systemDetails[0].EMAIL;
    //                                     localStorage.setItem('user_email', fetchedEmail);
    //                                 }
    //                                 customerSearchView2(sltbbid);
    //                             } else {
    //                                 warningMsgDescriptionHead.innerText = "Invalid User";
    //                                 warning_message_modal.addEventListener('hidden.bs.modal', () => {
    //                                     window.location.href = '/adminHome';
    //                                 });
    //                                 warningMessageModal.show();
    //                             }

    //                         } else {
    //                             warningMsgDescriptionHead.innerText = "No user found";
    //                             warning_message_modal.addEventListener('hidden.bs.modal', () => {
    //                                 window.location.href = '/logOutView';
    //                             });
    //                             warningMessageModal.show();
    //                         }
    //                     } else {
    //                         warningMsgDescriptionHead.innerText = "No user found";
    //                         warningMessageModal.show();
    //                     }
    //                 } catch (error) {
    //                     warningMsgDescriptionHead.innerText = error;
    //                     warningMessageModal.show();
    //                 }

    //             } else {
    //                 const reason = result1.reason;
    //                 warningMsgDescriptionHead.innerText = reason;
    //                 warningMessageModal.show();
    //             }

    //         } catch (error) {
    //             console.log(error);
    //             warningMsgDescriptionHead.innerText = error;
    //             warningMessageModal.show();
    //         }

    //     }

    // };

    // const idSearch = async () => {
    //     let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
    //     let warning_message_modal = document.getElementById("warning_message_modal");
    //     warningMessageModal = new bootstrap.Modal(warning_message_modal);

    //     const sltbbid = document.getElementById('SLTBBID').value;
    //     setSltbbid(sltbbid);
    //     if (!sltbbid) {
    //         warningMsgDescriptionHead.innerText = "Please enter a Broadband ID";
    //         warningMessageModal.show();
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_URL3}${sltbbid}`);
    //         const customerDetails = await response.json();

    //         if (customerDetails.error) {
    //             alert(customerDetails.error);
    //         } else if (customerDetails.length > 0) {
    //             setEmail(customerDetails[0].EMAIL);
    //         } else {
    //             warningMsgDescriptionHead.innerText = "Invalid SLTBBID.";
    //             warningMessageModal.show();
    //         }
    //     } catch (error) {
    //         warningMsgDescriptionHead.innerText = "An error occurred while searching for the user";
    //         warningMessageModal.show();
    //     }
    // };

    // const emailSearch = async () => {
    //     let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
    //     let warning_message_modal = document.getElementById("warning_message_modal");
    //     warningMessageModal = new bootstrap.Modal(warning_message_modal);

    //     const email = document.getElementById('EMAIL').value;
    //     setEmail(email);
    //     if (!email) {
    //         warningMsgDescriptionHead.innerText = "Please enter an Email";
    //         warningMessageModal.show();
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_URL4}${email}`);
    //         const customerDetails = await response.json();

    //         if (customerDetails.error) {
    //             alert(customerDetails.error);
    //         } else if (customerDetails.length > 0) {
    //             setSltbbid(customerDetails[0].SLTBBID);
    //         } else {
    //             warningMsgDescriptionHead.innerText = "Invalid Email.";
    //             warningMessageModal.show();
    //         }
    //     } catch (error) {
    //         warningMsgDescriptionHead.innerText = "An error occurred while searching for the user";
    //         warningMessageModal.show();
    //     }
    // };

    // const idSearch2 = async () => {
    //     let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
    //     let warning_message_modal = document.getElementById("warning_message_modal");
    //     warningMessageModal = new bootstrap.Modal(warning_message_modal);

    //     const sltbbid = document.getElementById('SLTBBID2').value;
    //     setSltbbid(sltbbid);
    //     if (!sltbbid) {
    //         warningMsgDescriptionHead.innerText = "Please enter a Broadband ID";
    //         warningMessageModal.show();
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_URL3}${sltbbid}`);
    //         const customerDetails = await response.json();

    //         if (customerDetails.error) {
    //             alert(customerDetails.error);
    //         } else if (customerDetails.length > 0) {
    //             setEmail(customerDetails[0].EMAIL);
    //         } else {
    //             warningMsgDescriptionHead.innerText = "Invalid SLTBBID.";
    //             warningMessageModal.show();
    //         }
    //     } catch (error) {
    //         warningMsgDescriptionHead.innerText = "An error occurred while searching for the user";
    //         warningMessageModal.show();
    //     }
    // };

    // const emailSearch2 = async () => {
    //     let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
    //     let warning_message_modal = document.getElementById("warning_message_modal");
    //     warningMessageModal = new bootstrap.Modal(warning_message_modal);

    //     const email = document.getElementById('EMAIL2').value;
    //     setEmail(email);
    //     if (!email) {
    //         warningMsgDescriptionHead.innerText = "Please enter an Email";
    //         warningMessageModal.show();
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_URL4}${email}`);
    //         const customerDetails = await response.json();

    //         if (customerDetails.error) {
    //             alert(customerDetails.error);
    //         } else if (customerDetails.length > 0) {
    //             setSltbbid(customerDetails[0].SLTBBID);
    //         } else {
    //             warningMsgDescriptionHead.innerText = "Invalid Email.";
    //             warningMessageModal.show();
    //         }
    //     } catch (error) {
    //         warningMsgDescriptionHead.innerText = "An error occurred while searching for the user";
    //         warningMessageModal.show();
    //     }
    // };

    // const idSearch3 = async () => {
    //     let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
    //     let warning_message_modal = document.getElementById("warning_message_modal");
    //     warningMessageModal = new bootstrap.Modal(warning_message_modal);

    //     const sltbbid = document.getElementById('SLTBBID3').value;
    //     setSltbbid(sltbbid);
    //     if (!sltbbid) {
    //         warningMsgDescriptionHead.innerText = "Please enter a Broadband ID";
    //         warningMessageModal.show();
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_URL3}${sltbbid}`);
    //         const customerDetails = await response.json();

    //         if (customerDetails.error) {
    //             alert(customerDetails.error);
    //         } else if (customerDetails.length > 0) {
    //             setEmail(customerDetails[0].EMAIL);
    //         } else {
    //             warningMsgDescriptionHead.innerText = "Invalid SLTBBID.";
    //             warningMessageModal.show();
    //         }
    //     } catch (error) {
    //         warningMsgDescriptionHead.innerText = "An error occurred while searching for the user";
    //         warningMessageModal.show();
    //     }
    // };

    // const emailSearch3 = async () => {
    //     let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
    //     let warning_message_modal = document.getElementById("warning_message_modal");
    //     warningMessageModal = new bootstrap.Modal(warning_message_modal);

    //     const email = document.getElementById('EMAIL3').value;
    //     setEmail(email);
    //     if (!email) {
    //         warningMsgDescriptionHead.innerText = "Please enter an Email";
    //         warningMessageModal.show();
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_URL4}${email}`);
    //         const customerDetails = await response.json();

    //         if (customerDetails.error) {
    //             alert(customerDetails.error);
    //         } else if (customerDetails.length > 0) {
    //             setSltbbid(customerDetails[0].SLTBBID);
    //         } else {
    //             warningMsgDescriptionHead.innerText = "Invalid Email.";
    //             warningMessageModal.show();
    //         }
    //     } catch (error) {
    //         warningMsgDescriptionHead.innerText = "An error occurred while searching for the user";
    //         warningMessageModal.show();
    //     }
    // };



    // const userEnd = () => {
    //     localStorage.removeItem('customer_id');
    //     localStorage.removeItem('admin_id');
    //     localStorage.removeItem('super_admin_id');
    //     localStorage.removeItem('user_id');
    //     localStorage.removeItem('userRole');
    //     localStorage.removeItem('user_email');
    //     localStorage.removeItem("customerToken");
    //     localStorage.removeItem('SignOutTime');
    //     window.location.href = '/logOutView';
    // }

    // const customerEnd = () => {
    //     localStorage.removeItem('customer_id');
    //     localStorage.removeItem('user_email');
    //     localStorage.removeItem("customerToken");
    //     setUserToken('');
    //     setUserId('');
    //     window.location.href = '/adminHome';
    // }

    // const adminEnd = () => {

    //     localStorage.removeItem('customer_id');
    //     localStorage.removeItem('admin_id');
    //     localStorage.removeItem('super_admin_id');
    //     localStorage.removeItem('user_id');
    //     localStorage.removeItem('userRole');
    //     localStorage.removeItem('user_email');
    //     localStorage.removeItem("customerToken");
    //     localStorage.removeItem('SignOutTime');
    //     window.location.href = '/';
    // }

    // const superAdminEnd = () => {

    //     localStorage.removeItem('customer_id');
    //     localStorage.removeItem('admin_id');
    //     localStorage.removeItem('super_admin_id');
    //     localStorage.removeItem('user_id');
    //     localStorage.removeItem('userRole');
    //     localStorage.removeItem('user_email');
    //     localStorage.removeItem("customerToken");
    //     localStorage.removeItem('SignOutTime');
    //     window.location.href = '/';
    // }

    return (
        <>
            <nav className="navbar navbar-expand-lg nav-bg bg-light">
                <div className="container d-flex justify-content-start align-items-center">
                    <div className="logo align-self-center me-4" style={{ minWidth: '160px' }}></div>
                    <button type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" className="navbar-toggler border-0"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse flex-fill" id="navbarNav">
                        <ul className="nav navbar-nav d-flex justify-content-center align-items-center gap-4 w-100 m-0" style={{ fontWeight: 600, fontSize: '1.2rem' }}>
                            <li className="nav-item">
                                <Link href="/adminProductList" className="nav-link">
                                    <span className="title05">Product List</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/adminProductPortfolio" className="nav-link">
                                    <span className="title05">Product Portfolio</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* <div className="modal align-content-end" tabIndex={-1} id="customerSearchModal">
                <div className="modal-dialog position-absolute top-0 end-0 p-3">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title title01">Customer Search</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label title04">Broadband ID : </label>
                                    <div className="input-group mb-1">
                                        <input type="text" className="form-control" id="SLTBBID" value={sltbbid} onChange={(e) => setSltbbid(e.target.value)} />
                                        <button className="btn btn-secondary" type="button" id="bib" onClick={idSearch}>
                                            <i className="bi bi-search" />
                                        </button>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label title04">Email : </label>
                                    <div className="input-group mb-1">
                                        <input type="email" className="form-control" id="EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <button
                                            className="btn btn-secondary"
                                            type="button"
                                            id="emailb"
                                            onClick={emailSearch}
                                        >
                                            <i className="bi bi-envelope" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleSearch(sltbbid)}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal align-content-end" tabIndex={-1} id="customerSearchModal2">
                <div className="modal-dialog position-absolute top-0 end-0 p-3">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title title01">Customer Search</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label title04">Broadband ID : </label>
                                    <div className="input-group mb-1">
                                        <input type="text" className="form-control" id="SLTBBID2" value={sltbbid} onChange={(e) => setSltbbid(e.target.value)} />
                                        <button className="btn btn-secondary" type="button" id="bib" onClick={idSearch}>
                                            <i className="bi bi-search" />
                                        </button>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label title04">Email : </label>
                                    <div className="input-group mb-1">
                                        <input type="email" className="form-control" id="EMAIL2" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <button
                                            className="btn btn-secondary"
                                            type="button"
                                            id="emailb"
                                            onClick={emailSearch}
                                        >
                                            <i className="bi bi-envelope" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleSearchTwo(sltbbid)}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal align-content-end" tabIndex={-1} id="customerSearchModal3">
                <div className="modal-dialog position-absolute top-0 end-0 p-3">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title title01">Customer Search</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label title04">Broadband ID : </label>
                                    <div className="input-group mb-1">
                                        <input type="text" className="form-control" id="SLTBBID3" value={sltbbid} onChange={(e) => setSltbbid(e.target.value)} />
                                        <button className="btn btn-secondary" type="button" id="bib" onClick={idSearch}>
                                            <i className="bi bi-search" />
                                        </button>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label title04">Email : </label>
                                    <div className="input-group mb-1">
                                        <input type="email" className="form-control" id="EMAIL3" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <button
                                            className="btn btn-secondary"
                                            type="button"
                                            id="emailb"
                                            onClick={emailSearch}
                                        >
                                            <i className="bi bi-envelope" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleSearchTwo(sltbbid)}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
            <WarningMessageModal />
        </>
    );

}

export default Navbar;