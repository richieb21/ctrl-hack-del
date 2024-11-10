import React, { useEffect, useState } from "react";
import Resume from "./resume/Resume";
import NavBar from "./NavBar";
import { api } from "../services/api";
import { User } from "../constants/types";

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await api.getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">
          No user data found. Please try logging in again.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row m-5">
      <NavBar />
      <Resume user={user} />
    </div>
  );
};

export default Home;
