"use client"
import React from "react";
import { useEffect, useState } from "react";
import AuditTraceAllTable from "./auditTraceAllTable";
import AuditTraceSubscribedTable from "./auditTraceSubscribedTable";
import AuditTraceUnsubscribedTable from "./auditTraceUnsubscribedTable";
import { DateRangePicker } from "@nextui-org/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { getAllUsersProps } from './auditTraceAllTable';
import { getSubscribedUsersProps } from './auditTraceSubscribedTable';
import { getUnsubscribedUsersProps } from './auditTraceUnsubscribedTable';
import SuccessMessageModal from "../mod/SuccessMessageModal";
import WarningMessageModal from "../mod/WarningMessageModal";

export default function AuditTraceView() {

    const [allUsers, setAllUsers] = useState([]);
    const [subscribedUsers, setSubscribedUsers] = useState([]);
    const [unsubscribedUsers, setUnsubscribedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAllUser, setSelectedAllUser] = useState(null);
    const [selectedSubscribedUser, setSelectedSubscribedUser] = useState(null);
    const [selectedUnsubscribedUser, setSelectedUnsubscribedUser] = useState(null);
    const [isEntireDatabaseChecked, setIsEntireDatabaseChecked] = useState(false);
    function formatDateToString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    const end = new Date();
    const start = new Date(end.getTime() - 1 * 24 * 60 * 60 * 1000); 
    
    const formattedStart = formatDateToString(start);
    const formattedEnd = formatDateToString(end);
    
    const parsedStart = parseDate(formattedStart);
    const parsedEnd = parseDate(formattedEnd);
    
    const [value, setValue] = React.useState({
        start: parsedStart,
        end: parsedEnd,
    });

    let formatter = useDateFormatter({ dateStyle: "long" });

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const result = await getAllUsersProps();
                setAllUsers(result.props.allUsers);
            } catch (error) {
                console.error('Error fetching allUsers:', error);
            } finally {
                setLoading(false);
            }
        };
        const fetchSubscribedUsers = async () => {
            try {
                const result = await getSubscribedUsersProps();
                setSubscribedUsers(result.props.subscribedUsers);
            } catch (error) {
                console.error('Error fetching subscribedUsers:', error);
            } finally {
                setLoading(false);
            }
        };
        const fetchUnsubscribedUsers = async () => {
            try {
                const result = await getUnsubscribedUsersProps();
                setUnsubscribedUsers(result.props.unsubscribedUsers);
            } catch (error) {
                console.error('Error fetching unsubscribedUsers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllUsers();
        fetchSubscribedUsers();
        fetchUnsubscribedUsers();

    }, []);

    const filterByDateRange = (users) => {
        const startDate = value.start.toDate(getLocalTimeZone());
        const endDate = value.end.toDate(getLocalTimeZone());

        return users.filter(user => {
            const createdDate = new Date((user.CREATEDDATETIME).toString().split('T')[0]);
            return createdDate >= startDate && createdDate <= endDate;
        });
    };

    const filteredAllUsers = isEntireDatabaseChecked ? allUsers : filterByDateRange(allUsers);
    const filteredSubscribedUsers = isEntireDatabaseChecked ? subscribedUsers : filterByDateRange(subscribedUsers);
    const filteredUnsubscribedUsers = isEntireDatabaseChecked ? unsubscribedUsers : filterByDateRange(unsubscribedUsers);

    let successMessageModal;
    let warningMessageModal;

    const auditTracePath = () => {
        const subscribed = document.getElementById("subscribed");
        const unsubscribed = document.getElementById("unsubscribed");
        const all = document.getElementById("all");
        const auditTracePanel = document.getElementById("auditTracePanel");
        const auditTraceSubscribedTable = document.getElementById("auditTraceSubscribedTable");
        const auditTraceUnsubscribedTable = document.getElementById("auditTraceUnsubscribedTable");
        const auditTraceAllTable = document.getElementById("auditTraceAllTable");
        const auditTraceDataTracker = document.getElementById("auditTraceDataTracker");
        let warningMsgDescriptionHead = document.getElementById("warningMsgDescriptionHead");
        let success_message_modal = document.getElementById("success_message_modal");
        let warning_message_modal = document.getElementById("warning_message_modal");
        warningMessageModal = new bootstrap.Modal(warning_message_modal);
        successMessageModal = new bootstrap.Modal(success_message_modal);

        if (auditTraceDataTracker.innerHTML == "No details in selected date range") {
            warningMsgDescriptionHead.innerText = "Please enter available date range";
            warningMessageModal.show();
        } else {
            if (subscribed.classList.contains("btnActive1")) {
                auditTraceSubscribedTable.classList.remove("d-none");
                auditTracePanel.classList.add("d-none");
                auditTraceUnsubscribedTable.classList.add("d-none");
                auditTraceAllTable.classList.add("d-none");
            } else if (unsubscribed.classList.contains("btnActive1")) {
                auditTraceSubscribedTable.classList.add("d-none");
                auditTracePanel.classList.add("d-none");
                auditTraceUnsubscribedTable.classList.remove("d-none");
                auditTraceAllTable.classList.add("d-none");
            } else if (all.classList.contains("btnActive1")) {
                auditTraceSubscribedTable.classList.add("d-none");
                auditTracePanel.classList.add("d-none");
                auditTraceUnsubscribedTable.classList.add("d-none");
                auditTraceAllTable.classList.remove("d-none");
            } else {
                warningMsgDescriptionHead.innerText = "Please select any AuditTrace Category";
                warningMessageModal.show();
            }
        }
    }

    const selectedType = (x) => {

        const subscribed = document.getElementById("subscribed");
        const unsubscribed = document.getElementById("unsubscribed");
        const all = document.getElementById("all");

        if (x == 1) {
            subscribed.classList.add("btnActive1");
            unsubscribed.classList.remove("btnActive1");
            all.classList.remove("btnActive1");
        } else if (x == 2) {
            subscribed.classList.remove("btnActive1");
            unsubscribed.classList.add("btnActive1");
            all.classList.remove("btnActive1");
        } else if (x == 3) {
            subscribed.classList.remove("btnActive1");
            unsubscribed.classList.remove("btnActive1");
            all.classList.add("btnActive1");
        }
    }

    const handleCheckboxChange = () => {
        setIsEntireDatabaseChecked(!isEntireDatabaseChecked);
    };

    return (
        <>
            <div id="auditTracePanel">
                <div className="col-12 mt-3 mb-3 p-3 text-center">
                    <span className="title06">AUDIT TRACE</span>
                </div>

                <div className="col-12 auditViewBox">
                    <div className="container align-items-center justify-content-center">
                        <div className="col-12 p-3">
                            <div className="row">
                                <div className="col-12 mt-3 mb-3 p-3 text-center">
                                    <span className="title062">Select Customer Type</span>
                                </div>
                                <div className="col-12 mb-3 text-center">
                                    <span className="title063">Select the appropriate customer type from the drop down menu based on
                                        their purchase history</span>
                                </div>
                                <div className="col-12 mb-3">
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-lg-3 mt-3 mb-3 shadow col-md-3 col-12 m-3">
                                            <div className="btn10 rounded" id="subscribed" onClick={() => selectedType(1)}>Subscribed</div>
                                        </div>
                                        <div className="col-lg-3 mt-3 mb-3 shadow col-md-3 col-12 m-3">
                                            <div className="btn10 rounded" id="unsubscribed" onClick={() => selectedType(2)}>Unsubscribed</div>
                                        </div>
                                        <div className="col-lg-3 mt-3 mb-3 shadow col-md-3 col-12 m-3">
                                            <div className="btn10 rounded" id="all" onClick={() => selectedType(3)}>All</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content col-10 offset-1 mb-3 mt-0">
                                    <div className="container text-left">
                                        <div className="row justify-content-center align-items-center">
                                            <div className="col-lg-7">
                                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                    <DateRangePicker
                                                        label="Stay duration"
                                                        visibleMonths={2}
                                                        value={value}
                                                        onChange={setValue}
                                                        isDisabled={isEntireDatabaseChecked}
                                                    />
                                                </div><br />
                                                <p className="text-default-500 text-sm text-black text-center">
                                                    Date range :{" "}
                                                    <span className="title064">
                                                        {value
                                                            ? formatter.formatRange(
                                                                value.start.toDate(getLocalTimeZone()),
                                                                value.end.toDate(getLocalTimeZone()),
                                                            )
                                                            : "--"}
                                                    </span>

                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-12 mb-3 text-center justify-content-center align-items-center" id="fullDatabase">
                                    <span className="title064">Entire Database</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input className="form-check-input bg-success text-success" type="checkbox" id="checkboxNoLabel" value=""
                                        aria-label="#fullDatabase" checked={isEntireDatabaseChecked} onChange={handleCheckboxChange} />
                                </div>
                                <div className="col-12 mb-5">
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-lg-3 mt-3 mb-3 shadow col-md-3 col-12 m-3">
                                            <div className="btn11 rounded" onClick={auditTracePath}>Done</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <p className="text-center text-danger text-large" id="auditTraceDataTracker"></p>
            <AuditTraceAllTable allUsers={filteredAllUsers} />
            <AuditTraceSubscribedTable subscribedUsers={filteredSubscribedUsers} />
            <AuditTraceUnsubscribedTable unsubscribedUsers={filteredUnsubscribedUsers} />
            <SuccessMessageModal />
            <WarningMessageModal />
        </>
    );
}
