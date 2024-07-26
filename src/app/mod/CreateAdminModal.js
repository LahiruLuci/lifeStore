"use client"
export default function createAdminModal() {

    return (
        <>
            {/* Create Admin Modal */}

            <div className="modal fade" tabIndex="-1" id="createAdminModal" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title title01 text-center w-100">CREATE ADMIN</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="row g-3 p-3">

                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-4">Admin ID</span>
                                        <div className="mb-1 col-12 col-lg-8">
                                            <input type="text" className="form-control" id="adminId" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-4">Name(Initials) </span>
                                        <div className="mb-1 col-12 col-lg-8">
                                            <input type="text" className="form-control" id="adminInitialsName" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-4">Name(Preferred Name) </span>
                                        <div className="mb-1 col-12 col-lg-8">
                                            <input type="text" className="form-control" id="adminPreferredName" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-4">Name(Last Name) </span>
                                        <div className="mb-1 col-12 col-lg-8">
                                            <input type="text" className="form-control" id="adminLastName" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-4">Email </span>
                                        <div className="mb-1 col-12 col-lg-8">
                                            <input type="text" className="form-control" id="adminEmail" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-4">NIC </span>
                                        <div className="mb-1 col-12 col-lg-8">
                                            <input type="text" className="form-control" id="adminNIC" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-4">Mobile Number </span>
                                        <div className="mb-1 col-12 col-lg-8">
                                            <input type="text" className="form-control" id="adminMobile" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-4">Create password </span>
                                        <div className="mb-1 col-12 col-lg-8">
                                            <input type="password" className="form-control" id="adminPassword3" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-4">Retype Password </span>
                                        <div className="mb-1 col-12 col-lg-8">
                                            <input type="password" className="form-control" id="adminPassword4" />
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="modal-footer p-lg-4">
                            <button type="button" className="btn7 col-12 col-lg-3" onClick={addAdmin}>Create Admin</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Create Admin Modal */}

        </>
    );
}
