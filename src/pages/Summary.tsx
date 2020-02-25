import React, { useState } from "react";
import { Segment, Dropdown } from "semantic-ui-react";

export const Summary: React.FC = () => {
  const [sort, setSort] = useState();

  const options = [
    { key: 1, text: "today", value: "today" },
    { key: 2, text: "this week", value: "week" },
    { key: 3, text: "this month", value: "month" },
    { key: 4, text: "this year", value: "year" }
  ];

  return (
    <div className="companylists">
      <Dropdown
        selection
        options={options}
        onChange={(e: any, { value }) => setSort(value)}
      />
      <Segment>table</Segment>
      <div>this is the sort order: {sort}</div>
    </div>
  );
};
