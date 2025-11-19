"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PRODUCT_NAME_BY_CODE, getProductName } from "../lib/productNames";

const MONTHS = [
  { value: "", label: "All Months" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

function buildQuery(filters) {
  const params = new URLSearchParams();
  if (filters.year) params.set("year", filters.year);
  if (filters.month) params.set("month", filters.month);
  if (filters.product) params.set("product", filters.product);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export default function AdminDashboard() {
  const router = useRouter();

  const [subscriptions, setSubscriptions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState({
    month: "",
    year: "",
    product: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    document.cookie = "admin_auth=; path=/; max-age=0";
    router.push("/admin-panel/login");
  };

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const arr = [];
    for (let y = currentYear - 3; y <= currentYear + 1; y++) {
      arr.push(String(y));
    }
    return arr;
  }, []);

  const fetchData = async (activeFilters) => {
    try {
      setLoading(true);
      setError("");
      const qs = buildQuery(activeFilters);
      const res = await fetch(`/api/admin/subscriptions${qs}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to load subscriptions");
      const data = await res.json();
      setSubscriptions(data.subscriptions || []);
      setTotalCount(data.totalCount ?? 0);
    } catch (err) {
      console.error(err);
      setError("Error loading subscription data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filters);
    const interval = setInterval(() => {
      fetchData(filters);
    }, 30000); // Sync time of the database subscription table with admin dashboard (Currently set once in 30 seconds)
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ month: "", year: "", product: "" });
  };

  const handleDownload = () => {
    const qs = buildQuery(filters);
    window.open(`/api/admin/subscriptions/csv${qs}`, "_blank");
  };

  // Styles
  const pageStyle = {
    minHeight: "100vh",
    padding: "20px 12px",
    background:
      "linear-gradient(135deg, #1D1D1B 0%, #1D1D1B 40%, #00A88E 100%)",
    color: "#FFFFFF",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    boxSizing: "border-box",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const headerRowStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "16px",
    alignItems: "center",
  };

  const h1Style = {
    fontSize: "22px",
    fontWeight: 700,
    margin: 0,
  };

  const smallTextStyle = {
    fontSize: "13px",
    color: "#d1d5db",
    marginTop: "4px",
  };

  const primaryButtonStyle = {
    border: "none",
    borderRadius: "10px",
    padding: "8px 14px",
    backgroundColor: "#29CCB1",
    color: "#FFFFFF",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(41,204,177,0.4)",
  };

  const cardRowStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "16px",
  };

  const statCardStyle = {
    flex: "1 1 220px",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: "18px",
    padding: "12px 14px",
    border: "1px solid rgba(41,204,177,0.35)",
    boxSizing: "border-box",
  };

  const cardTitleStyle = {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#d1d5db",
  };

  const cardNumberStyle = {
    fontSize: "26px",
    fontWeight: 800,
    color: "#29CCB1",
    marginTop: "4px",
  };

  const innerCardStyle = {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: "18px",
    padding: "14px 16px",
    boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
    border: "1px solid rgba(41,204,177,0.25)",
    color: "#1D1D1B",
  };

  const filterRowStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "10px",
    alignItems: "flex-end",
    marginBottom: "12px",
  };

  const filterGroupStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    flex: "1 1 auto",
  };

  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
    minWidth: "150px",
  };

  const labelStyle = {
    fontSize: "11px",
    fontWeight: 500,
    color: "#4b5563",
    marginBottom: "3px",
  };

  const selectStyle = {
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    padding: "7px 10px",
    fontSize: "13px",
    outline: "none",
    boxSizing: "border-box",
  };

  const secondaryButtonStyle = {
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    padding: "7px 12px",
    backgroundColor: "#FFFFFF",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    color: "#374151",
  };

  const logoutButtonStyle = {
    ...secondaryButtonStyle,
    border: "1px solid #1D1D1B",
    color: "#1D1D1B",
  };

  const tableWrapperStyle = {
    maxHeight: "60vh",
    overflowY: "auto",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "12px",
  };

  const thStyle = {
    backgroundColor: "#1D1D1B",
    color: "#FFFFFF",
    padding: "8px 10px",
    textAlign: "left",
    position: "sticky",
    top: 0,
    zIndex: 1,
  };

  const tdStyle = {
    padding: "6px 10px",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#FFFFFF",
    whiteSpace: "nowrap",
  };

  const tdAltStyle = {
    ...tdStyle,
    backgroundColor: "#f9fafb",
  };

  const errorBoxStyle = {
    marginBottom: "8px",
    padding: "8px 10px",
    borderRadius: "10px",
    border: "1px solid #fecaca",
    backgroundColor: "#fee2e2",
    fontSize: "12px",
    color: "#b91c1c",
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        {/* Header */}
        <div style={headerRowStyle}>
          <div>
            <h1 style={h1Style}>Kaspersky LifeStore – Admin Panel</h1>
            <p style={smallTextStyle}>
              Monitor valid annual subscriptions in real time.
            </p>
          </div>
          {/* Buttons on the right */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              style={primaryButtonStyle}
              onClick={handleDownload}
            >
              Download Report (CSV)
            </button>
            <button
              type="button"
              style={logoutButtonStyle}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={cardRowStyle}>
          <div style={statCardStyle}>
            <div style={cardTitleStyle}>Total Valid Subscriptions</div>
            <div style={cardNumberStyle}>
              {loading ? "…" : totalCount}
            </div>
            <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>
              PAYHERESTATUSCODE = 2 and License Key available.
            </div>
          </div>

          <div style={statCardStyle}>
            <div style={cardTitleStyle}>Filters Active</div>
            <div style={{ marginTop: "4px", fontSize: "13px" }}>
              {filters.year || filters.month || filters.product
                ? "Filtered view"
                : "Showing all valid subscriptions"}
            </div>
          </div>

          <div style={{ ...statCardStyle, display: "none" /* optional */ }}>
            {/* You can show product codes here if you like */}
          </div>
        </div>

        {/* Main Card: Filters + Table */}
        <div style={innerCardStyle}>
          {/* Filters */}
          <div style={filterRowStyle}>
            <div style={filterGroupStyle}>
              {/* Year */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Year</label>
                <select
                  value={filters.year}
                  onChange={(e) => handleFilterChange("year", e.target.value)}
                  style={selectStyle}
                >
                  <option value="">All Years</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              {/* Month */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Month</label>
                <select
                  value={filters.month}
                  onChange={(e) => handleFilterChange("month", e.target.value)}
                  style={selectStyle}
                >
                  {MONTHS.map((m) => (
                    <option key={m.value || "all"} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Product Type</label>
                <select
                  value={filters.product}
                  onChange={(e) => handleFilterChange("product", e.target.value)}
                  style={selectStyle}
                >
                  <option value="">All Products</option>
                  {Object.entries(PRODUCT_NAME_BY_CODE).map(
                    ([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
              <button
                type="button"
                style={secondaryButtonStyle}
                onClick={handleClearFilters}
              >
                Clear
              </button>
              <button
                type="button"
                style={primaryButtonStyle}
                onClick={handleDownload}
              >
                Download Report
              </button>
            </div>
          </div>

          {/* Error */}
          {error && <div style={errorBoxStyle}>{error}</div>}

          {/* Table */}
          <div style={tableWrapperStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ORDERID</th>
                  <th style={thStyle}>PAYMENTID</th>
                  <th style={thStyle}>PRODUCT</th>
                  <th style={thStyle}>PAYHERESTATUSCODE</th>
                  <th style={thStyle}>LICENSEKEY</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>AMOUNT</th>
                  <th style={thStyle}>NAME</th>
                  <th style={thStyle}>CONTACTNUMBER</th>
                  <th style={thStyle}>EMAIL</th>
                  <th style={thStyle}>CREATEDDATETIME</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={10} style={{ ...tdStyle, textAlign: "center" }}>
                      Loading subscription data…
                    </td>
                  </tr>
                ) : subscriptions.length === 0 ? (
                  <tr>
                    <td colSpan={10} style={{ ...tdStyle, textAlign: "center" }}>
                      No subscriptions found for the selected filters.
                    </td>
                  </tr>
                ) : (
                  subscriptions.map((sub, index) => {
                    const created = sub.CREATEDDATETIME
                      ? new Date(sub.CREATEDDATETIME)
                      : null;
                    const rowTdStyle =
                      index % 2 === 0 ? tdStyle : tdAltStyle;
                    return (
                      <tr key={sub.ORDERID}>
                        <td style={rowTdStyle}>{sub.ORDERID}</td>
                        <td style={rowTdStyle}>{sub.PAYMENTID}</td>
                        <td style={rowTdStyle}>
                          <div>
                            <div
                              style={{
                                fontWeight: 600,
                                color: "#00A88E",
                                fontSize: "12px",
                              }}
                            >
                              {getProductName(sub.PRODUCT)}
                            </div>
                            <div
                              style={{ fontSize: "10px", color: "#6b7280" }}
                            >
                              Code: {sub.PRODUCT}
                            </div>
                          </div>
                        </td>
                        <td style={rowTdStyle}>{sub.PAYHERESTATUSCODE}</td>
                        <td
                          style={{
                            ...rowTdStyle,
                            fontFamily: "monospace",
                            fontSize: "11px",
                          }}
                        >
                          {sub.LICENSEKEY}
                        </td>
                        <td
                          style={{ ...rowTdStyle, textAlign: "right" }}
                        >
                          {Number(sub.AMOUNT).toLocaleString("en-LK", {
                            style: "currency",
                            currency: "LKR",
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td style={rowTdStyle}>{sub.NAME}</td>
                        <td style={rowTdStyle}>{sub.CONTACTNUMBER}</td>
                        <td style={rowTdStyle}>{sub.EMAIL}</td>
                        <td style={rowTdStyle}>
                          {created
                            ? created.toLocaleString("en-LK", {
                                timeZone: "Asia/Colombo",
                              })
                            : ""}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
