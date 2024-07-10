'use client'
import AuditTraceView from "./auditTraceView";
import withAuth from "../utils/withAuth";

const auditTrace = () => { 

  return (

    <AuditTraceView/>

  );

}

export default withAuth(auditTrace,[3]);
