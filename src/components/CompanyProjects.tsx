import React, { FC, useState, useEffect } from "react";
import { Grid, Button, Icon, Card } from "semantic-ui-react";
import { useRouteMatch } from "react-router";
import { ProjectForm } from "./ProjectForm";

export const CompanyProjects: FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [userCompProjects, setUserCompProjects] = useState();
  const [loaded, setLoaded] = useState(false);
  const [addedAProject, setAddedAProject] = useState(false);
  const [clicked, setClicked] = useState(false);

  const match = useRouteMatch<{ companyName: string; companyID: string }>(
    "/company-projects/:companyName?/:companyID?"
  );
  const companyName = match?.params.companyName;
  const companyID = match?.params.companyID;

  const onClicker = () => {
    console.log("comp ID ==> ", +(match?.params.companyID || 0));
    if (!showForm) return setShowForm(true);
    return setShowForm(false);
  };

  const removeProject = async (projectID: number) => {
    setClicked(true);
    await fetch(`/remove-project/${projectID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    setClicked(false);
  };

  const toggleForm = (
    addProject: (value: boolean) => void,
    setform: (value: boolean) => void,
    companyID: number
  ) => {
    if (showForm)
      return (
        <ProjectForm
          setAddedAProject={addProject}
          setShowForm={setform}
          companyID={companyID}
        />
      );
    if (!showForm) return "";
  };

  const getUserProjects = async () => {
    setLoaded(false);
    await fetch(`/get-user-projects/${companyID}`)
      .then(res => res.json())
      .then(data => setUserCompProjects(data));
    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded) {
      getUserProjects();
    }
    console.log("userCompProjects ==> ", userCompProjects);
  }, [loaded]);

  useEffect(() => {
    getUserProjects();
  }, [addedAProject, clicked]);

  // if (!loaded) return <div>Loading ...</div>;

  return (
    <div className="companylists">
      <Grid columns={2}>
        <Grid.Column width={13}>
          <h3>{companyName} Projects:</h3>
          {(userCompProjects || []).length > 0
            ? (userCompProjects || []).map(
                (project: {
                  project_id: number;
                  user_id: number;
                  company_id: number;
                  project_name: string;
                  date_create: string;
                }) => (
                  <Card key={project.project_id}>
                    <Card.Content
                      textAlign="center"
                      header={project.project_name}
                      href={`/project-tickets/${project.project_name}/${project.project_id}/${companyID}`}
                    />
                    <Button onClick={() => removeProject(project.project_id)}>
                      Remove
                    </Button>
                  </Card>
                )
              )
            : "There's no projects for this company ..."}
        </Grid.Column>
        <Grid.Column width={3}>
          <Button
            onClick={onClicker}
            inverted
            color="orange"
            size="tiny"
            style={{ padding: "10px", margin: "5px" }}
          >
            Create a new projects
            <Icon color="black" name="plus" style={{ margin: "5px" }} />
          </Button>
          {toggleForm(
            setAddedAProject,
            setShowForm,
            +(match?.params.companyID || 0)
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};

//   const removeTicket = async (ticket_id: string) => {
//     setAddedATicket(false);
//     await fetch(`/remove-ticket/${ticket_id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });
//     setAddedATicket(true);
//   };

//   const onClicker = () => {
//     if (!showForm) return setShowForm(true);
//     return setShowForm(false);
//   };
//

//   const fetchCompanyTickets = async () => {
//     await fetch(`/users-company-tickets/${companyID}`)
//       .then(res => res.json())
//       .then(data => setUserCompTickets(data));
//     setLoaded(true);
//   };

//   useEffect(() => {
//     fetchCompanyTickets();
//   }, [addedATicket, clicked]);

//   if (!loaded) {
//     return <p>Loading company data...</p>;
//   }

//   return (

//   );
// };
//
