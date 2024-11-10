import React, { useState } from "react";
import { api } from "../services/api";

const LatexDisplay: React.FC = () => {
  const [latex, setLatex] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleGenerateResume = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.generateResume();
      setLatex(response.latex);
    } catch (err) {
      setError("Failed to generate resume. Please try again.");
      console.error("Error generating resume:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(latex);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleGenerateResume}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? "Generating..." : "Generate LaTeX Resume"}
        </button>
        {latex && (
          <button
            onClick={handleCopyToClipboard}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Copy to Clipboard
          </button>
        )}
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {latex && (
        <div className="mt-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap font-mono text-sm overflow-x-auto">
              {latex}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatexDisplay;
