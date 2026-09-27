"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { toast, ToastContainer } from "react-toastify";

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

  const announce = useCallback((message: string) => toast(message), []);
  const addToPlan = useCallback((id: number) => {
    if (plannedIds.includes(id)) {
      announce("This workout is already in today’s plan");
      return;
    }
    if (plannedIds.length >= 5) {
      announce("Today’s plan is limited to five lifts");
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
      <ToastContainer
        position="bottom-center"
        autoClose={2600}
        hideProgressBar
        closeButton={false}
        draggable={false}
        theme="dark"
        toastClassName="!min-h-0 !rounded-xl !border !border-[#3b4325] !bg-[#1a2110] !px-5 !py-3 !text-sm !font-medium !text-[#d7ff37] !shadow-[0_12px_36px_rgba(0,0,0,.45)]"
        bodyClassName="!p-0 !text-inherit"
      />
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) throw new Error("useFitLog must be used within FitLogProvider");
  return context;
}
