import React, { useState, useEffect } from "react";
import { Button, Icon, Grid, Card } from "semantic-ui-react";
import { CompanyForm } from "./CompanyForm";

export const Companies: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [companies, setCompanies] = useState();
  const [loaded, setLoaded] = useState(false);

  const onClicker = () => {
    if (!showForm) return setShowForm(true);
    return setShowForm(false);
  };

  const getCompanies = async () => {
    await fetch("users-companies")
      .then(res => res.json())
      .then(data => setCompanies(data));
    setLoaded(true);
  };

  useEffect(() => {
    getCompanies();
  }, [companies]);

  if (!loaded) {
    return <p>Loading companies...</p>;
  }

  return (
    <div className="companylists">
      <Grid columns={2}>
        <Grid.Column>
          <h3>
            Companies
            <Button
              onClick={onClicker}
              inverted
              color="orange"
              size="small"
              style={{ padding: "10px", margin: "5px" }}
            >
              Add a company
              <Icon name="plus" color="black" style={{ margin: "5px" }} />
            </Button>
          </h3>
          {showForm ? <CompanyForm setShowForm={setShowForm} /> : ""}
        </Grid.Column>
        <Grid.Column>
          {(companies || []).map(
            (comp: {
              company_name: string;
              company_id: number;
              user_id: number;
            }) => (
              <Card
                href={`/company-tickets/${comp.company_name}/${comp.company_id}`}
                key={comp.company_id}
              >
                <Card.Content textAlign="center" header={comp.company_name} />
                <Card.Content textAlign="center">
                  <Button>Remove</Button>
                </Card.Content>
              </Card>
            )
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};