import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../styles/LoginForm.scss";
import { Button } from "react-bootstrap";
import AlertMessage from "./AlertMessage";

type Props = {};
const LoginForm = (props: Props) => {
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        "https://technical-task-api.icapgroupgmbh.com/api/login/",
        {
          username: values.username,
          password: values.password,
        }
      );
      if (response.status === 200) {
        window.location.href = "/table";
      } else {
        setError("Incorrect username or password");
      }
    } catch (error) {
      setError("An error occurred while processing your request");
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={onSubmit}
    >
      <Form>
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <Field
            type="text"
            id="username"
            name="username"
            className="form-control"
            placeholder="Username"
          />
          <ErrorMessage name="username" component="div" className="error" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <Field
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Password"
          />
          <ErrorMessage name="password" component="div" className="error" />
        </div>
        <Button type="submit" className="btn btn-primary">
          Sign In
        </Button>
        {error && <AlertMessage error={error} setError={setError} />}
      </Form>
    </Formik>
  );
};

export default LoginForm;
