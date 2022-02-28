import { useQuery } from "@apollo/client";
import { List } from "antd";
import { GET_CARS } from "../../queries";
import Car from "../listItems/Car";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Cars = (props) => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_CARS);
  if (loading) return "Loading...";
  if (error) return `Error1 ${error.message}`;

  const personIdCars = data.cars.filter((car) => car.personId === props.personId);

  return (
    <List grid={{ gutter: 20, columns: 1 }} styles={styles.list}>
      {personIdCars.map(({ id, year, make, model, price, personId }) => (
        <List.Item key={id}>
          <Car
            key={id}
            id={id}
            year={year}
            make={make}
            model={model}
            price={price}
            personId={personId}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default Cars;
