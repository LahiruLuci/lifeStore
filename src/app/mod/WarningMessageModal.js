"use client"
export default function warningMessageModal() {

    return (
        <>
            {/* Message Modal */}

            <div className="modal" tabIndex="-1" id="warning_message_modal">
                <div className="modal-dialog position-relative top-0 end-0 p-3" style={{maxWidth: "450px"}}>
                    <div className="modal-content">
                        <div className="modal-header bg-danger" id="msgModalHeader">
                            <h5 className="modal-title text01 w-100">
                                <i className="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>WARNING !</span>
                            </h5>
                            <button type="button" className="btn-close bg-white" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="row g-2">

                                <div className="col-12">
                                    <h3 className="form-label text-center">
                                        <span className="text02" id="warningMsgDescriptionHead"></span><br />
                                    </h3><br /><br />
                                    <div className="container col-4 p-3">
                                        <div className="row justify-content-center">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                                id="btnText">GOT IT</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Message Modal */}

        </>
    );
}
