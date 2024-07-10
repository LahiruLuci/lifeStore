"use client";
import { useCallback, useState } from "react";

const CustomerSearchModal = ({ onSearch }) => {
  const [email, setEmail] = useState('');
  const [sltbbid, setSltbbid] = useState('');

  const handleSearch = useCallback((sltbbid) => {
    if (!sltbbid) {
      alert("Please enter a Broadband ID");
      return;
    }
    customerSearchView(sltbbid);
    onSearch(sltbbid);
  }, [onSearch]);

  const idSearch = async () => {
    const sltbbid = document.getElementById('SLTBBID').value;
    if (!sltbbid) {
      alert("Please enter a Broadband ID");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/routes/userSearch?SLTBBID=${sltbbid}`);
      const customerDetails = await response.json();

      if (customerDetails.error) {
        alert(customerDetails.error);
      } else if (customerDetails.length > 0) {
        setEmail(customerDetails[0].EMAIL);
      } else {
        alert("No user found");
      }
    } catch (error) {
      alert("An error occurred while searching for the user");
    }
  };

  const emailSearch = async () => {
    const email = document.getElementById('EMAIL').value;
    if (!email) {
      alert("Please enter an Email");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/routes/userSearch?EMAIL=${email}`);
      const customerDetails = await response.json();

      if (customerDetails.error) {
        alert(customerDetails.error);
      } else if (customerDetails.length > 0) {
        setSltbbid(customerDetails[0].SLTBBID);
      } else {
        alert("No user found");
      }
    } catch (error) {
      alert("An error occurred while searching for the user");
    }
  };

  return (
    <div className="modal align-content-end" tabIndex={-1} id="customerSearchModal">
      <div className="modal-dialog position-absolute top-0 end-0 p-3">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title title01">Customer Search</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label title04">Broadband ID : </label>
                <div className="input-group mb-1">
                  <input type="text" className="form-control" id="SLTBBID" value={sltbbid} onChange={(e) => setSltbbid(e.target.value)} />
                  <button className="btn btn-secondary" type="button" id="bib" onClick={idSearch}>
                    <i className="bi bi-search" />
                  </button>
                </div>
              </div>
              <div className="col-12">
                <label className="form-label title04">Email : </label>
                <div className="input-group mb-1">
                  <input type="email" className="form-control" id="EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <button
                    className="btn btn-secondary"
                    type="button"
                    id="emailb"
                    onClick={emailSearch}
                  >
                    <i className="bi bi-envelope" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>handleSearch(sltbbid)}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerSearchModal;
