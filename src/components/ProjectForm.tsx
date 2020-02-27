import React, { useState } from "react";
import { Form, Label, Input, Button } from "semantic-ui-react";

type Props = {
  companyID: number;
  setShowForm(value: boolean): void;
  setAddedAProject(value: boolean): void;
};

export const ProjectForm: React.FC<Props> = ({
  companyID,
  setShowForm,
  setAddedAProject
}) => {
  const [projectName, setProjectName] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onSubmitter = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setAddedAProject(false);
    const projectInfo = {
      company_id: companyID,
      project_name: projectName
    };
    await fetch("/add-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(projectInfo)
    });
    console.log("This is the projectInfo ==> ", projectInfo);
    setShowForm(false);
    setAddedAProject(true);
    setLoading(false);
  };

  return (
    <div style={{ height: "200px", width: "200px" }}>
      <Form onSubmit={onSubmitter}>
        <Form.Field>
          <Label>
            Project Name
            <Input
              onChange={(e: any) => setProjectName(e.target.value)}
              placeholder="Please enter project name ..."
            />
          </Label>
        </Form.Field>
        <Form.Field>
          <Button loading={loading} type="submit">
            Create project
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
};
