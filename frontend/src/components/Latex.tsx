import React, { useState } from "react";
import { api } from "../services/api";
import NavBar from "./NavBar";

const LatexDisplay: React.FC = () => {
  const [latex, setLatex] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [compiling, setCompiling] = useState(false);
  const [error, setError] = useState<string>("");
  const [viewMode, setViewMode] = useState<"latex" | "pdf">("latex");

  const handleGenerateResume = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.generateResume();
      setLatex(response);
      setViewMode("latex");
      setPdfUrl(""); // Reset PDF when new LaTeX is generated
    } catch (err) {
      setError("Failed to generate resume. Please try again.");
      console.error("Error generating resume:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompilePdf = async () => {
    try {
      setCompiling(true);
      setError("");
      const response = await api.compilePdf(latex);
      setPdfUrl(response.pdf);
      setViewMode("pdf");
    } catch (err) {
      setError("Failed to compile PDF. Please try again.");
      console.error("Error compiling PDF:", err);
    } finally {
      setCompiling(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(latex);
  };

  return (
    <div className="flex flex-row m-5">
      <NavBar />
      <div className="flex-grow p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button
              onClick={handleGenerateResume}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? "Generating..." : "Generate LaTeX Resume"}
            </button>
            {latex && (
              <button
                onClick={handleCompilePdf}
                disabled={compiling}
                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 disabled:bg-green-300"
              >
                {compiling ? "Compiling..." : "Compile to PDF"}
              </button>
            )}
          </div>
          <div className="flex gap-2">
            {latex && (
              <>
                <button
                  onClick={() => setViewMode("latex")}
                  className={`px-4 py-2 rounded-xl ${
                    viewMode === "latex"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  View LaTeX
                </button>
                {pdfUrl && (
                  <button
                    onClick={() => setViewMode("pdf")}
                    className={`px-4 py-2 rounded-xl ${
                      viewMode === "pdf"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    View PDF
                  </button>
                )}
                <button
                  onClick={handleCopyToClipboard}
                  className="px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600"
                >
                  Copy to Clipboard
                </button>
              </>
            )}
          </div>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mt-4">
          {viewMode === "latex" && latex && (
            <div className="bg-gray-100 p-4 rounded-xl">
              <pre className="whitespace-pre-wrap font-mono text-sm overflow-x-auto">
                {latex}
              </pre>
            </div>
          )}
          {viewMode === "pdf" && pdfUrl && (
            <div className="bg-gray-100 p-4 rounded-xl h-[800px]">
              <iframe
                src={pdfUrl}
                className="w-full h-full"
                title="Resume PDF"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatexDisplay;
