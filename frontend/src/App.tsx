import React from "react";
import "./index.css";
import "./App.css";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#0A2647] via-[#144272] to-[#205295]">
      <div className="text-center">
        <h1 className="mb-8 text-7xl font-bold text-white tracking-wider">
          Acceleratr
        </h1>
        <button
          className="px-8 py-3 text-lg font-semibold text-white bg-[#2C74B3] hover:bg-[#205295] rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          onClick={() => {
            // Add your navigation or action here
            console.log("Get Started clicked");
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
