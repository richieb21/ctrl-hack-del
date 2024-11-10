import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Home from "./components/Home";
import Onboarding from "./components/Onboarding";
import Tailor from "./components/Tailor";
import LatexDisplay from "./components/Latex";
import { ResumeProvider } from "./context/ResumeContext";

function App() {
  return (
    <ResumeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tailor" element={<Tailor />} />
          <Route path="/latex" element={<LatexDisplay />} />
        </Routes>
      </Router>
    </ResumeProvider>
  );
}

export default App;
