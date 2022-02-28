
import { Divider } from "antd";
import AddCar from "../forms/AddCar";
import AddPerson from "../forms/AddPerson";
import Title from "../layout/Title";
import People from "../lists/People";

const HomePage = () => {
  return (
    <div className="App">
      <Title text="People & Cars 🚗" />
      <AddPerson />
      <AddCar />
      <Divider />
      <People />
    </div>
  );
};

export default HomePage;
