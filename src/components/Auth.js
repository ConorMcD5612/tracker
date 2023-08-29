import React, { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useAuth } from "./context/AuthContext";

export function Auth({ setIsLoading }) {
  const { setUser, user } = useAuth();

  const createOrGetUser = async (response) => {
    const decoded = jwt_decode(response.credential);
    const { sub } = decoded;

    localStorage.setItem("user", JSON.stringify(sub));
    setUser(sub);

    // Make an API call to add user if they don't exist
    console.log(sub);
    await fetch(`http://localhost:5000/add-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sub: sub }),
    });
    console.log("done loading");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(storedUser);

    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    setUser({});
    localStorage.removeItem("user");
  };

  return (
    <div>
      {user ? (
        <button style={{ background: "white" }} onClick={() => logout()}>
          LogOut
        </button>
      ) : (
        <GoogleLogin
          onSuccess={(response) => createOrGetUser(response)}
          onError={() => console.log("error")}
        />
      )}
    </div>
  );
}
