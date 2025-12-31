import React from "react";
import { Check, ExternalLink } from "lucide-react";

export default function ProblemRow({ problem, isCompleted, onToggle }) {
  const difficultyClass = `badge badge-${problem.difficulty.toLowerCase()}`;

  return (
    <div
      className={`problem-row ${isCompleted ? "completed" : ""}`}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "1rem 1.5rem",
        borderBottom: "1px solid var(--border-color)",
        transition: "background 0.2s",
        opacity: isCompleted ? 0.6 : 1,
        backgroundColor: isCompleted ? "rgba(0,0,0,0.2)" : "transparent",
      }}
    >
      <label
        className="checkbox-container"
        style={{
          marginRight: "1rem",
          cursor: "pointer",
          position: "relative",
          display: "flex",
        }}
      >
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(problem.id)}
          style={{ display: "none" }}
        />
        <div
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "6px",
            border: `2px solid ${isCompleted ? "var(--accent-primary)" : "var(--text-muted)"}`,
            background: isCompleted ? "var(--accent-primary)" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
        >
          {isCompleted && <Check size={14} color="white" strokeWidth={3} />}
        </div>
      </label>

      <div style={{ flex: 1, minWidth: 0 }}>
        {problem.url ? (
          <a
            href={problem.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            className="problem-link"
          >
            <span
              style={{
                fontWeight: "500",
                fontSize: "1rem",
                textDecoration: isCompleted ? "line-through" : "none",
                color: isCompleted
                  ? "var(--text-muted)"
                  : "var(--text-primary)",
              }}
            >
              {problem.title}
            </span>
            <ExternalLink size={14} style={{ opacity: 0.5 }} />
          </a>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                fontWeight: "500",
                fontSize: "1rem",
                textDecoration: isCompleted ? "line-through" : "none",
                color: isCompleted
                  ? "var(--text-muted)"
                  : "var(--text-primary)",
              }}
            >
              {problem.title}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                fontStyle: "italic",
                opacity: 0.7,
              }}
            >
              will be added soon
            </span>
          </div>
        )}
        <div
          style={{
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            marginTop: "2px",
          }}
        >
          {problem.platform || "TBD"}
        </div>
      </div>

      <div style={{ marginLeft: "1rem", flexShrink: 0 }}>
        <span className={difficultyClass}>{problem.difficulty}</span>
      </div>
    </div>
  );
}
