"use client"
export default function customerPdfModal() {
    return (
        <>
            {/* Customer PDF Modal */}

            <div className="modal fade" tabIndex="-1" id="customerPdfModal" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title title01 text-center w-100">
                                CUSTOMER DETAILS
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row g-3 p-3">
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-4">Broadband ID</span>
                                        <div className="mb-1 col-12 col-lg-8">
                                            <input readonly type="text" className="form-control" id="bi" value="94347894562" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-4"> Product Name </span>
                                        <div className="mb-1 col-12 col-lg-8">
                                            <input readonly type="text" className="form-control" id="bi"
                                                value="Premium Security Suite" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-4"> Product Price </span>
                                        <div className="mb-1 col-12 col-lg-8">
                                            <input readonly type="text" className="form-control" id="bi" value="Rs 108.00" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-4">
                                            Manage Subscription
                                        </span>
                                        <div className="mb-1 col-12 col-lg-8">
                                            <input readonly type="text" className="form-control" id="bi" value="Subscribed" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-4">
                                            Subscription Plan
                                        </span>
                                        <div className="mb-1 col-12 col-lg-8">
                                            <input readonly type="text" className="form-control" id="bi" value="Monthly Plan" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-4">
                                            Subscription Details
                                        </span>
                                        <div className="mb-1 col-12 col-lg-8">
                                            <textarea readonly type="text" className="form-control text-start textA" id="bi"
                                                rows="3">
                                                Subscribed by Admin
                                                Admin ID : 278227872
                                                Admin Name : Ms. Anudi
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-4"> Purchased Date </span>
                                        <div className="mb-1 col-12 col-lg-8">
                                            <input readonly type="text" className="form-control" id="bi"
                                                value="From 12/03/2023 to 12/04/2023" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer p-lg-4">
                            <button type="button" className="btn7 col-12 col-lg-3" onclick="ABC();">
                                Download
                            </button>
                            <button type="button" className="btn7 col-12 col-lg-3" onclick="ABC();">
                                Send Email
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Customer PDF Modal */}

        </>
    );
}
