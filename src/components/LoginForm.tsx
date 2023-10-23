import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/App.css";

type Props = {};
const LoginForm = (props: Props) => {
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (values: any) => {
    const username = values.username;
    const password = values.password;

    if (username === "testuser" && password === "testpassword123") {
      window.location.href = "/table";
    } else {
      setError("Incorrect username or password");
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
        <div>
          <label htmlFor="username">Username:</label>
          <Field type="text" id="username" name="username" />
          <ErrorMessage name="username" component="div" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage name="password" component="div" />
        </div>
        <button type="submit">Sign In</button>
        {error && <div className="error">{error}</div>}
      </Form>
    </Formik>
  );
};

export default LoginForm;
