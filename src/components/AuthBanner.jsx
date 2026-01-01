import React from "react";

const AuthBanner = ({ onSignUpClick }) => {
  return (
    <div
      style={{
        backgroundColor: "#0B132B",
        padding: "0.75rem 1rem",
        position: "relative",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-primary)",
            margin: 0,
            textAlign: "center",
          }}
        >
          <span style={{ fontWeight: "600" }}>
            Track your progress across devices!
          </span>{" "}
          <button
            onClick={onSignUpClick}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--accent-secondary)",
              cursor: "pointer",
              fontWeight: "600",
              textDecoration: "underline",
              fontSize: "0.875rem",
              padding: 0,
            }}
          >
            SignUp for free
          </button>{" "}
          to sync your data.
        </p>
      </div>
    </div>
  );
};

export default AuthBanner;
