import { Card } from "antd";
import { Link } from "react-router-dom";
import SubTitle from "../layout/SubTitle";
import Cars from "./Cars";

const getStyles = () => ({
  card: {
    maxWidth: "100%",
    border: "2px solid black",
  },
});

const ShowPerson = ({ data }) => {
  const styles = getStyles();

  return (
    <>
      <Card style={styles.card}>
        <SubTitle
          text={`${data.personWithCars.person.firstName} ${data.personWithCars.person.lastName}`}
        />
        <Cars personId={data.personWithCars.person.id} />
        <Link to="/">Go Back Home</Link>
      </Card>
    </>
  );
};

export default ShowPerson;
