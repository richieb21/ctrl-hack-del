import { createContext, useEffect, useState, useCallback } from "react";
import { User } from "../constants/types";
import { api } from "../services/api";
export const UserContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  reloadUser: () => Promise<void>;
  loading: boolean;
}>({
  user: null,
  setUser: () => {},
  reloadUser: async () => {},
  loading: true,
});

export const UserContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const reloadUser = useCallback(async () => {
    try {
      setLoading(true);
      const user = await api.getUser();
      console.log("Fetched user:", user); // Add this debug log
      setUser(user);
    } catch (error) {
      console.error("Failed to load user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reloadUser();
  }, []); // Remove user from dependency array

  console.log("Context state:", { user, loading }); // Add this debug log

  return (
    <UserContext.Provider value={{ user, setUser, reloadUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
