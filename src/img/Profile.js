import React, { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    fetch("/profile/", {
      method: "post",
      credentials: "include",
      cache: "no-cache",
      body: JSON.stringify({
        userName: userName,
        password: password,
        passwordBis: passwordBis,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      response.json().then((json) => window.alert(json.error || json.message));
    });
  }, []);
  return <div></div>;
};

export default Profile;
