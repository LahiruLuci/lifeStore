"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  background:
    "linear-gradient(135deg, #1D1D1B 0%, #00A88E 40%, #29CCB1 100%)",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const cardStyle = {
  width: "100%",
  maxWidth: "420px",
  backgroundColor: "rgba(255,255,255,0.97)",
  borderRadius: "24px",
  padding: "28px 24px",
  boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
  border: "1px solid rgba(41,204,177,0.4)",
};

const titleStyle = {
  fontSize: "22px",
  fontWeight: 700,
  color: "#1D1D1B",
  margin: "8px 0 4px",
  textAlign: "center",
};

const subtitleStyle = {
  fontSize: "13px",
  color: "#6b7280",
  textAlign: "center",
  marginBottom: "20px",
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: 500,
  color: "#1D1D1B",
  marginBottom: "4px",
};

const inputStyle = {
  width: "100%",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  padding: "9px 11px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
  backgroundColor: "#F9FAFB",
  color: "#111827",
};

const inputFocusStyle = {
  ...inputStyle,
  border: "1px solid #29CCB1",
  boxShadow: "0 0 0 2px rgba(41,204,177,0.25)",
  backgroundColor: "#FFFFFF",
};

const buttonStyle = {
  width: "100%",
  border: "none",
  borderRadius: "10px",
  padding: "10px 12px",
  backgroundColor: "#29CCB1",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(41,204,177,0.35)",
};

const buttonHoverStyle = {
  ...buttonStyle,
  backgroundColor: "#00A88E",
};

const errorStyle = {
  fontSize: "12px",
  color: "#b91c1c",
  backgroundColor: "#fee2e2",
  border: "1px solid #fecaca",
  borderRadius: "10px",
  padding: "8px 10px",
  marginTop: "6px",
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [focusField, setFocusField] = useState(null);
  const [hover, setHover] = useState(false);

  // If already logged in, redirect
  useEffect(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin_auth="));
      if (match && match.split("=")[1] === "1") {
        router.replace("/admin-panel");
      }
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (username === "admin" && password === "admin") {
      document.cookie = "admin_auth=1; path=/; max-age=86400";
      router.push("/admin-panel");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "54px",
              height: "54px",
              borderRadius: "18px",
              backgroundColor: "rgba(41,204,177,0.12)",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "26px",
                fontWeight: 700,
                color: "#29CCB1",
              }}
            >
              K
            </span>
          </div>
          <h1 style={titleStyle}>Kaspersky LifeStore Admin</h1>
          <p style={subtitleStyle}>Authorized access only. Please sign in.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: "14px" }}>
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setFocusField("username")}
              onBlur={() => setFocusField(null)}
              style={
                focusField === "username" ? inputFocusStyle : inputStyle
              }
              placeholder="Enter admin username"
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "6px" }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusField("password")}
              onBlur={() => setFocusField(null)}
              style={
                focusField === "password" ? inputFocusStyle : inputStyle
              }
              placeholder="Enter admin password"
            />
          </div>

          {error && <div style={errorStyle}>{error}</div>}

          <button
            type="submit"
            style={hover ? buttonHoverStyle : buttonStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Sign In
          </button>
        </form>

        <p
          style={{
            marginTop: "16px",
            fontSize: "11px",
            textAlign: "center",
            color: "#9ca3af",
          }}
        >
          &copy; {new Date().getFullYear()} Kaspersky LifeStore. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
