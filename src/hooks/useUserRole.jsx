import { useEffect, useState } from "react";

const useUserRole = (email) => {
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/role/${email}`)
        .then((res) => res.json())
        .then((data) => setUserRole(data.role))
        .catch((error) => console.log(error));
    }
  }, [email]);
  return userRole;
};

export default useUserRole;
