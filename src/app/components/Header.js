/* eslint-disable react-hooks/exhaustive-deps */

"use client"
import React from "react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import WarningMessageModal from "../mod/WarningMessageModal";
let warningMessageModal;

const Navbar = () => {
    const [userrole, setUserrole] = useState('');
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [sltbbid, setSltbbid] = useState('');

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        if (role) {
            setUserrole(role);
        } else {
            alert("No user found");
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

    const handleSearchTwo = (sltbbid) => {
        let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
        let warning_message_modal = document.getElementById("warning_message_modal");

        warningMessageModal = new bootstrap.Modal(warning_message_modal);
        if (!sltbbid) {
            warningMsgDescriptionHead.innerText = "Please enter a Broadband ID";
            warningMessageModal.show();
            return;
        }
        customerSearchView2(sltbbid);


    };

    const idSearch = async () => {
        let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
        let warning_message_modal = document.getElementById("warning_message_modal");
        warningMessageModal = new bootstrap.Modal(warning_message_modal);

        const sltbbid = document.getElementById('SLTBBID').value;
        if (!sltbbid) {
            warningMsgDescriptionHead.innerText = "Please enter a Broadband ID";
            warningMessageModal.show();
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/routes/userSearch?SLTBBID=${sltbbid}`);
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
        if (!email) {
            warningMsgDescriptionHead.innerText = "Please enter an Email";
            warningMessageModal.show();
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/routes/userSearch?EMAIL=${email}`);
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

        localStorage.setItem('customer_id', "");
        localStorage.setItem('admin_id', "");
        localStorage.setItem('super_admin_id', "");
        localStorage.setItem('user_id', "");
        window.location.href = '/';
    }

    const customerEnd = () => {
        localStorage.setItem('customer_id', "");
        window.location.href = '/adminHome';
    }

    const adminEnd = () => {

        localStorage.setItem('customer_id', "");
        localStorage.setItem('admin_id', "");
        localStorage.setItem('super_admin_id', "");
        localStorage.setItem('user_id', "");
        window.location.href = '/';
    }

    const superAdminEnd = () => {

        localStorage.setItem('customer_id', "");
        localStorage.setItem('admin_id', "");
        localStorage.setItem('super_admin_id', "");
        localStorage.setItem('user_id', "");
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
                                                <li><Link href="#" className="dropdown-item"><span className="title05"><i class="bi bi-info-circle-fill"></i>&nbsp;Help</span></Link></li>
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
                                                    <li><Link href="/settings" className="dropdown-item"><span className="title05"><i class="bi bi-info-circle-fill"></i>&nbsp;Help</span></Link></li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li className="logOutbtn title05 text-center">
                                                        <Link href="#" className="nav-link" onClick={customerEnd}>
                                                            <span className="title055">Log Out</span>
                                                        </Link>
                                                    </li>
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
                                        <li className="nav-item">
                                            <Link href="#" className="nav-link" onClick={superAdminEnd}>
                                                <span className="title05 btn2">Log Out</span>
                                            </Link>
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