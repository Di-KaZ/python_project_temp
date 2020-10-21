import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const useLogin = () => {
  const [token] = useState(Cookies.get("token"));
  const history = useHistory();
  useEffect(() => {
    fetch("/profile", {
      method: "post",
      credentials: "include",
      cache: "no-cache",
      body: JSON.stringify({
        token: token,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      response.json().then((json) => {
        if (token === undefined || token === null || "error" in json)
          history.push("/login");
      });
    });
  }, []);

  return token;
};

export default useLogin;
