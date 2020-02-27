import React, { useState, useEffect } from "react";
import { Grid, Button, Segment } from "semantic-ui-react";

export const Hub: React.FC = () => {
  const [hubData, setHubData] = useState();

  const getAllData = async () => {
    await fetch("/all-user-data")
      .then(res => res.json())
      .then(data => setHubData(data));
  };

  console.log("hubData ==> ", hubData);

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="companylists">
      <Grid columns={2}>
        <Grid.Column width={13}>
          <Segment>
            <Grid>
              {/* {(hubData || {}).length > 0
                ? (hubData || {}).map((item: {}) => (

                ))
                : "You have no times, tickets, projects or companies ..."} */}
            </Grid>
          </Segment>
        </Grid.Column>
        <Grid.Column width={3}>
          <Button>Create a new company</Button>
        </Grid.Column>
      </Grid>
    </div>
  );
};
