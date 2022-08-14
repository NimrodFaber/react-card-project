import { useFormik } from "formik";
import { useState } from "react";
import PageHeader from "../common/PageHeader";
import joi from "joi";
import Input from "./Input";
import { createUser } from "../services/usersService";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import validateWithJoi from "./utils/formik_joi_validate.js";

function SignUpBiz({ redirect }) {
  const { user, logIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: validateWithJoi({
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required(),
      name: joi.string().min(2).required(),
      password: joi.string().min(6).required(),
    }),

    async onSubmit(values) {
      try {
        await createUser({ ...values, biz: true });
        await logIn({ email: values.email, password: values.password });
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
      <div className="container mx-auto" style={{ backgroundColor: "#c3eedb" }}>
        <PageHeader
          title="sign up now biz man"
          discription="its free"
        ></PageHeader>
        <form noValidate autoComplete="off" onSubmit={form.handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          <Input
            name="name"
            label="name"
            type="text"
            {...form.getFieldProps("name")}
            error={form.touched.name && form.errors.name}
          ></Input>
          <Input
            name="email"
            label="email"
            type="email"
            {...form.getFieldProps("email")}
            error={form.touched.email && form.errors.email}
          ></Input>
          <Input
            name="password"
            label="password"
            type="password"
            {...form.getFieldProps("password")}
            error={form.touched.password && form.errors.password}
          ></Input>
          <div className="my-2">
            <button className="btn btn-success" type="submit">
              SignUp
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUpBiz;
