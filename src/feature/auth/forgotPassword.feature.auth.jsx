import React, { useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import CustomInputField from "@/component/customInput.component";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAxios from "@/hook/useAxios.hook";
import { useNavigate } from "react-router-dom";
import { RoutePath, HttpMethod } from "@/enum";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const forgotApi = useAxios();
  const { fetchData, response } = forgotApi;

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      await fetchData({
        url: "forgot-password",
        method: HttpMethod.POST,
        data: values,
      });
    },
  });

  useEffect(() => {
    if (response) {
      navigate(RoutePath.RESET_PASSWORD, {
        state: { email: formik.values.email },
      });
    }
  }, [response, navigate, formik.values.email]);

  return (
    <Card className="shadow-sm p-4">
      <Card.Body>
        <h3 className="text-center mb-4">Forgot Password</h3>

        <Form onSubmit={formik.handleSubmit}>
          <CustomInputField
            name="email"
            label="Email"
            placeholder="Enter your registered email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          <div className="d-grid">
            <Button
              variant="primary"
              type="submit"
              disabled={forgotApi.loading}
            >
              {forgotApi.loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </div>
        </Form>

        <p className="text-center mt-3 mb-0">
          <a href={RoutePath.LOGIN} className="text-decoration-none">
            Back to Login
          </a>
        </p>
      </Card.Body>
    </Card>
  );
};

export default ForgotPassword;
