"use client"
import AdminSubscriptionTableRows from "./adminSubscriptionTable";
import { useEffect, useState } from "react";

export async function getSubscriptionsProps() {
    let customer = localStorage.getItem('customer_id');
    if (!customer) {
        alert("Please select a Customer First")
        return;
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/routes/userSubscription?USER=${customer}`);
    const subscriptionsDetails = await response.json();

    return {
        props: {
            subscriptionsDetails: subscriptionsDetails || [],
        },
    };
}

export default function AdminSubscriptionView() {

    const [user, setUser] = useState('');
    const [loading, setLoading] = useState('');
    const [subscriptions, setSubscriptions] = useState('');
    const [selectedsubscription, setSelectedsubscription] = useState('');
    const [subscriptionId, setSubscriptionId] = useState('');
    const [productName, setProductName] = useState('');
    const [createdDateTime, setCreatedDateTime] = useState('');
    const [licensekey, setLicensekey] = useState('');

    useEffect(() => {
        const fetchUserSubscriptions = async () => {
            try {
                const result = await getSubscriptionsProps();
                setSubscriptions(result.props.subscriptionsDetails);
            } catch (error) {
                console.error('Error fetching subscriptions Details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserSubscriptions();
    }, []);

    const handleSubscriptionsClick = (subscription) => {
        setSelectedsubscription(subscription);
        setSubscriptionId(subscription.SUBSCRIPTIONID);
        setProductName(subscription.PRODUCTNAME);
        setCreatedDateTime(subscription.CREATEDDATETIME);
        setLicensekey(subscription.LICENSEKEY);
    };

    const handleSubscriptionsUnsubscribeClick = (subscription) => {
        setSelectedsubscription(subscription);
        setSubscriptionId(subscription.SUBSCRIPTIONID);
    };

    const handleUnsubscribeConfirm = async () => {

        let user = localStorage.getItem('customer_id');

        try {

            const payload = {
                user,
                subscriptionId,
                licensekey,
            };

            const patchData = await fetch(`${process.env.NEXT_PUBLIC_URL}/routes/userSubscription`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "subsciptions/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await patchData.json();
            if (result.message === "Product Unsubscribed Successfully!") {
                const updatedSubscriptions = subscriptions.filter((s) => s.SUBSCRIPTIONID !== result.subscriptionId);
                setSubscriptions(updatedSubscriptions);
                successMsgDescriptionHead.innerText = "Product Unsubscribed Successfully.";

                success_message_modal.addEventListener('hidden.bs.modal', () => {
                    window.location.href = '/customerSubscription';
                });

                successMessageModal.show();
            }

        } catch (error) {
            console.error('Error Unsubscribiung product:', error);
        }

    };

    return (
        <>
            <div className="col-12 mt-3 mb-3 p-3 text-left">
                <span className="title06">SUBSCRIPTIONS</span>
            </div>
            <div className="container-fluid align-content-center justify-content-center">
                <div className="col-12">
                    <div className="text-black row p-4">
                        {loading ? <p>Loading...</p> : <AdminSubscriptionTableRows adminSubscriptions={subscriptions} onAdminSubscriptionsClick={handleSubscriptionsClick} onCustomerSubscriptionsClick={handleSubscriptionsClick} onCustomerSubscriptionsUnsubscribeClick={handleSubscriptionsUnsubscribeClick} />}
                    </div>
                </div>
            </div>

            <div className="modal fade" tabindex="-1" id="adminLiceseKeyViewModal" role="dialog">
                <div className="modal-dialog modal-lg" role="document">

                    {selectedsubscription && (
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title title01 text-center w-100">Product Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="row g-3 p-3">

                                    <div className="col-12">
                                        <div className="row">
                                            <span className="title13 col-12 col-lg-4">Product Name</span>
                                            <div className="mb-1 col-12 col-lg-8">
                                                <input readOnly type="text" className="form-control" id="licenseKeyProductName" value={productName} onChange={(e) => setProductName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <span className="title13 col-12 col-lg-4">License Key</span>
                                            <div className="mb-1 col-12 col-lg-8">
                                                <input readOnly type="password" className="form-control" id="productLicenseKey" value={licensekey} onChange={(e) => setLicensekey(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div class="modal" tabindex="-1" id="admin_product_unsubscribe_selection_message_modal">
                <div class="modal-dialog position-relative p-3" style={{ width: "450px" }}>
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
                                        <span class="text03" id="adminunsubscribeselectionMsgDescriptionHead"></span><br />
                                    </h3><br /><br />
                                    <div className="col-12">
                                        <div className="row justify-content-center">
                                            <div class="col-4 p-3">
                                                <div class="row justify-content-center">
                                                    <button type="button" class="btn btn-danger" onClick={handleUnsubscribeConfirm}>
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
