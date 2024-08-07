/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useCallback, useState } from "react";

export async function getSubscribedUsersProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL15}`);
    const subscribedUsers = await res.json();

    return {
        props: {
            subscribedUsers: subscribedUsers || [],
        },
    };
}

const AuditTraceSubscribedTable = ({ subscribedUsers }) => {

    const auditTraceHome = () => {

        const auditTracePanel = document.getElementById("auditTracePanel");
        const auditTraceSubscribedTable = document.getElementById("auditTraceSubscribedTable");

        auditTracePanel.classList.remove("d-none");
        auditTraceSubscribedTable.classList.add("d-none");
    }

    if (!subscribedUsers || !Array.isArray(subscribedUsers) || subscribedUsers.length === 0) {
        return (
            <>
                <div id="auditTraceSubscribedTable" className="d-none">
                    <div className="col-12 mt-3 p-3">
                        <span className="title21" onClick={auditTraceHome}><i class="bi bi-arrow-bar-left"></i>&nbsp;Audit Trace /</span><span className="title06"> Subscribed</span>
                    </div>

                    <div className="container-fluid align-content-center justify-content-center">
                        <div className="col-12">
                            <div className="text-black row p-4">

                                <table>
                                    <thead>
                                        <tr className="title11">
                                            <th scope="col" className="col-2">Broadband ID</th>
                                            <th scope="col" className="col-3">Product Name</th>
                                            <th scope="col" className="col-2">Subscribed Date</th>
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

        const [selectedSubscribedSubscription, setSelectedSubscribedSubscription] = useState({});
        const [subscriptionId, setSubscriptionId] = useState('');
        const [productName, setProductName] = useState('');
        const [licensekey, setLicensekey] = useState('');

        const onSubscribedViewClick = (subscribedUser) => {
            SubscribedLiceseKeyView();
            setSelectedSubscribedSubscription(subscribedUser);
            setSubscriptionId(subscribedUser.SUBSCRIPTIONID);
            setProductName(subscribedUser.PRODUCTNAME);
            setLicensekey(subscribedUser.LICENSEKEY);
        };

        return (
            <>
                <div id="auditTraceSubscribedTable" className="d-none">
                    <div className="col-12 mt-3 p-3">
                        <span className="title21" onClick={auditTraceHome}><i class="bi bi-arrow-bar-left"></i>&nbsp;Audit Trace /</span><span className="title06"> Subscribed</span>
                    </div>

                    <div className="container-fluid align-content-center justify-content-center">
                        <div className="col-12">
                            <div className="text-black row p-4">

                                <table>
                                    <thead>
                                        <tr className="title11">
                                            <th scope="col" className="col-2">Broadband ID</th>
                                            <th scope="col" className="col-3">Product Name</th>
                                            <th scope="col" className="col-2">Subscribed Date</th>
                                            <th scope="col" className="col-2">Actions</th>
                                            <th scope="col" className="col-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subscribedUsers.map((subscribedUser) => (

                                            <tr className="title12 border-bottom" key={subscribedUser.SUBSCRIPTIONID}>
                                                <td>{subscribedUser.SLTBBID}</td>
                                                <td>{subscribedUser.PRODUCTNAME}</td>

                                                <td>{(subscribedUser.CREATEDDATETIME).toString().split('T')[0]}</td>
                                                {subscribedUser.USER == subscribedUser.CREATEDUSER ? (
                                                    <>
                                                        <td>Customer</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>Subscribed by Admin</td>
                                                    </>
                                                )}
                                                <td>
                                                    <div className="col-12">
                                                        <div className="row p-3 align-items-center justify-content-center">
                                                            <button className="m-1 col-lg-5 col-12 outline-button" onClick={() => onSubscribedViewClick(subscribedUser)}>View More</button>
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
                <div className="modal fade" tabindex="-1" id="liceseKeySubscribedViewModal" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">

                        {selectedSubscribedSubscription && (
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title title01 text-center w-100">Product Details</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                    <div className="row g-3 p-3">

                                        <div className="col-12">
                                            <div className="row">
                                                <span className="title13 col-12 col-lg-4">Subscription ID</span>
                                                <div className="mb-1 col-12 col-lg-8">
                                                    <input type="text" className="form-control" id="licenseKeySubscribedSubscriptionId" value={subscriptionId} onChange={(e) => setSubscriptionId(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <span className="title13 col-12 col-lg-4">Product Name</span>
                                                <div className="mb-1 col-12 col-lg-8">
                                                    <input type="text" className="form-control" id="licenseKeySubscribedProductName" value={productName} onChange={(e) => setProductName(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <span className="title13 col-12 col-lg-4">License Key</span>
                                                <div className="mb-1 col-12 col-lg-8">
                                                    <input type="text" className="form-control" id="productSubscribedLicenseKey" value={licensekey} onChange={(e) => setLicensekey(e.target.value)} />
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

export default AuditTraceSubscribedTable;
