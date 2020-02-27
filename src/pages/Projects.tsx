import React, { useState, useEffect } from "react";
import { Segment, Card, Grid } from "semantic-ui-react";

export const Projects: React.FC = () => {
  const [allProject, setAllProject] = useState();
  const [loading, setLoading] = useState(false);

  const getAllProjects = async () => {
    setLoading(true);
    await fetch("/all-user-projects")
      .then(res => res.json())
      .then(data => setAllProject(data));
    setLoading(false);
  };

  console.log("allProject ==> ", allProject);

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="companylists">
      <h3>All your Projects you've created:</h3>
      <Segment textAlign="center">
        <Grid textAlign="center">
          {(allProject || []).length > 0
            ? (allProject || []).map(
                (project: {
                  project_id: number;
                  user_id: number;
                  company_id: number;
                  project_name: string;
                  date_create: string;
                }) => (
                  <Grid.Column width={6} key={project.project_id}>
                    <Card>
                      <Card.Content
                        header={project.project_name}
                        href={`/project-tickets/${project.project_name}/${project.project_id}/${project.company_id}`}
                      />
                      <Card.Content
                        description={`created on: ${project.date_create}`}
                      />
                    </Card>
                  </Grid.Column>
                )
              )
            : "You do not have any projects created ..."}
        </Grid>
      </Segment>
    </div>
  );
};
