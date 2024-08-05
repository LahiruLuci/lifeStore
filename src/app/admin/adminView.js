"use client"
import { useEffect, useState } from "react";
import AdminTable from "./adminTableView";
import { getAdminsProps } from './adminTableView';

export default function AdminView() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [userId, setUserId] = useState('');
    const [fullName, setFullName] = useState('');
    const [initials, setInitials] = useState('');
    const [preferredName, setPreferredName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [createdDateTime, setCreatedDateTime] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const result = await getAdminsProps();
                setAdmins(result.props.admins);
            } catch (error) {
                console.error('Error fetching admins:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);

    let successMessageModal;
    let warningMessageModal;

    const addAdmin = async () => {
        const userId = document.getElementById("adminId").value;
        const normalPassword = document.getElementById("adminPassword3").value;
        const password4 = document.getElementById("adminPassword4").value;
        const initials = document.getElementById("adminInitialsName").value;
        const preferredName = document.getElementById("adminPreferredName").value;
        const lastName = document.getElementById("adminLastName").value;
        const email = document.getElementById("adminEmail").value;
        const nic = document.getElementById("adminNIC").value;
        const mobile = document.getElementById("adminMobile").value;
        let successMsgDescriptionHead = document.getElementById("successMsgDescriptionHead");
        let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
        let success_message_modal = document.getElementById("success_message_modal");
        let warning_message_modal = document.getElementById("warning_message_modal");
        warningMessageModal = new bootstrap.Modal(warning_message_modal);
        successMessageModal = new bootstrap.Modal(success_message_modal);
        const password = bcrypt.hashSync(normalPassword, 10);

        try {

            const paycreate = {
                userId,
                password,
                initials,
                preferredName,
                lastName,
                email,
                nic,
                mobile,
            };

            const postData = await fetch(`${process.env.NEXT_PUBLIC_URL7}`, {
                method: "POST",
                headers: {
                    "Content-Type": "admins/json",
                },
                body: JSON.stringify(paycreate),
            });

            const result = await postData.json();
            if (result.message === "Admin added successfully!") {
                const updatedAdmins = admins.filter((a) => a.USERID !== result.userId);
                setAdmins(updatedAdmins);
                successMsgDescriptionHead.innerText = "Admin Successfully Entered.";

                success_message_modal.addEventListener('hidden.bs.modal', () => {
                    window.location.href = '/admin';
                });

                successMessageModal.show();
            }

        } catch (error) {
            console.error('Error adding admin:', error);
        }

    };

    const updateAdmin = async () => {
        const normalPassword = document.getElementById("editAdminPassword1").value;
        const password = bcrypt.hashSync(normalPassword, 10);

        try {

            const payload = {
                userId,
                mobile,
                password,
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL7}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'admins/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.message === 'Admin Details updated successfully!') {
                const updatedAdmins = admins.map(a => (a.USERID === selectedAdmin.USERID ? result.updateAdmin : a));
                setAdmins(updatedAdmins);
                successMsgDescriptionHead.innerText = "Admin Details Updated Successfully!";
                window.location.href = '/admin';
                successMessageModal.show();
            }
        } catch (error) {
            console.error('Error updating admin:', error);
        }

    };

    const deleteAdmin = async (user) => {
        const userId = user.USERID;
        try {
            const deleteData = await fetch(`${process.env.NEXT_PUBLIC_URL7}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "admins/json",
                },
                body: JSON.stringify({ userId }),
            });

            const result = await deleteData.json();
            if (result.message === "Admin deleted successfully!") {
                const updatedAdmins = admins.filter((a) => a.USERID !== userId);
                setAdmins(updatedAdmins);
                successMsgDescriptionHead.innerText = "Admin deleted successfully!";
                window.location.href = '/admin';
                successMessageModal.show();
            }
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    };

    const handleAdminEditClick = (admin) => {
        setSelectedAdmin(admin);
        setUserId(admin.USERID);
        setInitials(admin.INITIALS);
        setPreferredName(admin.PREFERREDNAME);
        setLastName(admin.LASTNAME);
        setFullName(admin.INITIALS + " " + admin.PREFERREDNAME + " " + admin.LASTNAME)
        setMobile(admin.MOBILE);
        setCreatedDateTime(admin.CREATEDDATETIME);
        setPassword(admin.PASSWORD);
        setPassword2(admin.PASSWORD);
    };

    const onAdminAddViewClick = () => {
        const userId = document.getElementById("adminId").value;
        const password = document.getElementById("adminPassword3").value;
        const password4 = document.getElementById("adminPassword4").value;
        const initials = document.getElementById("adminInitialsName").value;
        const preferredName = document.getElementById("adminPreferredName").value;
        const lastName = document.getElementById("adminLastName").value;
        const email = document.getElementById("adminEmail").value;
        const nic = document.getElementById("adminNIC").value;
        const mobile = document.getElementById("adminMobile").value;
        let successMsgDescriptionHead = document.getElementById("successMsgDescriptionHead");
        let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
        let createAdminModal = document.getElementById("createAdminModal");
        let success_message_modal = document.getElementById("success_message_modal");
        let warning_message_modal = document.getElementById("warning_message_modal");
        warningMessageModal = new bootstrap.Modal(warning_message_modal);
        successMessageModal = new bootstrap.Modal(success_message_modal);

        if (userId == "") {
            warningMsgDescriptionHead.innerText = "Please Enter a User Id.";
            cav.hide();
            warning_message_modal.addEventListener('hidden.bs.modal', () => {
                cav.show();
            });
            warningMessageModal.show();
        } else if (initials == "") {
            warningMsgDescriptionHead.innerText = "Please Enter a your Initials.";
            cav.hide();
            warning_message_modal.addEventListener('hidden.bs.modal', () => {
                cav.show();
            });
            warningMessageModal.show();
        } else if (preferredName == "") {
            warningMsgDescriptionHead.innerText = "Please Enter a Preferred Name.";
            cav.hide();
            warning_message_modal.addEventListener('hidden.bs.modal', () => {
                cav.show();
            });
            warningMessageModal.show();
        } else if (lastName == "") {
            warningMsgDescriptionHead.innerText = "Please Enter a Last Name.";
            cav.hide();
            warning_message_modal.addEventListener('hidden.bs.modal', () => {
                cav.show();
            });
            warningMessageModal.show();
        } else if (email == "") {
            warningMsgDescriptionHead.innerText = "Please Enter a Email.";
            cav.hide();
            warning_message_modal.addEventListener('hidden.bs.modal', () => {
                cav.show();
            });
            warningMessageModal.show();
        } else if (nic == "") {
            warningMsgDescriptionHead.innerText = "Please Enter a NIC.";
            cav.hide();
            warning_message_modal.addEventListener('hidden.bs.modal', () => {
                cav.show();
            });
            warningMessageModal.show();
        } else if (mobile == "") {
            warningMsgDescriptionHead.innerText = "Please Enter a Mobile Number.";
            cav.hide();
            warning_message_modal.addEventListener('hidden.bs.modal', () => {
                cav.show();
            });
            warningMessageModal.show();
        } else if (password == "") {
            warningMsgDescriptionHead.innerText = "Please Enter a Password.";
            cav.hide();
            warning_message_modal.addEventListener('hidden.bs.modal', () => {
                cav.show();
            });
            warningMessageModal.show();
        } else if (password4 == "") {
            warningMsgDescriptionHead.innerText = "Please Re-Enter a Your Password.";
            cav.hide();
            warning_message_modal.addEventListener('hidden.bs.modal', () => {
                cav.show();
            });
            warningMessageModal.show();
        } else {
            if (password == password4) {
                AdminAddViewClickAsk();
            } else {
                warningMsgDescriptionHead.innerText = "These passwords are not equal !.";
                cav.hide();
                warning_message_modal.addEventListener('hidden.bs.modal', () => {
                    cav.show();
                });
                warningMessageModal.show();
            }
        }

    };

    const handleAddConfirm = () => {
        cav.hide();
        aavca.hide();
        addAdmin();
    };

    const onAdminEditViewClick = () => {
        const editAdminPassword1 = document.getElementById("editAdminPassword1").value;
        const editAdminPassword2 = document.getElementById("editAdminPassword2").value;
        const mobile = document.getElementById("editAdminMobile").value;
        let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
        let success_message_modal = document.getElementById("success_message_modal");
        let warning_message_modal = document.getElementById("warning_message_modal");
        warningMessageModal = new bootstrap.Modal(warning_message_modal);
        successMessageModal = new bootstrap.Modal(success_message_modal);
        if (mobile == "") {
            warningMsgDescriptionHead.innerText = "Please Enter a Mobile Number.";
            eav.hide();
            warning_message_modal.addEventListener('hidden.bs.modal', () => {
                eav.show();
            });
            warningMessageModal.show();
        } else if (editAdminPassword1 == "") {
            warningMsgDescriptionHead.innerText = "Please Enter a Password.";
            eav.hide();
            warning_message_modal.addEventListener('hidden.bs.modal', () => {
                eav.show();
            });
            warningMessageModal.show();
        } else if (editAdminPassword2 == "") {
            warningMsgDescriptionHead.innerText = "Please Re-Enter a Your Password.";
            eav.hide();
            warning_message_modal.addEventListener('hidden.bs.modal', () => {
                eav.show();
            });
            warningMessageModal.show();
        } else {
            if (editAdminPassword1 == editAdminPassword2) {
                AdminEditViewClickAsk();
            } else {
                warningMsgDescriptionHead.innerText = "These passwords are not equal !.";
                eav.hide();
                warning_message_modal.addEventListener('hidden.bs.modal', () => {
                    eav.show();
                });
                warningMessageModal.show();
            }
        }
    };

    const handleEditConfirm = () => {
        if (selectedAdmin) {
            updateAdmin();
        }
    };

    return (
        <>
            <div className="col-12 mt-3 p-3">
                <span className="title06">ADMIN DETAILS</span>
            </div>

            <div className="container-fluid align-content-center justify-content-between">
                <div className="col-12">
                    <div className="text-black row p-3">
                        {loading ? <p>Loading...</p> : <AdminTable admins={admins} onAdminEditClick={handleAdminEditClick} onAdminDeleteClick={deleteAdmin} />}
                        <div className="col-12">
                            <div className="row mt-3 justify-content-end">
                                <button className="btn7 col-12 col-lg-2 m-lg-5"
                                    onClick={() => createAdminView()}>Create Admin</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="modal" tabIndex="-1" id="success_message_modal">
                <div class="modal-dialog position-relative p-3" style={{ width: "450px" }}>
                    <div class="modal-content">
                        <div class="modal-header bg-success" id="msgModalHeader">
                            <h5 class="modal-title text01 w-100">
                                <span>SUCCESS</span>
                            </h5>
                            <button type="button" class="btn-close bg-white" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <div class="row g-2">

                                <div class="col-12">
                                    <h3 class="form-label text-center">
                                        <span class="text04" id="successMsgDescriptionHead"></span><br />
                                    </h3><br /><br />
                                    <div class="container col-4 p-3">
                                        <div class="row justify-content-center">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                                id="btnText">DONE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal" tabIndex="-1" id="warning_message_modal">
                <div class="modal-dialog position-relative p-3" style={{ width: "450px" }}>
                    <div class="modal-content">
                        <div class="modal-header bg-danger" id="msgModalHeader">
                            <h5 class="modal-title text01 w-100">
                                <i class="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>WARNING !</span>
                            </h5>
                            <button type="button" class="btn-close bg-white" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <div class="row g-2">

                                <div class="col-12">
                                    <h3 class="form-label text-center">
                                        <span class="text02" id="warningMsgDescriptionHead"></span><br />
                                    </h3><br /><br />
                                    <div class="container col-4 p-3">
                                        <div class="row justify-content-center">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                                id="btnText">GOT IT</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" tabIndex="-1" id="editAdminModal" role="dialog">
                <div className="modal-dialog modal-lg" role="document">

                    {selectedAdmin && (
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title title01 text-center w-100">EDIT ADMIN DETAILS</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="row g-3 p-3">

                                    <div className="col-12">
                                        <div className="row">
                                            <span className="title13 col-12 col-lg-4">Admin ID</span>
                                            <div className="mb-1 col-12 col-lg-8">
                                                <input type="text" readOnly className="form-control" value={userId} onChange={(e) => setUserId(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <span className="title13 col-12 col-lg-4">Full Name</span>
                                            <div className="mb-1 col-12 col-lg-8">
                                                <input type="text" readOnly className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <span className="title13 col-12 col-lg-4">Mobile Number</span>
                                            <div className="mb-1 col-12 col-lg-8">
                                                <input type="text" className="form-control" id="editAdminMobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <span className="title13 col-12 col-lg-4">Create Password</span>
                                            <div className="mb-1 col-12 col-lg-8">
                                                <input type="password" className="form-control" id="editAdminPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <span className="title13 col-12 col-lg-4">Retype Password</span>
                                            <div className="mb-1 col-12 col-lg-8">
                                                <input type="password" className="form-control" id="editAdminPassword2" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer p-lg-4">
                                <button type="button" className="btn7 col-12 col-lg-3" onClick={onAdminEditViewClick}>Save</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

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
                                        <span className="title13 col-12 col-lg-5">Admin ID</span>
                                        <div className="mb-1 col-12 col-lg-7">
                                            <input type="text" className="form-control" id="adminId" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-5">Name(Initials) </span>
                                        <div className="mb-1 col-12 col-lg-7">
                                            <input type="text" className="form-control" id="adminInitialsName" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-5">Name(Preferred Name) </span>
                                        <div className="mb-1 col-12 col-lg-7">
                                            <input type="text" className="form-control" id="adminPreferredName" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-5">Name(Last Name) </span>
                                        <div className="mb-1 col-12 col-lg-7">
                                            <input type="text" className="form-control" id="adminLastName" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-5">Email </span>
                                        <div className="mb-1 col-12 col-lg-7">
                                            <input type="text" className="form-control" id="adminEmail" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-5">NIC </span>
                                        <div className="mb-1 col-12 col-lg-7">
                                            <input type="text" className="form-control" id="adminNIC" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-5">Mobile Number </span>
                                        <div className="mb-1 col-12 col-lg-7">
                                            <input type="text" className="form-control" id="adminMobile" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-5">Create password </span>
                                        <div className="mb-1 col-12 col-lg-7">
                                            <input type="password" className="form-control" id="adminPassword3" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <span className="title13 col-12 col-lg-5">Retype Password </span>
                                        <div className="mb-1 col-12 col-lg-7">
                                            <input type="password" className="form-control" id="adminPassword4" />
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="modal-footer p-lg-4">
                            <button type="button" className="btn7 col-12 col-lg-3" onClick={onAdminAddViewClick}>Create Admin</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" tabIndex="-1" id="admin_edit_selection_message_modal">
                <div class="modal-dialog position-relative p-3" style={{ width: "450px" }}>
                    <div class="modal-content">
                        <div class="modal-header bg-success">
                            <h5 class="modal-title text01 w-100">
                                <i class="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>CONFIRMATION</span>
                            </h5>
                            <button type="button" class="btn-close bg-white" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row g-2">
                                <div class="col-12">
                                    <h3 class="form-label text-center">
                                        <span class="text03" id="editselectionMsgDescriptionHead"></span><br />
                                    </h3><br /><br />
                                    <div className="col-12">
                                        <div className="row justify-content-center">
                                            <div class="col-4 p-3">
                                                <div class="row justify-content-center">
                                                    <button type="button" class="btn btn-success" onClick={handleEditConfirm}>
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

            <div class="modal fade" tabIndex="-1" id="admin_add_selection_message_modal">
                <div class="modal-dialog position-relative p-3" style={{ width: "450px" }}>
                    <div class="modal-content">
                        <div class="modal-header bg-success">
                            <h5 class="modal-title text01 w-100">
                                <i class="bi bi-question-circle msgHeaderTitle text-white"></i>&nbsp;<span>CONFIRMATION</span>
                            </h5>
                            <button type="button" class="btn-close bg-white" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row g-2">
                                <div class="col-12">
                                    <h3 class="form-label text-center">
                                        <span class="text03" id="addselectionMsgDescriptionHead"></span><br />
                                    </h3><br /><br />
                                    <div className="col-12">
                                        <div className="row justify-content-center">
                                            <div class="col-4 p-3">
                                                <div class="row justify-content-center">
                                                    <button type="button" class="btn btn-success" onClick={handleAddConfirm}>
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
