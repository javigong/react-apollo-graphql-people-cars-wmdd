import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { GET_PEOPLE, UPDATE_CAR } from "../../queries";

const UpdateCar = (props) => {
  const { Option } = Select;
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [make, setMake] = useState(props.make);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(props.price);
  const [personId, setPersonId] = useState(props.personId);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [updateCar] = useMutation(UPDATE_CAR);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error1 ${error.message}`;

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateCar: {
          __type: "Car",
          id,
          year,
          make,
          model,
          price,
          personId,
        },
      },
    });
    props.onButtonClick();
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
    <Form
      form={form}
      name="update-car-form"
      onFinish={onFinish}
      layout="inline"
      size="large"
      initialValues={{
        year: year,
        make: make,
        model: model,
        price: price,
        personId: personId,
      }}
    >
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please input car year" }]}
      >
        <InputNumber
          placeholder="Year"
          onChange={(e) => updateStateVariable("year", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please input car make" }]}
      >
        <Input
          placeholder="Make"
          onChange={(e) => updateStateVariable("make", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please input car model" }]}
      >
        <Input
          placeholder="Model"
          onChange={(e) => updateStateVariable("model", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input car model" }]}
      >
        <InputNumber
          min={0}
          placeholder="Price"
          step={0.01}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          onChange={(e) => updateStateVariable("price", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="personId"
        rules={[{ required: true, message: "Please select car owner" }]}
      >
        <Select
          placeholder="Car Owner"
          onChange={(e) => updateStateVariable("personId", e.target.value)}
        >
          {data.people.map(({ id, firstName, lastName }) => (
            <Option key={id} value={id}>
              {firstName} {lastName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("price") &&
                !form.isFieldTouched("personId")) ||
              form.getFieldError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
