import { useQuery } from "@apollo/client";
import { List } from "antd";
import { GET_PEOPLE } from "../../queries";
import Person from "../listItems/Person";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const People = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error1 ${error.message}`;

  return (
    <List grid={{ gutter: 20, columns: 1 }} styles={styles.list}>
      {data.people.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <Person key={id} id={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))}
    </List>
  );
};

export default People;
