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

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        const updatedNowString = localStorage.getItem('SignOutTime');
        if (role) {
            const now = new Date();
            const updatedNow = updatedNowString ? new Date(updatedNowString) : null;
            // alert(now + " and " + updatedNow);
            if (updatedNow && now >= updatedNow) {
                localStorage.removeItem('customer_id');
                localStorage.removeItem('admin_id');
                localStorage.removeItem('super_admin_id');
                localStorage.removeItem('user_id');
                localStorage.removeItem('userRole');
                localStorage.removeItem('user_email');
                localStorage.removeItem("customerToken");
                localStorage.removeItem('SignOutTime');
            } else {
                setUserrole(role);
                setEmail(localStorage.getItem('user_email'));
                setSltbbid(localStorage.getItem('customer_id'));
            }

        } else {
            alert("No User Found");
        }

    }, []);

    let csm;
    const handleCustomerSearchModal = () => {

        const customerSearchModal = document.getElementById("customerSearchModal");
        if (customerSearchModal) {
            csm = new bootstrap.Modal(customerSearchModal);
            csm.show();
        }
    };

    let csm2;
    const handleCustomerSearchModal2 = () => {

        const customerSearchModal = document.getElementById("customerSearchModal2");
        if (customerSearchModal) {
            csm2 = new bootstrap.Modal(customerSearchModal);
            csm2.show();
        }
    };

    const handleSearch = (sltbbid) => {
        let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
        let warning_message_modal = document.getElementById("warning_message_modal");
        warningMessageModal = new bootstrap.Modal(warning_message_modal);
        if (!sltbbid) {
            warningMsgDescriptionHead.innerText = "Please enter a Broadband ID";
            warningMessageModal.show();
            return;
        }
        customerSearchView(sltbbid);
    };

    const handleSearchTwo = async (sltbbid) => {
        const warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
        const warning_message_modal = document.getElementById("warning_message_modal");

        warningMessageModal = new bootstrap.Modal(warning_message_modal);
        if (!sltbbid) {
            warningMsgDescriptionHead.innerText = "Please enter a Broadband ID";
            warningMessageModal.show();
            return;
        } else {
            try {
                const adminId = localStorage.getItem("admin_id");
                const postData1 = await fetch(`${process.env.NEXT_PRIVATE_URL3}`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "X-Secret": `${process.env.X_SECRET}`,
                    },
                    body: JSON.stringify({
                        "subscriberId": sltbbid,
                        "adminId": adminId,
                    }),
                });
                const result1 = await postData1.json();
                if (result1.success && result1.success) {
                    
                    try {
                        warningMessageModal = new bootstrap.Modal(warning_message_modal);
                        const response = await fetch(`${process.env.NEXT_PUBLIC_URL5}${sltbbid}`);
                        const systemDetails = await response.json();

                        if (systemDetails.error) {
                            warningMsgDescriptionHead.innerText = systemDetails.error;
                            warningMessageModal.show();
                        } else if (systemDetails.length > 0) {
                            if (systemDetails[0].USERID) {
                                const fetchedUSERID = systemDetails[0].USERID;
                                const fetchedUserRole = systemDetails[0].USERROLE;
                                if (fetchedUserRole == 1) {
                                    const startTime = new Date();
                                    const updatedNow = new Date(startTime.getTime() + 60 * 60 * 1000);
                                    localStorage.setItem('SignOutTime', updatedNow.toISOString());
                                    localStorage.setItem('customer_id', fetchedUSERID);
                                    localStorage.removeItem('user_email');
                                    localStorage.setItem("customerToken", result1.jwt); 
                                    setUserId(sltbbid);
                                    setUserToken(result1.jwt);                                   
                                    if (systemDetails[0].EMAIL) {
                                        const fetchedEmail = systemDetails[0].EMAIL;
                                        localStorage.setItem('user_email', fetchedEmail);
                                    }
                                    customerSearchView2(sltbbid);
                                } else {
                                    warningMsgDescriptionHead.innerText = "Invalid User";
                                    warning_message_modal.addEventListener('hidden.bs.modal', () => {
                                        window.location.href = '/adminHome';
                                    });
                                    warningMessageModal.show();
                                }

                            } else {
                                warningMsgDescriptionHead.innerText = "No user found";
                                warning_message_modal.addEventListener('hidden.bs.modal', () => {
                                    window.location.href = '/logOutView';
                                });
                                warningMessageModal.show();
                            }
                        } else {
                            warningMsgDescriptionHead.innerText = "No user found";
                            warningMessageModal.show();
                        }
                    } catch (error) {
                        warningMsgDescriptionHead.innerText = error;
                        warningMessageModal.show();
                    }

                } else {
                    const reason = result.reason;
                    warningMsgDescriptionHead.innerText = reason;
                    warningMessageModal.show();
                }

            } catch (error) {
                console.log(error);
                warningMsgDescriptionHead.innerText = error;
                warningMessageModal.show();
            }

        }

    };

    const idSearch = async () => {
        let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
        let warning_message_modal = document.getElementById("warning_message_modal");
        warningMessageModal = new bootstrap.Modal(warning_message_modal);

        const sltbbid = document.getElementById('SLTBBID').value;
        setSltbbid(sltbbid);
        if (!sltbbid) {
            warningMsgDescriptionHead.innerText = "Please enter a Broadband ID";
            warningMessageModal.show();
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL3}${sltbbid}`);
            const customerDetails = await response.json();

            if (customerDetails.error) {
                alert(customerDetails.error);
            } else if (customerDetails.length > 0) {
                setEmail(customerDetails[0].EMAIL);
            } else {
                warningMsgDescriptionHead.innerText = "Invalid SLTBBID.";
                warningMessageModal.show();
            }
        } catch (error) {
            warningMsgDescriptionHead.innerText = "An error occurred while searching for the user";
            warningMessageModal.show();
        }
    };

    const emailSearch = async () => {
        let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
        let warning_message_modal = document.getElementById("warning_message_modal");
        warningMessageModal = new bootstrap.Modal(warning_message_modal);

        const email = document.getElementById('EMAIL').value;
        setEmail(email);
        if (!email) {
            warningMsgDescriptionHead.innerText = "Please enter an Email";
            warningMessageModal.show();
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL4}${email}`);
            const customerDetails = await response.json();

            if (customerDetails.error) {
                alert(customerDetails.error);
            } else if (customerDetails.length > 0) {
                setSltbbid(customerDetails[0].SLTBBID);
            } else {
                warningMsgDescriptionHead.innerText = "Invalid Email.";
                warningMessageModal.show();
            }
        } catch (error) {
            warningMsgDescriptionHead.innerText = "An error occurred while searching for the user";
            warningMessageModal.show();
        }
    };

    const userEnd = () => {
        localStorage.removeItem('customer_id');
        localStorage.removeItem('admin_id');
        localStorage.removeItem('super_admin_id');
        localStorage.removeItem('user_id');
        localStorage.removeItem('userRole');
        localStorage.removeItem('user_email');
        localStorage.removeItem("customerToken");
        localStorage.removeItem('SignOutTime');
        window.location.href = '/logOutView';
    }

    const customerEnd = () => {
        localStorage.removeItem('customer_id');
        localStorage.removeItem('user_email');
        localStorage.removeItem("customerToken");
        setUserToken('');
        setUserId('');
        window.location.href = '/adminHome';
    }

    const adminEnd = () => {

        localStorage.removeItem('customer_id');
        localStorage.removeItem('admin_id');
        localStorage.removeItem('super_admin_id');
        localStorage.removeItem('user_id');
        localStorage.removeItem('userRole');
        localStorage.removeItem('user_email');
        localStorage.removeItem("customerToken");
        localStorage.removeItem('SignOutTime');
        window.location.href = '/';
    }

    const superAdminEnd = () => {

        localStorage.removeItem('customer_id');
        localStorage.removeItem('admin_id');
        localStorage.removeItem('super_admin_id');
        localStorage.removeItem('user_id');
        localStorage.removeItem('userRole');
        localStorage.removeItem('user_email');
        localStorage.removeItem("customerToken");
        localStorage.removeItem('SignOutTime');
        window.location.href = '/';
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg nav-bg bg-light">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="logo align-self-center col-2"></div>
                    <button type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" className="navbar-toggler border-0"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="offset-1 collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between align-items-center" id="navbarNav">
                        <div className="flex-fill">
                            <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto title05">
                                {userrole == 1 && (
                                    <>
                                        <li className="nav-item">
                                            <Link href="/home" className="nav-link">
                                                <span className="title05">Home</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="/customerProductList" className="nav-link">
                                                <span className="title05">Product List</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="/customerProductPortfolio" className="nav-link">
                                                <span className="title05">Product Portfolio</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="/customerSubscription" className="nav-link">
                                                <span className="title05">Subscription</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <span className="title05"><i className="bi bi-person-circle fs-5"></i></span>
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><Link href="/customerDetails" className="dropdown-item"><span className="title05"><i class="bi bi-person-lines-fill"></i>&nbsp;Your Account</span></Link></li>
                                                <li><Link href="/help" className="dropdown-item"><span className="title05"><i class="bi bi-info-circle-fill"></i>&nbsp;Help</span></Link></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li className="logOutbtn title05 text-center">
                                                    <Link href="#" className="nav-link" onClick={userEnd}>
                                                        <span className="title055">Log Out</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </>
                                )}

                                {userrole == 2 && (
                                    <>
                                        <li className="nav-item">
                                            <Link href="/adminHome" className="nav-link">
                                                <span className="title05">Home</span>
                                            </Link>
                                        </li>
                                        {localStorage.getItem('customer_id') && (
                                            <li className="nav-item">
                                                <Link href="/adminProductList" className="nav-link">
                                                    <span className="title05">Product List</span>
                                                </Link>
                                            </li>
                                        )}
                                        <li className="nav-item">
                                            <Link href="/adminProductPortfolio" className="nav-link">
                                                <span className="title05">Product Portfolio</span>
                                            </Link>
                                        </li>
                                        {localStorage.getItem('customer_id') && (
                                            <li className="nav-item">
                                                <Link href="/adminSubscription" className="nav-link">
                                                    <span className="title05">Subscription</span>
                                                </Link>
                                            </li>
                                        )}

                                        <li className="nav-item">
                                            <Link href="#" className="nav-link" onClick={handleCustomerSearchModal2}>
                                                <span className="title05">Cus.Search</span>
                                            </Link>
                                        </li>
                                        {localStorage.getItem('customer_id') && (
                                            <li className="nav-item dropdown" id="customerLogout">
                                                <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <span className="title05"><i className="bi bi-person-circle fs-5"></i></span>
                                                </a>
                                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <li><Link href="/customerDetails" className="dropdown-item"><span className="title05"><i class="bi bi-person-lines-fill"></i>&nbsp;Your Account</span></Link></li>
                                                    <li><Link href="/help" className="dropdown-item"><span className="title05"><i class="bi bi-info-circle-fill"></i>&nbsp;Help</span></Link></li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <Link href="#" className="nav-link" onClick={customerEnd}>
                                                        <li className="logOutbtn title05 text-center">
                                                            <span className="title055">Log Out</span>
                                                        </li>
                                                    </Link>
                                                </ul>
                                            </li>
                                        )}
                                        <li className="nav-item" id="adminLogout">
                                            <Link href="#" className="nav-link" onClick={adminEnd}>
                                                <span className="title05 btn2">Log Out</span>
                                            </Link>
                                        </li>

                                    </>
                                )}

                                {userrole == 3 && (
                                    <>
                                        <li className="nav-item">
                                            <Link href="/dashboard" className="nav-link">
                                                <span className="title05">DashBoard</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="/productList" className="nav-link">
                                                <span className="title05">Product List</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="/productPortfolio" className="nav-link">
                                                <span className="title05">Product Portfolio</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="/admin" className="nav-link">
                                                <span className="title05">Admin</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="/auditTrace" className="nav-link">
                                                <span className="title05">Audit Trace</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="#" className="nav-link" onClick={handleCustomerSearchModal}>
                                                <span className="title05">Cus.Search</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <span className="title05"><i className="bi bi-person-circle fs-5"></i></span>
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><Link href="/adminChangePassword" className="dropdown-item"><span className="title05"><i class="bi bi-person-lines-fill"></i>&nbsp;Change Password</span></Link></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li className="logOutbtn title05 text-center">
                                                    <Link href="#" className="nav-link" onClick={superAdminEnd}>
                                                        <span className="title055">Log Out</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </>
                                )}

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="modal align-content-end" tabIndex={-1} id="customerSearchModal">
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
                                onClick={() => handleSearchTwo(sltbbid)}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <WarningMessageModal />
        </>
    );

}

export default Navbar;