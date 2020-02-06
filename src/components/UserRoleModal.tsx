import React, { FC, useState } from "react";
import { Modal, Grid, Radio, Form, Button } from "semantic-ui-react";

type UserRoleModalProps = {
  loggedIn: any;
  setLoggedIN: any;
  open: any;
  setOpen: any;
};

const UserRoleModal: FC<UserRoleModalProps> = ({
  loggedIn,
  setLoggedIN,
  open,
  setOpen
}) => {
  const [selection, setSelection] = useState("Freelancer");
  const changeSelection = (e: any, a: any) => setSelection(a.value);

  const updateUser = (userRole: string) => {
    fetch(`/update-user-role/${userRole}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    });
    setLoggedIN({
      ...loggedIn,
      UserRole: userRole
    });
  };

  return (
    <Modal
      dimmer
      open={open}
      centered={true}
      size="tiny"
      style={{ height: "300px", marginLeft: "30%", marginTop: "10%" }}
    >
      <Modal.Header>Select your role:</Modal.Header>
      <Modal.Content>
        <Grid centered={true}>
          <Grid.Row>
            <Form
              onSubmit={e => {
                e.preventDefault();
                updateUser(selection);
                setOpen(false);
              }}
            >
              <Button type="submit">Save</Button>
              {[
                "Freelancer",
                "Developer",
                "Project Manager",
                "Account Manager",
                "Admin"
              ].map(role => (
                <Form.Field key={role}>
                  <Form.Radio
                    radio
                    label={role}
                    value={role}
                    name="position"
                    checked={selection == role}
                    onClick={changeSelection}
                  />
                </Form.Field>
              ))}
            </Form>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  );
};

export default UserRoleModal;
