import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export const useProgress = () => {
  const { user } = useAuth();
  const [completedIds, setCompletedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Save to Supabase
  const saveToSupabase = useCallback(
    async (ids) => {
      if (!user) return;

      try {
        const { error } = await supabase.from("user_progress").upsert(
          {
            user_id: user.id,
            completed_problems: ids,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id",
          }
        );
      } catch (error) {
        // Silently handle error
      }
    },
    [user]
  );

  // Load progress from Supabase or localStorage
  useEffect(() => {
    const loadProgress = async () => {
      if (user) {
        // Load from Supabase
        try {
          const { data, error } = await supabase
            .from("user_progress")
            .select("completed_problems")
            .eq("user_id", user.id)
            .single();

          // Silently handle errors (PGRST116 is "not found" error, which is fine for new users)

          if (data) {
            setCompletedIds(data.completed_problems || []);
          } else {
            // New user, check if there's local storage data to migrate
            const localData = localStorage.getItem("dsa-tracker-progress");
            if (localData) {
              const parsedData = JSON.parse(localData);
              setCompletedIds(parsedData);
              // Save to Supabase
              await saveToSupabase(parsedData);
            }
          }
        } catch (error) {
          // Silently handle error
        }
      } else {
        // Load from localStorage for non-authenticated users
        const saved = localStorage.getItem("dsa-tracker-progress");
        setCompletedIds(saved ? JSON.parse(saved) : []);
      }
      setLoading(false);
    };

    loadProgress();
  }, [user, saveToSupabase]);

  // Update progress
  const updateProgress = async (newIds) => {
    setCompletedIds(newIds);

    if (user) {
      // Save to Supabase
      await saveToSupabase(newIds);
    } else {
      // Save to localStorage
      localStorage.setItem("dsa-tracker-progress", JSON.stringify(newIds));
    }
  };

  const toggleProblem = async (id) => {
    const newIds = completedIds.includes(id)
      ? completedIds.filter((pid) => pid !== id)
      : [...completedIds, id];

    await updateProgress(newIds);
    return !completedIds.includes(id); // Return true if problem was just completed
  };

  return {
    completedIds,
    loading,
    toggleProblem,
    updateProgress,
  };
};
