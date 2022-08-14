import { useFormik } from "formik";
import { useState } from "react";
import validateWithJoi from "././utils/formik_joi_validate";
import Joi from "joi";
import Input from "./Input";
import { updateCard } from "../services/cardsService";
function EditCard({ card, editCard }) {
  const [error, setError] = useState("");
  const form = useFormik({
    enableReinitialize: true,

    initialValues: {
      bizName: card.bizName,
      bizDescription: card.bizDescription,
      bizAddress: card.bizAddress,
      bizPhone: card.bizPhone,
      bizImage: card.bizImage,
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
    onSubmit(values) {
      try {
        editCard(card._id, values);
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
        class="modal fade"
        id="editmodal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
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
                  error={
                    form.touched.bizDescription && form.errors.bizDescription
                  }
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
                    data-bs-dismiss="modal"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditCard;
