import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { UPDATE_PERSON } from "../../queries";

const UpdatePerson = (props) => {
  const [id] = useState(props.id);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [updatePerson] = useMutation(UPDATE_PERSON);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    updatePerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      optimisticResponse: {
        __typename: "Mutation",
        updatePerson: {
          __type: "Person",
          id,
          firstName,
          lastName,
        },
      },
    });
    props.onButtonClick();
  };

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value);

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
    <Form
      form={form}
      name="update-person-form"
      onFinish={onFinish}
      layout="inline"
      size="large"
      initialValues={{ firstName: firstName, lastName: lastName }}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please input the first name" }]}
      >
        <Input
          placeholder="i.e. John"
          onChange={(e) => updateStateVariable("firstName", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please input the last name" }]}
      >
        <Input
          placeholder="i.e. Smith"
          onChange={(e) => updateStateVariable("lastName", e.target.value)}
        />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("firstName") &&
                !form.isFieldTouched("lastName")) ||
              form.getFieldError().filter(({ errors }) => errors.length).length
            }
          >
            Update Person
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdatePerson;
