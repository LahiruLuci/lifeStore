/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useState } from "react";

export async function getAllUsersProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/routes/allUsers`);
    const allUsers = await res.json();

    return {
        props: {
            allUsers: allUsers || [],
        },
    };
}

const AuditTraceAllTable = ({ allUsers }) => {
    if (!allUsers || !Array.isArray(allUsers) || allUsers.length === 0) {
        return <p className="text-center text-danger text-large" id="auditTraceDataTracker">No details in selected date range</p>;
    } else {

        const [selectedAllSubscription, setSelectedAllSubscription] = useState({});
        const [subscriptionId, setSubscriptionId] = useState('');
        const [productName, setProductName] = useState('');
        const [licensekey, setLicensekey] = useState('');
        const [status, setStatus] = useState('');

        const onAllViewClick = (allUser) => {
            AllLiceseKeyView();
            setSelectedAllSubscription(allUser);
            setSubscriptionId(allUser.SUBSCRIPTIONID);
            setProductName(allUser.PRODUCTNAME);
            setLicensekey(allUser.LICENSEKEY);
            setStatus(allUser.STATUS);
        };

        const auditTraceHome = () => {
            const auditTracePanel = document.getElementById("auditTracePanel");
            const auditTraceAllTable = document.getElementById("auditTraceAllTable");

            auditTracePanel.classList.remove("d-none");
            auditTraceAllTable.classList.add("d-none");
        }

        // const onAdminEditViewClick = useCallback((allUser) => {
        //     EditAllUsersView();
        //     onAdminEditClick(allUser);
        // }, [onAdminEditClick]);

        return (
            <>
                <p className="text-center text-danger text-large" id="auditTraceDataTracker"></p>
                <div id="auditTraceAllTable" className="d-none">
                    <div className="col-12 mt-3 p-3">
                        <span className="title21" onClick={auditTraceHome}><i class="bi bi-arrow-bar-left"></i>&nbsp;Audit Trace /</span><span className="title06"> All</span>
                    </div>

                    <div className="container-fluid align-content-center justify-content-center">
                        <div className="col-12">
                            <div className="text-black row p-4">

                                <table>
                                    <thead>
                                        <tr className="title11">
                                            <th scope="col" className="col-2">Broadband ID</th>
                                            <th scope="col" className="col-2">Product Name</th>
                                            <th scope="col" className="col-2">Subscribed Date</th>
                                            <th scope="col" className="col-2">Unsubscribed Date</th>
                                            <th scope="col" className="col-1">Actions</th>
                                            <th scope="col" className="col-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allUsers.map((allUser) => (
                                            <tr className="title12 border-bottom" key={allUser.SUBSCRIPTIONID}>
                                                <td>{allUser.SLTBBID}</td>
                                                <td>{allUser.PRODUCTNAME}</td>
                                                {allUser.STATUS == 4 ? (
                                                    <>
                                                        <td>-</td>
                                                        <td>{(allUser.CREATEDDATETIME).toString().split('T')[0]}</td>
                                                        {allUser.USER == allUser.CREATEDUSER ? (
                                                            <>
                                                                <td>Unsubscribed</td>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <td>Unsubscribed by Admin</td>
                                                            </>
                                                        )}

                                                    </>
                                                ) : (
                                                    <>
                                                        <td>{(allUser.CREATEDDATETIME).toString().split('T')[0]}</td>
                                                        <td>-</td>
                                                        {allUser.USER == allUser.CREATEDUSER ? (
                                                            <>
                                                                <td>Subscribed</td>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <td>Subscribed by Admin</td>
                                                            </>
                                                        )}
                                                    </>
                                                )}

                                                <td>
                                                    <div className="col-12">
                                                        <div className="row p-3 align-items-center justify-content-center">
                                                            <button className="m-1 col-lg-5 col-12 outline-button" onClick={() => onAllViewClick(allUser)}>View More</button>
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
                <div className="modal fade" tabindex="-1" id="liceseKeyAllViewModal" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">

                        {selectedAllSubscription && (
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
                                                    <input type="text" className="form-control" id="licenseKeySubscribedSubscriptionId" value={subscriptionId} onChange={(e) => setSubscriptionId(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <span className="title13 col-12 col-lg-5">Product Name</span>
                                                <div className="mb-1 col-12 col-lg-7">
                                                    <input type="text" className="form-control" id="licenseKeySubscribedProductName" value={productName} onChange={(e) => setProductName(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        {status == 4 ? (
                                            <>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <span className="title13 col-12 col-lg-5">License Key / <span className="text-danger">Not-Active</span></span>
                                                        <div className="mb-1 col-12 col-lg-7">
                                                            <input type="text" className="form-control" id="productSubscribedLicenseKey" value={licensekey} onChange={(e) => setLicensekey(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>

                                            </>
                                        ) : (
                                            <>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <span className="title13 col-12 col-lg-5">License Key</span>
                                                        <div className="mb-1 col-12 col-lg-7">
                                                            <input type="text" className="form-control" id="productSubscribedLicenseKey" value={licensekey} onChange={(e) => setLicensekey(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

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

export default AuditTraceAllTable;
