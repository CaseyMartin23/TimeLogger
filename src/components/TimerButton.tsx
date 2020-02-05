import React, { FC, useState } from "react";
import { Button } from "semantic-ui-react";

export const TimerButton: FC = () => {
  const [timer, setTimer] = useState();

  const onClicker = () => {
    const myDate = new Date();
    setTimer(setInterval(() => myDate, 1000));
  };

  return (
    <div className="companylists">
      <Button onClick={() => {}}></Button>
      <div>{timer}</div>
    </div>
  );
};
