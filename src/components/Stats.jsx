import React from "react";
import {
  Award,
  Target,
  Zap,
  TrendingUp,
  CheckCircle,
  Activity,
} from "lucide-react";

export default function Stats({ total = 0, completed = 0 }) {
  // Ensure we have valid numbers
  const safeTotal = Number(total) || 0;
  const safeCompleted = Number(completed) || 0;
  const percentage =
    safeTotal === 0 ? 0 : Math.round((safeCompleted / safeTotal) * 100);
  const remaining = Math.max(0, safeTotal - safeCompleted);

  // Calculate stroke dasharray for circular progress
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2.5rem",
      }}
    >
      {/* Card 1: Total Progress (Purple/Blue Theme) */}
      <div
        className="card animate-fade-in"
        style={{
          background:
            "linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(49, 46, 129, 0.6) 100%)",
          border: "1px solid rgba(139, 92, 246, 0.3)",
          backdropFilter: "blur(10px)",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          ":hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.5)",
          },
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-10%",
            width: "150px",
            height: "150px",
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        ></div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                color: "#a78bfa",
                fontWeight: "600",
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Target size={16} /> Problems Solved
            </p>
            <h2
              style={{
                fontSize: "3rem",
                fontWeight: "800",
                margin: "0.5rem 0",
                background: "linear-gradient(to right, #fff, #c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: "1",
              }}
            >
              {safeCompleted}
            </h2>
            <div
              style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <span>of {safeTotal}</span>
            </div>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#c4b5fd",
                marginTop: "0.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <Activity size={12} /> Every problem counts!
            </p>
          </div>

          {/* Circular Progress */}
          <div
            style={{
              position: "relative",
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="80" height="80" style={{ transform: "rotate(-90deg)" }}>
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="rgba(139, 92, 246, 0.2)"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                stroke="#8b5cf6"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                fontSize: "0.85rem",
                fontWeight: "700",
                color: "#c4b5fd",
              }}
            >
              {percentage}%
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "1.25rem",
            width: "100%",
            height: "4px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${percentage}%`,
              height: "100%",
              background: "linear-gradient(90deg, #8b5cf6, #3b82f6)",
              borderRadius: "2px",
              boxShadow: "0 0 10px rgba(139,92,246, 0.7)",
            }}
          ></div>
        </div>
      </div>

      {/* Card 2: Status/Rank (Green/Emerald Theme) */}
      <div
        className="card animate-fade-in"
        style={{
          background:
            "linear-gradient(135deg, rgba(6, 78, 59, 0.8) 0%, rgba(6, 95, 70, 0.6) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          backdropFilter: "blur(10px)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "120px",
            height: "120px",
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        ></div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              background: "rgba(16, 185, 129, 0.2)",
              padding: "1rem",
              borderRadius: "1rem",
              color: "#34d399",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
            }}
          >
            <Award size={32} />
          </div>
          <div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#6ee7b7",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: "600",
                marginBottom: "0.25rem",
              }}
            >
              Current Rank
            </p>
            <h3
              style={{ fontSize: "1.75rem", fontWeight: "700", color: "#fff" }}
            >
              {percentage === 100
                ? "Grandmaster"
                : percentage > 75
                  ? "Expert"
                  : percentage > 50
                    ? "Specialist"
                    : percentage > 25
                      ? "Apprentice"
                      : "Novice"}
            </h3>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#a7f3d0",
                marginTop: "0.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <TrendingUp size={12} /> Keep pushing needed!
            </p>
          </div>
        </div>
      </div>

      {/* Card 3: Problems Left (Orange/Amber Theme) */}
      <div
        className="card animate-fade-in"
        style={{
          background:
            "linear-gradient(135deg, rgba(120, 53, 15, 0.8) 0%, rgba(146, 64, 14, 0.6) 100%)",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          backdropFilter: "blur(10px)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "200px",
            height: "200px",
            background:
              "radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        ></div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              background: "rgba(245, 158, 11, 0.2)",
              padding: "1rem",
              borderRadius: "1rem",
              color: "#fbbf24",
              boxShadow: "0 0 20px rgba(245, 158, 11, 0.3)",
            }}
          >
            <Zap size={32} />
          </div>
          <div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#fcd34d",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: "600",
                marginBottom: "0.25rem",
              }}
            >
              Remaining
            </p>
            <h3
              style={{ fontSize: "1.75rem", fontWeight: "700", color: "#fff" }}
            >
              {remaining}{" "}
              <span
                style={{ fontSize: "1rem", fontWeight: "500", opacity: 0.8 }}
              >
                Problems
              </span>
            </h3>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#fde68a",
                marginTop: "0.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <CheckCircle size={12} /> You can do this!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
