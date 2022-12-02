import { useEffect, useState } from "react";

const useUserRole = (email) => {
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    if (email) {
      fetch(`https://alike-new-server-side.vercel.app/users/role/${email}`)
        .then((res) => res.json())
        .then((data) => setUserRole(data.role))
        .catch((error) => console.log(error));
    }
  }, [email]);
  return userRole;
};

export default useUserRole;
