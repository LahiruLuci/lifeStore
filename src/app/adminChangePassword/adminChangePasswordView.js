/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import SuccessMessageModal from "../mod/SuccessMessageModal";
import WarningMessageModal from "../mod/WarningMessageModal";
import bcrypt from 'bcryptjs';


const AdminPasswordChangeView = () => {

  const [adminSLTBBID, setAdminSLTBBID] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  let successMessageModal;
  let warningMessageModal;

  //update admin password
  const updatePassword = async () => {
    let success_message_modal = document.getElementById("success_message_modal");
    let successMsgDescriptionHead = document.getElementById("successMsgDescriptionHead");
    let warning_message_modal = document.getElementById("warning_message_modal");
    let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
    const admin_id = localStorage.getItem("admin_id");

    if (!currentPassword) {
      warningMessageModal = new bootstrap.Modal(warning_message_modal);
      warningMsgDescriptionHead.innerText = "Please current password!";
      warningMessageModal.show();
    } else if (!newPassword) {
      warningMessageModal = new bootstrap.Modal(warning_message_modal);
      warningMsgDescriptionHead.innerText = "Please new password!";
      warningMessageModal.show();
    } else if (!newPassword2) {
      warningMessageModal = new bootstrap.Modal(warning_message_modal);
      warningMsgDescriptionHead.innerText = "Please confirm your new password!";
      warningMessageModal.show();
    } else if (newPassword != newPassword2) {
      warningMessageModal = new bootstrap.Modal(warning_message_modal);
      warningMsgDescriptionHead.innerText = "Please enter the same new password!";
      warningMessageModal.show();
    } else {

      try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_URL22}${admin_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const systemDetails = await response.json();
        if (systemDetails.error) {
          warningMessageModal = new bootstrap.Modal(warning_message_modal);
          warningMsgDescriptionHead.innerText = "Unknown Current Password!";
          warningMessageModal.show();
        } else if (systemDetails.length > 0) {
          const fetchedPassword = systemDetails[0].PASSWORD;

          const isMatch = await bcrypt.compare(currentPassword, fetchedPassword);
          if (isMatch) {
            if (newPassword == newPassword2) {
              const password = bcrypt.hashSync(newPassword, 10);

              try {

                const payload = {
                  adminId: admin_id,
                  password: password,
                };

                const response = await fetch(`${process.env.NEXT_PUBLIC_URL23}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(payload),
                });

                const result = await response.json();
                if (result.message === 'Admin Password updated successfully!') {
                  successMessageModal = new bootstrap.Modal(success_message_modal);
                  successMsgDescriptionHead.innerText = "Admin Password updated successfully!";
                  success_message_modal.addEventListener('hidden.bs.modal', () => {
                    window.location.href = '/adminChangePassword';
                  });
                  successMessageModal.show();
                }
              } catch (error) {
                console.error('Error updating admin:', error);
              }

            } else {
              warningMessageModal = new bootstrap.Modal(warning_message_modal);
              warningMsgDescriptionHead.innerText = "Enter same new password!";
              warningMessageModal.show();
            }

          } else {
            warningMessageModal = new bootstrap.Modal(warning_message_modal);
            warningMsgDescriptionHead.innerText = "Old Password doesn't match!";
            warningMessageModal.show();
          }
        } else {
          warningMessageModal = new bootstrap.Modal(warning_message_modal);
          warningMsgDescriptionHead.innerText = "Old Password doesn't match!";
          warningMessageModal.show();
        }

      } catch (error) {
        console.error('Error updating cutomer email:', error);
      }

    }

  };

  return (
    <>
      <div className="col-12 mt-3 p-3">
        <span className="title06">ADMIN CHANGE PASSWORD</span>
      </div>

      <div className="container-fluid align-content-center justify-content-between">
        <div className="col-12">
          <div className="text-black row p-1 m-5 mt-0">
            <div className="col-12">
              <div className="row p-1 pt-0">
                <div className="col-12">
                  <div className="row">
                    <span className="title13 col-12 col-lg-3">Current Password </span>
                    <div className="mb-1 col-12 col-lg-9">
                      <input type="password" className="form-control" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <span className="title13 col-12 col-lg-3">New Password </span>
                    <div className="mb-1 col-12 col-lg-9">
                      <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <span className="title13 col-12 col-lg-3">Confirm New Password </span>
                    <div className="mb-1 col-12 col-lg-9">
                      <input type="password" className="form-control" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row mt-3 justify-content-end">
                    <button className="btn44 text-white col-12 col-lg-2" onClick={updatePassword}>
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessMessageModal />
      <WarningMessageModal />
    </>
  );
}

export default AdminPasswordChangeView;