import React, { useState } from "react";
import NavBar from "./NavBar";
import { api } from "../services/api";

interface MatchResult {
  type: string;
  title: string;
  score: number;
  subtitle?: string;
  date?: string;
  location?: string;
  content?: string;
}

const JobMatch = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.matchJob(jobDescription);
      setMatches(response.matches);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row m-5">
      <NavBar />
      <div className="flex-grow">
        <div className="m-5 p-8 rounded-xl text-center">
          <h1 className="text-4xl font-bold text-blue-500 mb-1">
            Job Matching
          </h1>
          <p className="text-gray-600 text-lg">
            Paste your job description below to find the best matching
            experiences
          </p>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="jobDescription"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Paste the job description here..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
              >
                {isLoading ? "Matching..." : "Match Resume"}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {matches.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Matching Results</h2>
                <div className="space-y-4">
                  {matches.map((match, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold">
                            {match.title}
                          </h3>
                          {match.subtitle && (
                            <p className="text-gray-600">{match.subtitle}</p>
                          )}
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {match.score}%
                        </span>
                      </div>
                      {match.date && (
                        <p className="text-gray-500 text-sm mt-1">
                          {match.date}
                        </p>
                      )}
                      {match.location && (
                        <p className="text-gray-500 text-sm">
                          {match.location}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMatch;
