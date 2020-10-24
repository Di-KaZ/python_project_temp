import { useState, useEffect } from "react";
import Cookies from "js-cookie";
const useLogin = () => {
  const [token] = useState(Cookies.get("token"));
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    fetch("/check_token", {
      method: "post",
      credentials: "include",
      cache: "no-cache",
      body: JSON.stringify({
        token: token,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      response.json().then((json) => {
        if (!(token === undefined || token === null || "error" in json))
          setIsLogged(true);
      });
    });
  }, []);

  return [token, isLogged, setIsLogged];
};

export default useLogin;
