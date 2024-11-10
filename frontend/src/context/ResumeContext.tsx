// frontend/src/context/ResumeContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { Resume } from "../constants/types";
import { api } from "../services/api";

interface ResumeContextType {
  resume: Resume | null;
  loading: boolean;
  error: string | null;
  setResume: (resume: Resume) => void;
  refreshResume: () => Promise<void>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResume = async () => {
    try {
      setLoading(true);
      const data = await api.generateResumeJSON();

      if (!data || !data.sections) {
        throw new Error("Invalid resume data received");
      }

      setResume(data); // Use the data as-is, with IDs from the backend
      setError(null);
    } catch (err) {
      setError("Failed to load resume data. Please try again.");
      console.error("Error fetching resume:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resume,
        loading,
        error,
        setResume,
        refreshResume: fetchResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
