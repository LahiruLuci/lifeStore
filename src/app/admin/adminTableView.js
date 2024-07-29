/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

export async function getAdminsProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL7}`);
    const admins = await res.json();

    return {
        props: {
            admins: admins || [],
        },
    };
}

const AdminTableRows = ({ admins, onAdminEditClick, onAdminDeleteClick }) => {
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    if (!admins || !Array.isArray(admins) || admins.length === 0) {
        return <p>No admins available</p>;
    } else {

        const onAdminEditViewClick = useCallback((admin) => {
            EditAdminView();
            onAdminEditClick(admin);
        }, [onAdminEditClick]);

        const onAdminDeleteViewClick = useCallback((admin) => {
            setSelectedAdmin(admin);
            AdminDeleteViewClickAsk();
        }, []);

        const handleDeleteConfirm = () => {
            if (selectedAdmin) {
                onAdminDeleteClick(selectedAdmin);
            }
        };

        return (
            <>
                <table>
                    <thead>
                        <tr className="title11">
                            <th scope="col" className='col-2'>Admin ID</th>
                            <th scope="col" className='col-2'>Name</th>
                            <th scope="col" className='col-2'>Mobile number</th>
                            <th scope="col" className='col-1'>Date</th>
                            <th scope="col" className='col-5'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin) => (
                            <tr className="title12 border-bottom" key={admin.USERID}>
                                <td>{admin.USERID}</td>
                                <td>{admin.INITIALS}&nbsp;{admin.PREFERREDNAME}&nbsp;{admin.LASTNAME}</td>
                                <td>{admin.MOBILE}</td>
                                <td>{(admin.CREATEDDATETIME).toString().split('T')[0]}</td>
                                <td>
                                    <div className="col-12">
                                        <div className="row p-2 align-items-center">
                                            <button className="offset-lg-1 m-1 btn5 col-12 col-lg-5" onClick={() => onAdminEditViewClick(admin)}>Edit</button>
                                            <button className="m-1 btn6 col-12 col-lg-5" onClick={() => onAdminDeleteViewClick(admin)}>Delete</button>
                                        </div>
                                    </div>
                                </td>
                            </tr >
                        ))}
                    </tbody>
                </table>
                <div class="modal" tabindex="-1" id="admin_delete_selection_message_modal">
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
                                            <span class="text03" id="deleteselectionMsgDescriptionHead"></span><br />
                                        </h3><br /><br />
                                        <div className="col-12">
                                            <div className="row justify-content-center">
                                                <div class="col-4 p-3">
                                                    <div class="row justify-content-center">
                                                        <button type="button" class="btn btn-danger" onClick={handleDeleteConfirm}>
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
};

AdminTableRows.propTypes = {
    admins: PropTypes.arrayOf(
        PropTypes.shape({
            USERID: PropTypes.number.isRequired,
            INITIALS: PropTypes.string.isRequired,
            PREFERREDNAME: PropTypes.string.isRequired,
            LASTNAME: PropTypes.string.isRequired,
            MOBILE: PropTypes.number.isRequired,
            CREATEDDATETIME: PropTypes.string.isRequired,
            PASSWORD: PropTypes.string.isRequired,
        })
    ).isRequired,
    onAdminEditClick: PropTypes.func.isRequired,
};

export default AdminTableRows;
