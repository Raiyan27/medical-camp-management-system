import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const axiosPublic = useAxiosPublic();

  const fetchUser = async (email) => {
    const response = await axiosPublic.get("/user", {
      params: { email },
    });
    return response.data;
  };

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", currentUser?.email],
    queryFn: () => fetchUser(currentUser?.email),
    enabled: !!currentUser?.email,

    onError: (error) => {
      console.error("Error fetching user:", error);
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        const userInfo = { email: user.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const admin = userData?.admin || false;

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, loading, admin }}
    >
      {!loading && !isUserLoading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
