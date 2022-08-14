import { useFormik } from "formik";
import PageHeader from "../common/PageHeader";
import Input from "./Input";
import Joi from "joi";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import validateWithJoi from "./utils/formik_joi_validate.js";
import { useAuth } from "../context/auth-context";

function Signin({ redirect }) {
  const { logIn, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      password: "",
      email: "",
    },
    validate: validateWithJoi({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(6).required(),
    }),
    async onSubmit(values) {
      try {
        await logIn(values);
        if (redirect) {
          navigate(redirect);
        }
      } catch ({ response }) {
        if (response.status === 400) {
          setError(response.data);
        }
      }
    },
  });
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {" "}
      <div
        className="container    mx-auto"
        style={{ backgroundColor: "#c3eedb" }}
      >
        <PageHeader title="Sign-In" description=""></PageHeader>

        <form noValidate autoComplete="off" onSubmit={form.handleSubmit}>
          {error && <div className="alert alert-danger ">{error}</div>}

          <Input
            name="email"
            label="email"
            {...form.getFieldProps("email")}
            error={form.touched.email && form.errors.email}
          />
          <Input
            name="password"
            label="password"
            {...form.getFieldProps("password")}
            error={form.touched.password && form.errors.password}
          />

          <div>
            <button className="btn btn-success">SignIn</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signin;
