import React, { useState } from "react";
import NavBar from "./NavBar";

const JobMatch = () => {
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call will go here later
    console.log("Job description submitted:", jobDescription);
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
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Match Resume
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMatch;
