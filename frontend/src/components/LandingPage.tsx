import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#1a3b63] via-[#2b5c94] to-[#3d75b3]">
      <div className="text-center space-y-6">
        <h1 className="text-7xl font-bold text-white tracking-wider">
          Acceleratr
        </h1>
        <p className="text-xl text-gray-200 tracking-wide">
          Streamlining the application process
        </p>
        <div className="space-y-4">
          <button
            className="w-48 px-8 py-3 text-lg font-semibold text-white bg-[#2C74B3] hover:bg-[#205295] rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            onClick={() => {
              navigate("/register");
            }}
          >
            Get Started
          </button>
          <div className="flex flex-col items-center space-y-2">
            <p className="text-gray-300">Already have an account?</p>
            <button
              className="w-48 px-8 py-3 text-lg font-semibold text-[#2C74B3] bg-white hover:bg-gray-100 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
