import React, { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

const UpdatePasswordModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { updatePassword } = useAuth();

  useEffect(() => {
    // Listen for PASSWORD_RECOVERY event
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsOpen(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match!");
      }
      if (newPassword.length < 6) {
        throw new Error("Password must be at least 6 characters long!");
      }

      const { error } = await updatePassword(newPassword);
      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setNewPassword("");
        setConfirmPassword("");
        setShowPassword(false);
        setShowConfirmPassword(false);
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          maxWidth: "400px",
          width: "100%",
          position: "relative",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: "700",
              marginBottom: "0.5rem",
              color: "var(--text-primary)",
            }}
          >
            Update Password
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Enter your new password below
          </p>
        </div>

        {success ? (
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
            }}
          >
            <CheckCircle
              size={64}
              style={{
                color: "var(--success)",
                marginBottom: "1rem",
              }}
            />
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
              }}
            >
              Password Updated!
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Your password has been successfully updated.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "var(--text-secondary)",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                New Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={18}
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  minLength={6}
                  style={{
                    width: "100%",
                    padding: "0.75rem 3rem 0.75rem 2.75rem",
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--accent-primary)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--border-color)")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    padding: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "var(--text-secondary)",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                Confirm New Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={18}
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  minLength={6}
                  style={{
                    width: "100%",
                    padding: "0.75rem 3rem 0.75rem 2.75rem",
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--accent-primary)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--border-color)")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    padding: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div
                style={{
                  padding: "0.75rem",
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--danger)",
                  fontSize: "0.875rem",
                  marginBottom: "1rem",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.875rem",
                fontSize: "1rem",
                fontWeight: "600",
                background: "white",
                color: "black",
                border: "none",
                borderRadius: "var(--radius-md)",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.target.style.opacity = "1";
              }}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdatePasswordModal;
