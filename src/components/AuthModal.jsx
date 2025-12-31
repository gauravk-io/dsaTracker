import React, { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { signIn, signUp, resetPassword } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (isForgotPassword) {
        const { error } = await resetPassword(email);
        if (error) throw error;
        setMessage("Check your email for the password reset link!");
        setTimeout(() => {
          setIsForgotPassword(false);
          setEmail("");
        }, 3000);
      } else if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        onClose();
      } else {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match!");
        }
        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters long!");
        }
        const { error } = await signUp(email, password);
        if (error) throw error;
        setMessage("Check your email for the confirmation link!");
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
      onClick={onClose}
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
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            padding: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "var(--radius-sm)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "var(--bg-tertiary)";
            e.target.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "var(--text-muted)";
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: "700",
              marginBottom: "0.5rem",
              color: "var(--text-primary)",
            }}
          >
            {isForgotPassword
              ? "Reset Password"
              : isLogin
              ? "Welcome Back"
              : "Create Account"}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            {isForgotPassword
              ? "Enter your email to receive a reset link"
              : isLogin
              ? "Sign in to sync your progress"
              : "Sign up to track your progress"}
          </p>
        </div>

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
              Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem 0.75rem 2.75rem",
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
            </div>
          </div>

          {!isForgotPassword && (
            <>
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
                  Password
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {!isLogin && (
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
                    Confirm Password
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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
              )}
            </>
          )}

          {isLogin && !isForgotPassword && (
            <div
              style={{
                textAlign: "right",
                marginBottom: "1rem",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(true);
                  setError("");
                  setMessage("");
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--accent-secondary)",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  textDecoration: "underline",
                }}
              >
                Forgot Password?
              </button>
            </div>
          )}

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

          {message && (
            <div
              style={{
                padding: "0.75rem",
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.2)",
                borderRadius: "var(--radius-sm)",
                color: "var(--success)",
                fontSize: "0.875rem",
                marginBottom: "1rem",
              }}
            >
              {message}
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
            {loading
              ? "Please wait..."
              : isForgotPassword
              ? "Send Reset Link"
              : isLogin
              ? "Sign In"
              : "Sign Up"}
          </button>
        </form>

        <div
          style={{
            marginTop: "1.5rem",
            textAlign: "center",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border-color)",
          }}
        >
          {isForgotPassword ? (
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
              Remember your password?{" "}
              <button
                onClick={() => {
                  setIsForgotPassword(false);
                  setIsLogin(true);
                  setError("");
                  setMessage("");
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--accent-secondary)",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  textDecoration: "underline",
                }}
              >
                Sign In
              </button>
            </p>
          ) : (
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setMessage("");
                  setConfirmPassword("");
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--accent-secondary)",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  textDecoration: "underline",
                }}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
