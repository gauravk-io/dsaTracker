import React, { useState } from "react";
import { Menu, X, Github, Volume2, VolumeX, LogOut, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

const HamburgerMenu = ({ isMuted, onToggleMute, onAuthClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setIsOpen(false);
        window.location.reload();
        return;
      }

      const { error } = await signOut();
      if (!error) {
        window.location.reload();
      }
      setIsOpen(false);
    } catch (err) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 998,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            padding: "0.5rem",
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.2s",
          }}
          className="hamburger-button"
          onMouseEnter={(e) => (e.target.style.color = "var(--text-primary)")}
          onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 0.5rem)",
              right: 0,
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-md)",
              padding: "0.5rem",
              minWidth: "200px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              zIndex: 999,
            }}
          >
            <a
              href="https://youtube.com/playlist?list=PLbJhGqY-mq47k_WLUtzVjmarUm1EuXPj2&si=JNnnEBLVfrxXIpCj"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                color: "var(--text-primary)",
                textDecoration: "none",
                borderRadius: "var(--radius-sm)",
                transition: "background 0.2s",
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "var(--bg-tertiary)")
              }
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
              Playlist
            </a>

            <a
              href="https://docs.google.com/spreadsheets/d/1T5-nGsJ9WNwna44e9WWRD0jlZIT5KxVOGvylcvvVrY8/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                color: "var(--text-primary)",
                textDecoration: "none",
                borderRadius: "var(--radius-sm)",
                transition: "background 0.2s",
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "var(--bg-tertiary)")
              }
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Sheet
            </a>

            <a
              href="https://github.com/gauravk-io/sheetTracker"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                color: "var(--text-primary)",
                textDecoration: "none",
                borderRadius: "var(--radius-sm)",
                transition: "background 0.2s",
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "var(--bg-tertiary)")
              }
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              <Github size={20} />
              GitHub
            </a>

            <button
              onClick={onToggleMute}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                color: "var(--text-primary)",
                background: "transparent",
                border: "none",
                borderRadius: "var(--radius-sm)",
                transition: "background 0.2s",
                fontSize: "0.9rem",
                fontWeight: "500",
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "var(--bg-tertiary)")
              }
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              {isMuted ? "Unmute" : "Mute"}
            </button>

            <div
              style={{
                height: "1px",
                background: "var(--border-color)",
                margin: "0.5rem 0",
              }}
            />

            {user ? (
              <>
                <div
                  style={{
                    padding: "0.75rem 1rem",
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  {user.email}
                </div>
                <button
                  onClick={handleSignOut}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    handleSignOut(e);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    color: "var(--danger)",
                    background: "transparent",
                    border: "none",
                    borderRadius: "var(--radius-sm)",
                    transition: "background 0.2s",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    WebkitTapHighlightColor: "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.background = "rgba(239, 68, 68, 0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.background = "transparent")
                  }
                >
                  <LogOut size={20} />
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onAuthClick();
                  setIsOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  color: "var(--text-primary)",
                  background: "transparent",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  transition: "background 0.2s",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background = "var(--bg-tertiary)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = "transparent")
                }
              >
                <User size={20} />
                Sign In
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HamburgerMenu;
