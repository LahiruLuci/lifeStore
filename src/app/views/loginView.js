/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useState } from "react";
import WarningMessageModal from "../mod/WarningMessageModal";

export async function getUserProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/routes/userData`);
    const user = await res.json();
    return {
      props: {
        user: user,
      },
    };
  }

const Login = () => {
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedPassword, setSelectedPassword] = useState('');
    const [selectedUserRole, setSelectedUserRole] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const handleEnterKeyPress = (event) => {
            if (event.key === 'Enter') {
                emailSearch();
            }
        };

        document.addEventListener('keydown', handleEnterKeyPress);
        return () => {
            document.removeEventListener('keydown', handleEnterKeyPress);
        };
    });

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const result = await getUserProps();
            setUser(result.props.user);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/routes/systemUsers?SLTBBID=${user}`);
                const systemDetails = await response.json();
                if (systemDetails.error) {
                    warningMsgDescriptionHead.innerText = systemDetails.error;
                    warningMessageModal.show();
                } else if (systemDetails.length > 0) {
                    const fetchedUSERID = systemDetails[0].USERID;
                    const fetchedEmail = systemDetails[0].EMAIL;
                    const fetchedPassword = systemDetails[0].PASSWORD;
                    const fetchedUserRole = systemDetails[0].USERROLE;
                    localStorage.setItem('user_id', fetchedUSERID);
                    localStorage.setItem('userRole', fetchedUserRole);
    
                    setSelectedEmail(fetchedEmail);
                    setSelectedPassword(fetchedPassword);
                    setSelectedUserRole(fetchedUserRole);
                    LogIn(fetchedUserRole);

                } else {
                    warningMsgDescriptionHead.innerText = "No user found";
                    warningMessageModal.show();
                }
            } catch (error) {
                warningMsgDescriptionHead.innerText = "An error occurred while searching for the user";
                warningMessageModal.show();
            }
          } catch (error) {
            console.error('Error fetching user:', error);
          } 
        };
    
        fetchUser();
      }, []);

    const LogIn = (fetchedUserRole) => {
        let user_id = localStorage.getItem('user_id');
        if (fetchedUserRole == 1) {
            localStorage.setItem('customer_id', user_id);
            window.location.href = '/home';
        } else if (fetchedUserRole == 2) {
            localStorage.setItem('admin_id', user_id);
            window.location.href = '/adminHome';
        } else if (fetchedUserRole == 3) {
            localStorage.setItem('super_admin_id', user_id);
            window.location.href = '/dashboard';
        } else {
            alert("Something went wrong!");
        }
    };

    let warningMessageModal;

    const emailSearch = async () => {
        const email = document.getElementById('EMAIL2').value;
        const password = document.getElementById('PASSWORD2').value;
        let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
        let warning_message_modal = document.getElementById("warning_message_modal");
        warningMessageModal = new bootstrap.Modal(warning_message_modal);

        if (!email) {
            warningMsgDescriptionHead.innerText = "Please enter an Email";
            warningMessageModal.show();
            return;
        } else if (!password) {
            warningMsgDescriptionHead.innerText = "Please enter the Password";
            warningMessageModal.show();
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/routes/systemUsers?EMAIL=${email}`);
            const systemDetails = await response.json();
            if (systemDetails.error) {
                alert(systemDetails.error);
            } else if (systemDetails.length > 0) {
                const fetchedUSERID = systemDetails[0].USERID;
                const fetchedEmail = systemDetails[0].EMAIL;
                const fetchedPassword = systemDetails[0].PASSWORD;
                const fetchedUserRole = systemDetails[0].USERROLE;
                localStorage.setItem('user_id', fetchedUSERID);
                localStorage.setItem('userRole', fetchedUserRole);

                setSelectedEmail(fetchedEmail);
                setSelectedPassword(fetchedPassword);
                setSelectedUserRole(fetchedUserRole);
                if (fetchedEmail === email && fetchedPassword === password) {
                    LogIn(fetchedUserRole);
                } else {
                    warningMsgDescriptionHead.innerText = "No user found";
                    warningMessageModal.show();
                }
            } else {
                warningMsgDescriptionHead.innerText = "No user found";
                warningMessageModal.show();
            }
        } catch (error) {
            warningMsgDescriptionHead.innerText = "An error occurred while searching for the user";
            warningMessageModal.show();
        }
    };

    return (
        <>
            <div class="container-fluid vh-100 justify-content-center align-content-center">
                <div class="row">

                    {/* content1 */}

                    <div class="col-12">
                        <div class="row">
                            <div class="col-lg-9 d-none d-lg-block background"></div>

                            {/* User Sign In */}
                            {/* 
                            <div class=" d-none col-12 justify-content-center align-content-center" id="adminInBox">
                                <div class="row p-2 g-2">
                                    <div class="col-12 logoMain"></div>
                                    <div class="col-12">
                                        <span class="text-start title01">SLT User Sign In</span>
                                    </div>
                                    <div class="col-12">
                                        <span class="title02">Sign in to continue</span><br /><br /><br />
                                        <span class="text-danger" id="msg2"></span>
                                    </div>

                                    <div class="col-12">
                                        <input class="form-control input-s" type="text" id="username"
                                            placeholder=" User Name" />
                                        <br /><br />
                                    </div>

                                    <div class="col-12">
                                        <input class="form-control input-s" type="password" id="password"
                                            placeholder=" Password" />
                                    </div>

                                    <div class="col-12 text-end">
                                        <a href="#" class="text-decoration-none" onclick="forgotPassword();">
                                            <span class="title02">Forgot Password?</span></a><br /><br /><br /><br />
                                    </div>

                                    <div class="col-12 d-grid">
                                        <button class="btn btn1" onclick="signIn();">SIGN IN</button>
                                    </div>

                                    <div class="col-12 text-start">
                                        <span class="title02">Verion R - 1.0016 Powered by </span><a href="#"
                                            class="text-decoration-none"><span class="title03">Sri Lanka Telecom</span></a>
                                    </div>
                                </div>
                            </div> */}

                            {/* User Sign In */}

                            {/* Admin logIn */}

                            <div class="col-lg-3 col-12 justify-content-center align-content-center" id="signInBox">
                                <div class="row p-2 g-2">
                                    <div class="col-12 logoMain"></div>
                                    <div class="col-12">
                                        <span class="text-start title01">Login</span>
                                    </div>
                                    <div class="col-12">
                                        <span class="text-danger" id="msg2"></span><br />
                                    </div>

                                    <div class="col-12">
                                        <span class="text-start title04">Email</span>
                                        <input class="form-control input-s" type="text" id="EMAIL2" placeholder=" Email" />
                                        <br /><br />
                                    </div>

                                    <div class="col-12">
                                        <span class="text-start title04">Password</span>
                                        <input class="form-control input-s" type="password" id="PASSWORD2" placeholder=" Password" />
                                    </div>

                                    <div class="col-12 text-end">
                                        <a href="#" class="text-decoration-none" onclick="forgotPassword();"><span
                                            class="title02">Forgot Password?</span></a><br /><br /><br /><br />
                                    </div>

                                    <div class="col-12 d-grid">
                                        <button class="btn1" onClick={emailSearch}>LOGIN</button>
                                    </div>

                                    <div class="col-12 text-start">
                                        <span class="title02">Verion R - 1.0016 Powered by </span><a href="https://www.slt.lk/"
                                            class="text-decoration-none"><span class="title03">Sri Lanka Telecom</span></a>
                                    </div><br /><br />
                                </div>
                            </div>

                            {/* Admin login */}

                        </div>
                    </div>

                    {/* content1 */}

                    {/* model */}
                    {/* <div class="modal" tabindex="-1" id="fogotPasswordModal">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Reset Password</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">

                                    <div class="row g-3">

                                        <div class="col-6">
                                            <label class="form-label">New Password</label>
                                            <div class="input-group mb-3">
                                                <input type="password" class="form-control" id="np" />
                                                <button class="btn btn-secondary" type="button" id="npb"
                                                    onclick="showpassword1();"><i class="bi bi-eye-slash-fill"></i></button>
                                            </div>
                                        </div>

                                        <div class="col-6">
                                            <label class="form-label">Re-type Password</label>
                                            <div class="input-group mb-3">
                                                <input type="password" class="form-control" id="rnp" />
                                                <button class="btn btn-secondary" type="button" id="rnpb"
                                                    onclick="showpassword2();"><i class="bi bi-eye-slash-fill"></i></button>
                                            </div>
                                        </div>

                                        <div class="col-6">
                                            <label class="form-label">Verification Code</label>
                                            <div class="input-group mb-3">
                                                <input type="text" class="form-control" id="vc" />
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onclick="resetpassword();">Reset</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* model */}

                </div>
            </div>
            <WarningMessageModal />
        </>
    );
}
export default Login;
