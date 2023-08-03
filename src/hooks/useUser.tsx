import { UserContext, UserDispatchContext } from "@/context/UserContext";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect } from "react";

const useUser = () => {
  const user = useContext(UserContext);
  const setUser = useContext(UserDispatchContext);

  if (!setUser) throw "useUser hook must be used in UserProvider.";

  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      if (data.user) {
        setUser({
          email: data.user.email || "",
          image: data.user.image || "",
          name: data.user.name || "",
        });
      }
    }
  }, [status, data]);

  return {
    status,
    user,
  };
};

export default useUser;
