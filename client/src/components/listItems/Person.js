import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdatePerson from "../forms/UpdatePerson";
import RemovePerson from "../buttons/RemovePerson";
import AddCar from "../forms/AddCar";
import Cars from "../lists/Cars";
import SubTitle from "../layout/SubTitle";
import { Link } from "react-router-dom";

const getStyles = () => ({
  card: {
    maxWidth: "100%",
    border: "2px solid black",
  },
});

const Person = (props) => {
  const styles = getStyles();

  const [id] = useState(props.id);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);

  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} firstName={firstName} lastName={lastName} />,
          ]}
        >
          <SubTitle text={`${firstName} ${lastName}`} />
          <AddCar />
          <Cars personId={props.id} />
          <Link to={`/people/${props.id}`}>Learn More</Link>
        </Card>
      )}
    </div>
  );
};

export default Person;
