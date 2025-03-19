/* eslint-disable react-hooks/exhaustive-deps */

'use client'
import { useEffect, useState } from "react";
import WarningMessageModal from "../mod/WarningMessageModal";
import { useSearchParams } from "next/navigation";
import bcrypt from 'bcryptjs';

const Login = () => {
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedPassword, setSelectedPassword] = useState('');
    const [selectedUserRole, setSelectedUserRole] = useState('');
    const [userId, setUserId] = useState('');
    const [userToken, setUserToken] = useState('');
    const [isBrowser, setIsBrowser] = useState(false);
    const searchParams = useSearchParams();
    let warningMessageModal;
    let emailSearchExecuted = false;

    useEffect(() => {
        setIsBrowser(typeof window != undefined);
        if (isBrowser) {
            const handleEnterKeyPress = (event) => {
                if (event.key === 'Enter' && !emailSearchExecuted) {
                    emailSearchExecuted = true;
                    emailSearch();
                }
            };

            document.addEventListener('keydown', handleEnterKeyPress);
            return () => {
                document.removeEventListener('keydown', handleEnterKeyPress);
            };
        }
    }, [isBrowser]);

    useEffect(() => {
        setIsBrowser(typeof window != undefined);

        if (isBrowser) {

            const fetchUser = async () => {
                const loginMainView = document.getElementById("loginMainView");
                if (!localStorage.getItem("user_id") && !localStorage.getItem("userRole")) {
                    try {
                        if (searchParams.get('jwt')) {
                            let warning_message_modal = document.getElementById("warning_message_modal");
                            const jwt = searchParams.get('jwt');
                            // const jwt = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..wZq1eW1Y9w1QRtOrT5TC3g.kjuzfCMIHullPwr0PjaU70DQHH6NEIXiSidLrtHATa0GhCPV3Yyo2V6OcuKxBIy8by0m2cf9EQ1dfwMzwQOdNtFVhb1RvQvhKsrrP19c5I0wUehEf_UGxV-e-Q6oe9cDA9eUGZHWnCd4GBw_nTGnV5RCywTAEgUM1jSZ3co7_v_wDlkMwLOHqUffF-6qITPT.Ug6rvLgE7VuOMnvvojwatA";
                            // alert(jwt);
                            const postData = await fetch(`${process.env.NEXT_PRIVATE_URL1}${jwt}`, {
                                method: "GET",
                                headers: {
                                    "Content-type": "application/json",
                                    "Access-Control-Allow-Origin": "*"
                                },
                            });
                            const result = await postData.json();
                            if (result.success) {
                                const resultProps = result.response;
                                if (resultProps.role == "customer" && !resultProps.subscriberId == null || resultProps.role == "customer" && !resultProps.subscriberId == "") {
                                    // alert(resultProps.subscriberId + " "+ resultProps.role + " "+ resultProps.jwt);

                                    try {
                                        warningMessageModal = new bootstrap.Modal(warning_message_modal);
                                        const response = await fetch(`${process.env.NEXT_PUBLIC_URL5}${resultProps.subscriberId}`);
                                        const systemDetails = await response.json();

                                        if (systemDetails.error) {
                                            warningMsgDescriptionHead.innerText = systemDetails.error;
                                            warningMessageModal.show();
                                        } else if (systemDetails.length > 0) {
                                            if (systemDetails[0].USERID) {
                                                const fetchedUSERID = systemDetails[0].USERID;
                                                const fetchedUserRole = systemDetails[0].USERROLE;
                                                const startTime = new Date();
                                                const updatedNow = new Date(startTime.getTime() + 60 * 60 * 1000);
                                                localStorage.setItem('SignOutTime', updatedNow.toISOString());
                                                localStorage.setItem('user_id', fetchedUSERID);
                                                localStorage.setItem('userRole', fetchedUserRole);
                                                localStorage.setItem("customerToken", resultProps.jwt);
                                                setUserId(resultProps.subscriberId);
                                                setUserToken(resultProps.jwt);
                                                if (systemDetails[0].EMAIL) {
                                                    const fetchedEmail = systemDetails[0].EMAIL;
                                                    localStorage.setItem('user_email', fetchedEmail);
                                                    setSelectedEmail(fetchedEmail);
                                                }

                                                setSelectedUserRole(fetchedUserRole);
                                                LogIn(fetchedUserRole);
                                            } else {
                                                warningMsgDescriptionHead.innerText = "No user found";
                                                warning_message_modal.addEventListener('hidden.bs.modal', () => {
                                                    window.location.href = '/logOutView';
                                                });
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
                                } else {
                                    warningMsgDescriptionHead.innerText = "No user found";
                                    warningMessageModal.show();
                                }
                            } else {
                                warningMsgDescriptionHead.innerText = "Token expired or Invalid token. Please go back to MySlt App and try again!";
                                warning_message_modal.addEventListener('hidden.bs.modal', () => {
                                    loginMainView.classList.remove("d-none");
                                });
                                warningMessageModal.show();
                            }
                        } else {
                            loginMainView.classList.remove("d-none");
                        }
                    } catch (error) {
                        console.error('Error fetching:', error);
                    }
                } else {
                    if (localStorage.getItem('customer_id') && localStorage.getItem("userRole") == 1) {
                        window.location.href = '/customerProductList';
                    } else if (localStorage.getItem('admin_id') && localStorage.getItem("userRole") == 2) {
                        window.location.href = '/adminHome';
                    } else if (localStorage.getItem('super_admin_id') && localStorage.getItem("userRole") == 3) {
                        window.location.href = '/dashboard';
                    } else if (localStorage.getItem('admin_id') && localStorage.getItem("userRole") == 4) {
                        window.location.href = '/adminProductPortfolio';
                    }else {
                        if (localStorage.getItem("userRole") == 1) {
                            loginMainView.classList.add("d-none");
                        } else if (localStorage.getItem("userRole") == 2 || localStorage.getItem("userRole") == 3 || localStorage.getItem("userRole") == 4) {
                            loginMainView.classList.remove("d-none");
                        }
                    }
                }

            };

            fetchUser();
        }
    }, [isBrowser]);

    const LogIn = (fetchedUserRole) => {
        let user_id = localStorage.getItem('user_id');
        if (fetchedUserRole == 1) {
            localStorage.setItem('customer_id', user_id);
            window.location.href = '/customerProductList';
        } else if (fetchedUserRole == 2) {
            localStorage.setItem('admin_id', user_id);
            window.location.href = '/adminHome';
        } else if (fetchedUserRole == 3) {
            localStorage.setItem('super_admin_id', user_id);
            window.location.href = '/dashboard';
        }else if (fetchedUserRole == 4) {
            localStorage.setItem('admin_id', user_id);
            window.location.href = '/adminHome';
        } else {
            window.location.href = '/logOutView';
        }
    };


    const emailSearch = async () => {
        const email = document.getElementById('EMAIL2').value;
        const password = document.getElementById('PASSWORD2').value;
        let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
        let warning_message_modal = document.getElementById("warning_message_modal");
        warningMessageModal = new bootstrap.Modal(warning_message_modal);

        if (!email) {
            warning_message_modal.addEventListener('hidden.bs.modal', () => {
                emailSearchExecuted = false;
            });
            warningMsgDescriptionHead.innerText = "Please enter an Email";
            warningMessageModal.show();
            return;
        } else if (!password) {
            warning_message_modal.addEventListener('hidden.bs.modal', () => {
                emailSearchExecuted = false;
            });
            warningMsgDescriptionHead.innerText = "Please enter the Password";
            warningMessageModal.show();
            return;
        } else {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL6}${email}`);
                const systemDetails = await response.json();
                if (systemDetails.error) {
                    console.log(systemDetails.error);
                    alert(systemDetails.error);

                } else if (systemDetails.length > 0) {
                    const fetchedUSERID = systemDetails[0].USERID;
                    const fetchedEmail = systemDetails[0].EMAIL;
                    const fetchedPassword = systemDetails[0].PASSWORD;
                    const fetchedUserRole = systemDetails[0].USERROLE;
                    const startTime = new Date();
                    const updatedNow = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);
                    // const hashedPassword = bcrypt.hashSync(password, 10);
                    // alert(hashedPassword);

                    const isMatch = await bcrypt.compare(password, fetchedPassword);
                    if (fetchedEmail === email && isMatch) {
                        if (!isMatch) {
                            warningMsgDescriptionHead.innerText = "Password doesn't match!";
                            warningMessageModal.show();
                        } else {
                            localStorage.setItem('SignOutTime', updatedNow.toISOString());
                            localStorage.setItem('user_id', fetchedUSERID);
                            localStorage.setItem('userRole', fetchedUserRole);

                            setSelectedEmail(fetchedEmail);
                            setSelectedPassword(fetchedPassword);
                            setSelectedUserRole(fetchedUserRole);
                            LogIn(fetchedUserRole);
                        }
                    } else {
                        warningMsgDescriptionHead.innerText = "Please enter correct details.";
                        warningMessageModal.show();
                    }
                } else {
                    warningMsgDescriptionHead.innerText = "No user found";
                    warningMessageModal.show();
                }
            } catch (error) {
                warningMsgDescriptionHead.innerText = `An error occurred while searching for the user: ${error.message}`;
                warningMessageModal.show();
            }
        }
    };

    return (
        <>
            <div className="d-none container-fluid vh-100 justify-content-center align-content-center" id="loginMainView">
                <div className="row">

                    {/* content1 */}

                    <div className="col-12">
                        <div className="row">
                            <div className="col-lg-9 d-none d-lg-block background"></div>

                            <div className="col-lg-3 col-12 justify-content-center align-content-center" id="signInBox">
                                <div className="row p-2 g-2">
                                    <div className="col-12 logoMain"></div>
                                    <div className="col-12">
                                        <span className="text-start title01">Login</span>
                                    </div>
                                    <div className="col-12">
                                        <span className="text-danger" id="msg2"></span><br />
                                    </div>

                                    <div className="col-12">
                                        <span className="text-start title04">Email</span>
                                        <input className="form-control input-s" type="text" id="EMAIL2" placeholder=" Email" />
                                        <br /><br />
                                    </div>

                                    <div className="col-12">
                                        <span className="text-start title04">Password</span>
                                        <input className="form-control input-s" type="password" id="PASSWORD2" placeholder=" Password" />
                                    </div>

                                    <div className="col-12 d-grid">
                                        <button className="btn1" onClick={emailSearch}>LOGIN</button>
                                    </div>

                                    <div className="col-12 text-start">
                                        <span className="title02">Version R - 2.0.0 Powered by </span><a href="https://www.slt.lk/"
                                            className="text-decoration-none"><span className="title03">Sri Lanka Telecom</span></a>
                                    </div><br /><br />
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
            <WarningMessageModal />
        </>
    );
}
export default Login;
