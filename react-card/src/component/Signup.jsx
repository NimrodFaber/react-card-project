import { useFormik } from "formik";
import PageHeader from "../common/PageHeader";
import Input from "./Input";
import Joi from "joi";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import validateWithJoi from "./utils/formik_joi_validate.js";
import { useAuth } from "../context/auth-context";

function Signup({ redirect }) {
  const { createUser, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const form = useFormik({
    validateOnMount: true,
    initialValues: { email: "", password: "", name: "" },
    validate: validateWithJoi({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      name: Joi.string().min(2).required(),
      password: Joi.string().min(6).required(),
    }),

    async onSubmit(values) {
      try {
        await createUser({ ...values, biz: false });
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
      <div
        className="container    mx-auto"
        style={{ backgroundColor: "#c3eedb" }}
      >
        <PageHeader
          title="Sign-UP"
          description="plz sign up now its for free"
        ></PageHeader>

        <form noValidate autoComplete="off" onSubmit={form.handleSubmit}>
          {error && <div className="alert alert-danger ">{error}</div>}

          <Input
            name="name"
            label="name"
            type="text"
            {...form.getFieldProps("name")}
            error={form.touched.name && form.errors.name}
          />
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
            <button className="btn btn-success">SignUp</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
