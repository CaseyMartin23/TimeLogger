import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Content } from "../components/Content";

export const Home: React.FC = () => {
  const [userData, setUserData] = useState();
  const [loaded, setLoaded] = useState(false);

  const getUserData = async () => {
    setLoaded(false);
    try {
      await fetch("/whoami")
        .then(res => res.json())
        .then(data => setUserData(data));
    } catch (e) {
      console.log(e);
    }
    setLoaded(true);
  };

  console.log("userData ==> ", userData);

  useEffect(() => {
    if (!loaded) {
      getUserData();
    }
  }, [loaded]);

  if (!loaded) return <div>Loading ...</div>;

  if (!userData) return <Redirect to="/login" />;

  return (
    <div className="Home">
      <Content />
    </div>
  );
};
