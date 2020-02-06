import React, { FC, useState, useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";

type Props = {
  ticketID: number;
  companyID: string | undefined;
};

export const TimerButton: FC<Props> = ({ ticketID, companyID }) => {
  const [startTime, setStartTime] = useState();
  const [buttonColor, setButtonColor] = useState();
  const [totalTime, setTotalTime] = useState();
  const [clicked, setClicked] = useState(false);
  const [finish, setFinish] = useState(false);
  const [ticketTime, setTicketTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getStartTime = () => {
    const myDate = new Date();
    const beginTime = {
      hours: myDate.getHours(),
      minutes: myDate.getMinutes(),
      seconds: myDate.getSeconds()
    };
    setStartTime(beginTime);
    setButtonColor("green");
    console.log("This is your starting time ==> ", beginTime);
    setClicked(true);
  };

  const getEndTime = () => {
    if (!clicked) return;
    const myDate = new Date();
    const finalTime = {
      hours: myDate.getHours(),
      minutes: myDate.getMinutes(),
      seconds: myDate.getSeconds()
    };
    console.log("final time ==> ", finalTime);
    const totalTime = `h ${finalTime.hours -
      startTime.hours} : m ${finalTime.minutes -
      startTime.minutes} : s ${finalTime.seconds - startTime.seconds}`;
    setTotalTime(totalTime);
    console.log("Total time ==> ", totalTime);
    setFinish(true);
  };

  const addTicketTime = async () => {
    await fetch("/add-ticket-time", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ticket_time: totalTime,
        ticket_id: ticketID
      })
    });
    console.log("ticket time ===> ", totalTime);
  };

  const getTicketTime = async () => {
    setLoading(true);
    setLoaded(false);
    await fetch(`/get-ticket-time/${companyID}/${ticketID}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTicketTime(data[0].ticket_time);
        console.log("ticketTime ==> ", ticketTime);
      });
    setLoading(false);
    return setLoaded(true);
  };

  useEffect(() => {
    if (!loaded) {
      getTicketTime();
    }
  }, [loaded]);

  useEffect(() => {
    if (finish) {
      addTicketTime();
    }
  }, [finish]);

  if (loading) return <div>Loading ...</div>;

  return (
    <div style={{ padding: "20px", paddingTop: "40px" }}>
      <Grid columns={2}>
        <Grid.Column style={{ padding: 0 }}>
          {!ticketTime ? (
            <Button compact color={buttonColor} onClick={getStartTime}>
              {!finish && !clicked
                ? "Click to start timer"
                : !finish && clicked
                ? "Timer is running ..."
                : "Done"}
            </Button>
          ) : (
            ""
          )}
        </Grid.Column>
        <Grid.Column style={{ padding: 0 }}>
          {!ticketTime ? (
            <Button compact color="red" onClick={getEndTime}>
              Click to end timer
            </Button>
          ) : (
            ""
          )}
        </Grid.Column>
      </Grid>
      <div style={{ margin: "20px" }}>
        {`This is your total ticket time: 
        ${
          ticketTime
            ? ticketTime
            : !ticketTime
            ? totalTime === undefined
              ? ""
              : totalTime
            : ""
        }`}
      </div>
    </div>
  );
};
