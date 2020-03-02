import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "semantic-ui-react";

export const Home: React.FC = () => {
  const [userData, setUserData] = useState();
  const [loaded, setLoaded] = useState(false);

  const getUserData = async () => {
    setLoaded(false);
    await fetch("http://localhost:3005/whoami")
      .then(res => res.json())
      .then(data => setUserData(data));
    setLoaded(true);
  };

  console.log("userData ==> ", userData);

  useEffect(() => {
    if (!loaded) {
      getUserData();
    }
  }, [loaded]);

  if (!userData) return <Redirect to="/login" />;

  if (!loaded) return <div>Loading ...</div>;

  return (
    <div>
      This is the home page
      <Button href="http://localhost:3005/auth/logout">Log out</Button>
    </div>
  );
};
