import React, { FC, useState, useEffect } from "react";
import { Form, Label, Input, Button } from "semantic-ui-react";

type Props = {
  setShowForm: any;
};

export const CompanyForm: FC<Props> = ({ setShowForm }) => {
  const [newCompanyName, setNewCompanyName] = useState("");
  const [userID, setUserID] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const onSubmitter = (e: any) => {
    const companyInfo = {
      user_id: userID,
      company_name: newCompanyName
    };
    fetch("add-company/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(companyInfo)
    });
    console.log("company info ==> ", companyInfo);
    setShowForm(false);
  };

  const getUser = async () => {
    await fetch("/whoami")
      .then(res => res.json())
      .then(data => setUserID(data.user_id));
    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded) {
      getUser();
    }
  }, [loaded]);

  if (!loaded) {
    return <p>Getting user info...</p>;
  }

  return (
    <div>
      <Form onSubmit={onSubmitter}>
        <Form.Field>
          <Label>
            Company's Name:
            <Input
              type="text"
              onChange={(e: any) => setNewCompanyName(e.target.value)}
              placeholder="Please enter company name ..."
            />
          </Label>
        </Form.Field>
        <Form.Field>
          <Button type="submit">Create Company</Button>
        </Form.Field>
      </Form>
    </div>
  );
};
