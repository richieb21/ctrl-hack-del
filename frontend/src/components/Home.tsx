import React, { useEffect, useState } from "react";
import Resume from "./resume/Resume";
import NavBar from "./NavBar";
import { api } from "../services/api";
import { User } from "../constants/types";

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await api.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      {user && (
        <div className="flex flex-row m-5">
          <NavBar />
          <Resume user={user} />
        </div>
      )}
    </>
  );
};

export default Home;
