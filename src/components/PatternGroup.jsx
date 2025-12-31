import React, { useState } from "react";
import { ChevronDown, ChevronRight, PieChart } from "lucide-react";
import ProblemRow from "./ProblemRow";

export default function PatternGroup({
  pattern,
  problems,
  completedIds,
  onToggle,
  isExpanded,
  onToggleExpand,
}) {
  // Local state removed in favor of controlled state from parent

  const completedCount = problems.filter((p) =>
    completedIds.includes(p.id),
  ).length;
  const totalCount = problems.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isAllCompleted = progress === 100 && totalCount > 0;

  return (
    <div
      className="card animate-fade-in"
      style={{ marginBottom: "1.5rem", overflow: "hidden", padding: 0 }}
    >
      {/* Header */}
      <div
        onClick={onToggleExpand}
        style={{
          padding: "1.25rem 1.5rem",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: isAllCompleted
            ? "rgba(16, 185, 129, 0.05)"
            : "rgba(255,255,255,0.02)",
          borderBottom: isExpanded ? "1px solid var(--border-color)" : "none",
          transition: "all 0.2s",
        }}
        className="group-header"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flex: 1,
          }}
        >
          <div style={{ color: "var(--text-muted)" }}>
            {isExpanded ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </div>
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: isAllCompleted
                  ? "var(--success)"
                  : "var(--text-primary)",
              }}
            >
              {pattern}
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "4px",
              }}
            >
              <span
                style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}
              >
                {completedCount}/{totalCount} Completed
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "100px",
              height: "6px",
              background: "var(--bg-tertiary)",
              borderRadius: "3px",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: isAllCompleted
                  ? "var(--success)"
                  : "var(--accent-secondary)",
                borderRadius: "3px",
                transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            ></div>
          </div>
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: "600",
              minWidth: "2.5rem",
              textAlign: "right",
              color: isAllCompleted
                ? "var(--success)"
                : "var(--text-secondary)",
            }}
          >
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="pattern-content">
          {problems.map((p) => (
            <ProblemRow
              key={p.id}
              problem={p}
              isCompleted={completedIds.includes(p.id)}
              onToggle={onToggle}
            />
          ))}
          {problems.length === 0 && (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "var(--text-muted)",
              }}
            >
              No problems found in this category.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
