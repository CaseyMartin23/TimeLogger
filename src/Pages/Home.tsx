import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "semantic-ui-react";

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
    <div>
      <div>This is the home page</div>
      <Button href="http://localhost:3005/auth/logout">Log out</Button>
    </div>
  );
};
