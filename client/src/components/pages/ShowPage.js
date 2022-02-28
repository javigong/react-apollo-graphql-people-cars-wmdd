import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PERSON_WITH_CARS } from "../../queries";
import Title from "../layout/Title";
import ShowPerson from "../lists/ShowPerson";

const ShowPage = () => {
  let { id } = useParams();

  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { id: id },
  });
  console.log(data);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="App">
      <Title text="People & Cars 🚗" />
      <ShowPerson data={data} />
    </div>
  );
};

export default ShowPage;
