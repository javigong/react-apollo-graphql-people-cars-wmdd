import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdateCar from "../forms/UpdateCar";
import RemoveCar from "../buttons/RemoveCar";

const getStyles = () => ({
  card: {
    width: "100%",
  },
});

const Car = (props) => {
  const styles = getStyles();

  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [make, setMake] = useState(props.make);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(props.price);
  const [personId, setPersonId] = useState(props.personId);

  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value);

    switch (variable) {
      case "year":
        setYear(value);
        break;
      case "make":
        setMake(value);
        break;
      case "model":
        setModel(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "personId":
        setPersonId(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={props.id}
          year={props.year}
          make={props.make}
          model={props.model}
          price={props.price}
          personId={props.personId}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          type="inner"
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar
              id={id}
              year={year}
              make={make}
              model={model}
              price={price}
              personId={personId}
            />,
          ]}
        >
          {year} {make} {model} Original MSRP: ${price}
        </Card>
      )}
    </div>
  );
};

export default Car;
