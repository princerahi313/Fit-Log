"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type FitLogContextValue = {
  plannedIds: number[];
  savedIds: number[];
  addToPlan: (id: number) => void;
  saveForLater: (id: number) => void;
};

const STORAGE_KEY = "fitlog-workouts-v1";
const FitLogContext = createContext<FitLogContextValue | null>(null);

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [plannedIds, setPlannedIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = stored ? JSON.parse(stored) : null;
      if (typeof parsed === "object" && parsed !== null) {
        const state = parsed as { planned?: unknown; saved?: unknown };
        setPlannedIds(Array.isArray(state.planned) ? state.planned.filter((id): id is number => Number.isInteger(id)) : []);
        setSavedIds(Array.isArray(state.saved) ? state.saved.filter((id): id is number => Number.isInteger(id)) : []);
      }
    } catch {
      setPlannedIds([]);
      setSavedIds([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ planned: plannedIds, saved: savedIds }));
    } catch (error) {
      console.error("Could not save FitLog workout selections:", error);
    }
  }, [plannedIds, ready, savedIds]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const announce = useCallback((message: string) => setToast(message), []);
  const addToPlan = useCallback((id: number) => {
    if (plannedIds.includes(id)) {
      announce("This workout is already in today’s plan");
      return;
    }
    setPlannedIds((current) => current.includes(id) ? current : [...current, id]);
    announce("Added to today’s plan");
  }, [announce, plannedIds]);
  const saveForLater = useCallback((id: number) => {
    if (savedIds.includes(id)) {
      announce("This workout is already saved");
      return;
    }
    setSavedIds((current) => current.includes(id) ? current : [...current, id]);
    announce("Saved for later");
  }, [announce, savedIds]);

  return (
    <FitLogContext.Provider value={{ plannedIds, savedIds, addToPlan, saveForLater }}>
      {children}
      <div className={`pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition duration-200 ${toast ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`} role="status" aria-live="polite" aria-atomic="true">
        <span className="block rounded-xl border border-[#3b4325] bg-[#1a2110] px-5 py-3 text-sm font-medium text-[#d7ff37] shadow-[0_12px_36px_rgba(0,0,0,.45)]">{toast}</span>
      </div>
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) throw new Error("useFitLog must be used within FitLogProvider");
  return context;
}
