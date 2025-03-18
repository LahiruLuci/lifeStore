/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const AdminSubscriptionTableRows = ({ adminSubscriptions, onAdminSubscriptionsClick, onCustomerSubscriptionsUnsubscribeClick, onCustomerSubscriptionsEmailSendClick }) => {
    if (!adminSubscriptions || !Array.isArray(adminSubscriptions) || adminSubscriptions.length === 0) {
        return <p>No Subscriptions available for this customer</p>;
    } else {

        //admins subscription licensekey modal viewing
        const onAdminSubscriptionClick = useCallback((adminSubscription) => {
            AdminLiceseKeyView();
            onAdminSubscriptionsClick(adminSubscription);
        }, [onAdminSubscriptionsClick]);

        //admins unsubscription confirmation modal viewing
        const onCustomerSubscriptionUnsubscribeClick = useCallback((adminSubscription) => {
            SubscriptionsUnsubscribeViewAsk2();
            onCustomerSubscriptionsUnsubscribeClick(adminSubscription);
        }, [onCustomerSubscriptionsUnsubscribeClick]);

        //admins customer subscription email sending confimation modal viewing
        const onCustomerEmailSendClick = useCallback((adminSubscription) => {
            SubscriptionsEmailSendViewAsk2();
            onCustomerSubscriptionsEmailSendClick(adminSubscription);
        }, [onCustomerSubscriptionsEmailSendClick]);

        return (
            <>
                <table>
                    <thead>
                        <tr className="subscriptionHeaderText">

                            <th scope="col" className="col-1 th2">Subscription ID</th>
                            <th scope="col" className="col-3 th2">Product Name</th>
                            <th scope="col" className="col-2 th2">Price</th>
                            <th scope="col" className="col-2 th2">Enroll Date</th>
                            <th scope="col" className="col-4 th2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminSubscriptions.map((adminSubscription) => (

                            <tr className="subscriptionText border-bottom" key={adminSubscription.SUBSCRIPTIONID}>
                                {adminSubscription.STATUSDESCRIPTION == "Subscribed" && (
                                    <>
                                        <td className="td2">{adminSubscription.SUBSCRIPTIONID}<br />(<span className='text-success fw-bold'> ACTIVE </span>)</td>
                                        <td className="td2">{adminSubscription.PRODUCTNAME}</td>
                                        <td className="td2">{adminSubscription.AMOUNT}</td>
                                        <td className="td2">{(adminSubscription.LASTUPDATEDDATETIME).toString().split('T')[0]}</td>
                                        <td className="td2">
                                            <div className="col-12">
                                                <div className="row p-3 align-content-center justify-content-center">
                                                    <button className="m-1 col-lg-6 viewLicenseKey-Button" onClick={() => onAdminSubscriptionClick(adminSubscription)}>View license
                                                        key</button>
                                                    {adminSubscription.CREATEDUSER != "KasperskyWithCRM" && (
                                                        <>
                                                            <button className="m-1 col-lg-4 unsubscribe-button"
                                                                onClick={() => onCustomerSubscriptionUnsubscribeClick(adminSubscription)}>Unsubscribe</button>
                                                        </>
                                                    )}
                                                    <button className="m-1 col-lg-1 email-Button" onClick={() => onCustomerEmailSendClick(adminSubscription)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-at" viewBox="0 0 16 16">
                                                        <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
                                                        <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                                                    </svg></button>
                                                </div>
                                            </div>
                                        </td>
                                    </>
                                )}
                                {adminSubscription.STATUSDESCRIPTION == "Unsubscribed" && (
                                    <>
                                        <td className="td2">{adminSubscription.SUBSCRIPTIONID}</td>
                                        <td className="td2">{adminSubscription.PRODUCTNAME}</td>
                                        <td className="td2">{adminSubscription.AMOUNT}</td>
                                        <td className="td2">{(adminSubscription.LASTUPDATEDDATETIME).toString().split('T')[0]}</td>
                                        <td className="td2">
                                            <div className="col-12">
                                                <div className="row p-3 align-content-center justify-content-center">
                                                    {adminSubscription.LASTUPDATEDUSER == localStorage.getItem('customer_id') ? (
                                                        <>
                                                            <span className='fw-bold text-secondary'>Unsubscribed</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className='fw-bold text-secondary'>Unsubscribed by Admin</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </>
                                )}
                                {adminSubscription.STATUSDESCRIPTION == "Inactive" && (
                                    <>
                                        <td className="td2">{adminSubscription.SUBSCRIPTIONID}</td>
                                        <td className="td2">{adminSubscription.PRODUCTNAME}</td>
                                        <td className="td2">{adminSubscription.AMOUNT}</td>
                                        <td className="td2">{(adminSubscription.LASTUPDATEDDATETIME).toString().split('T')[0]}</td>
                                        <td className="td2">
                                            <div className="col-12">
                                                <div className="row p-3 align-content-center justify-content-center">
                                                    <span className='text-danger fw-bold'>Account Suspended</span><br />
                                                    <span>(Call for more info : 1212)</span>
                                                </div>
                                            </div>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}


                    </tbody>
                </table>
            </>
        );
    }
};

AdminSubscriptionTableRows.propTypes = {
    adminSubscriptions: PropTypes.arrayOf(
        PropTypes.shape({
            SUBSCRIPTIONID: PropTypes.number.isRequired,
            PRODUCTNAME: PropTypes.string.isRequired,
            AMOUNT: PropTypes.string.isRequired,
            CREATEDDATETIME: PropTypes.string.isRequired,
            LICENSEKEY: PropTypes.string.isRequired,

        })
    ).isRequired,
    onAdminSubscriptionClick: PropTypes.func.isRequired,
};

export default AdminSubscriptionTableRows;
