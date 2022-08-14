import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validateWithJoi from "./utils/formik_joi_validate";
import Joi from "joi";
import { createCard } from "../services/cardsService";
import Input from "./Input";
import PageHeader from "../common/PageHeader";
function CreateCard() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    validate: validateWithJoi({
      bizName: Joi.string().min(2).max(255).required().label("Name"),
      bizDescription: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label("Description"),
      bizAddress: Joi.string().min(2).max(400).required().label("Address"),
      bizPhone: Joi.string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/)
        .label("Phone"),
      bizImage: Joi.string().min(11).max(1024).uri().allow("").label("Image"),
    }),
    async onSubmit(values) {
      try {
        const { bizImage, ...body } = values;
        if (bizImage) {
          body.bizImage = bizImage;
        }
        console.log(body);
        await createCard(body);

        navigate("/my-cards");
      } catch ({ response }) {
        if (response.status === 400) {
          setError(response.data);
        }
      }
    },
  });
  return (
    <>
      <div
        className="container text-center   mx-auto"
        style={{ backgroundColor: "#c3eedb" }}
      >
        <PageHeader title="Create Card" description="Create Card" />
        <form autoComplete="off" noValidate onSubmit={form.handleSubmit}>
          {error && <div className="alert alert-danger ">{error}</div>}
          <Input
            name="bizName"
            label="bizName"
            {...form.getFieldProps("bizName")}
            error={form.touched.bizName && form.errors.bizName}
          />
          <Input
            name="bizDescription"
            label="bizDescription"
            {...form.getFieldProps("bizDescription")}
            error={form.touched.bizDescription && form.errors.bizDescription}
          />
          <Input
            name="bizAddress"
            label="bizAddress"
            {...form.getFieldProps("bizAddress")}
            error={form.touched.bizAddress && form.errors.bizAddress}
          />
          <Input
            name="bizPhone"
            label="bizPhone"
            {...form.getFieldProps("bizPhone")}
            error={form.touched.bizPhone && form.errors.bizPhone}
          />
          <Input
            name="bizImage"
            label="bizImage"
            {...form.getFieldProps("bizImage")}
            error={form.touched.bizImage && form.errors.bizImage}
          />
          <div className="my-2">
            <button
              disabled={!form.isValid}
              className="btn btn-success"
              type="submit"
            >
              Create Card
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateCard;
