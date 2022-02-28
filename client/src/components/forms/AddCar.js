import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../queries";

const AddCar = () => {
  const { Option } = Select;
  const [id] = useState(uuidv4());
  const [addCar] = useMutation(ADD_CAR);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error1 ${error.message}`;

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    addCar({
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
        addCar: {
          __type: "Car",
          id,
          year,
          make,
          model,
          price,
          personId,
        },
      },
      update: (proxy, { data: { addCar } }) => {
        const data = proxy.readQuery({ query: GET_CARS });
        proxy.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
  };

  return (
    data.people.length > 0 && (
      <>
        <Form
          form={form}
          name="add-car-form"
          onFinish={onFinish}
          layout="inline"
          size="large"
          style={{ marginBottom: "40px" }}
        >
          <Form.Item
            name="year"
            rules={[{ required: true, message: "Please input car year" }]}
          >
            <InputNumber placeholder="Year" />
          </Form.Item>

          <Form.Item
            name="make"
            rules={[{ required: true, message: "Please input car make" }]}
          >
            <Input placeholder="Make" />
          </Form.Item>

          <Form.Item
            name="model"
            rules={[{ required: true, message: "Please input car model" }]}
          >
            <Input placeholder="Model" />
          </Form.Item>

          <Form.Item
            name="price"
            rules={[{ required: true, message: "Please input car price" }]}
          >
            <InputNumber
              min={0}
              placeholder="Price"
              step={0.01}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="personId"
            rules={[{ required: true, message: "Please select car owner" }]}
          >
            <Select placeholder="Car Owner">
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
                  !form.isFieldsTouched(true) ||
                  form.getFieldError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Add Car
              </Button>
            )}
          </Form.Item>
        </Form>
      </>
    )
  );
};

export default AddCar;
