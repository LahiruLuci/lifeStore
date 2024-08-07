/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useState } from "react";

export async function getUnsubscribedUsersProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL16}`);
    const unsubscribedUsers = await res.json();

    return {
        props: {
            unsubscribedUsers: unsubscribedUsers || [],
        },
    };
}

const AuditTraceUnsubscribedTable = ({ unsubscribedUsers }) => {

    const auditTraceHome = () => {
        const auditTracePanel = document.getElementById("auditTracePanel");
        const auditTraceUnsubscribedTable = document.getElementById("auditTraceUnsubscribedTable");

        auditTracePanel.classList.remove("d-none");
        auditTraceUnsubscribedTable.classList.add("d-none");
    }

    if (!unsubscribedUsers || !Array.isArray(unsubscribedUsers) || unsubscribedUsers.length === 0) {
        return (
            <>
                <div id="auditTraceUnsubscribedTable" className="d-none">
                    <div className="col-12 mt-3 p-3">
                        <span className="title21" onClick={auditTraceHome}><i class="bi bi-arrow-bar-left"></i>&nbsp;Audit Trace /</span><span className="title06"> Unsubscribed</span>
                    </div>

                    <div className="container-fluid align-content-center justify-content-center">
                        <div className="col-12">
                            <div className="text-black row p-4">

                                <table>
                                    <thead>
                                        <tr className="title11">
                                            <th scope="col" className="col-2">Broadband ID</th>
                                            <th scope="col" className="col-3">Product Name</th>
                                            <th scope="col" className="col-2">Unsubscribed Date</th>
                                            <th scope="col" className="col-2">Actions</th>
                                            <th scope="col" className="col-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <p className="text-danger text-center">No data found</p>
                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </div>
                </div>

            </>
        );
    } else {

        const [selectedUnsubscribedSubscription, setSelectedUnsubscribedSubscription] = useState({});
        const [subscriptionId, setSubscriptionId] = useState('');
        const [productName, setProductName] = useState('');
        const [licensekey, setLicensekey] = useState('');

        const onUnsubscribedViewClick = (unsubscribedUser) => {
            UnsubscribedLiceseKeyView();
            setSelectedUnsubscribedSubscription(unsubscribedUser);
            setSubscriptionId(unsubscribedUser.SUBSCRIPTIONID);
            setProductName(unsubscribedUser.PRODUCTNAME);
            setLicensekey(unsubscribedUser.LICENSEKEY);
        };

        return (
            <>
                <div id="auditTraceUnsubscribedTable" className="d-none">
                    <div className="col-12 mt-3 p-3">
                        <span className="title21" onClick={auditTraceHome}><i class="bi bi-arrow-bar-left"></i>&nbsp;Audit Trace /</span><span className="title06"> Unsubscribed</span>
                    </div>

                    <div className="container-fluid align-content-center justify-content-center">
                        <div className="col-12">
                            <div className="text-black row p-4">

                                <table>
                                    <thead>
                                        <tr className="title11">
                                            <th scope="col" className="col-2">Broadband ID</th>
                                            <th scope="col" className="col-3">Product Name</th>
                                            <th scope="col" className="col-2">Unsubscribed Date</th>
                                            <th scope="col" className="col-2">Actions</th>
                                            <th scope="col" className="col-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {unsubscribedUsers.map((unsubscribedUser) => (

                                            <tr className="title12 border-bottom" key={unsubscribedUser.SUBSCRIPTIONID}>
                                                <td>{unsubscribedUser.SLTBBID}</td>
                                                <td>{unsubscribedUser.PRODUCTNAME}</td>

                                                <td>{(unsubscribedUser.CREATEDDATETIME).toString().split('T')[0]}</td>
                                                {unsubscribedUser.USER == unsubscribedUser.CREATEDUSER ? (
                                                    <>
                                                        <td>Customer</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>Unsubscribed by Admin</td>
                                                    </>
                                                )}
                                                <td>
                                                    <div className="col-12">
                                                        <div className="row p-3 align-items-center justify-content-center">
                                                            <button className="m-1 col-lg-5 col-12 outline-button" onClick={() => onUnsubscribedViewClick(unsubscribedUser)}>View More</button>
                                                            {/* <button className="m-1 offset-lg-1 col-lg-1 col-12 icon-button p-0"><i className="bi bi-cloud-arrow-down"></i></button> */}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </div>
                </div>
                <div className="modal fade" tabindex="-1" id="liceseKeyUnsubscribedViewModal" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">

                        {selectedUnsubscribedSubscription && (
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title title01 text-center w-100">Product Details</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                    <div className="row g-3 p-3">

                                        <div className="col-12">
                                            <div className="row">
                                                <span className="title13 col-12 col-lg-5">Subscription ID</span>
                                                <div className="mb-1 col-12 col-lg-7">
                                                    <input type="text" className="form-control" id="licenseKeyUnsubscribedSubscriptionId" value={subscriptionId} onChange={(e) => setSubscriptionId(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <span className="title13 col-12 col-lg-5">Product Name</span>
                                                <div className="mb-1 col-12 col-lg-7">
                                                    <input type="text" className="form-control" id="licenseKeyUnsubscribedProductName" value={productName} onChange={(e) => setProductName(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <span className="title13 col-12 col-lg-5">License Key / <span className="text-danger">Not-Active</span></span>
                                                <div className="mb-1 col-12 col-lg-7">
                                                    <input type="text" className="form-control" id="productUnsubscribedLicenseKey" value={licensekey} onChange={(e) => setLicensekey(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default AuditTraceUnsubscribedTable;
