import React, { useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import CustomInputField from "@/component/customInput.component";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAxios from "@/hook/useAxios.hook";
import { useNavigate, useLocation } from "react-router-dom";
import { RoutePath, HttpMethod } from "@/enum";

const ResetPassword = () => {
  const navigate = useNavigate();
  const resetApi = useAxios();
  const { state } = useLocation();
  const email = state?.email;
  const { fetchData, response } = resetApi;

  const formik = useFormik({
    initialValues: { otp: "", newPassword: "" },
    validationSchema: Yup.object({
      otp: Yup.string().required("OTP is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
    }),
    onSubmit: async (values) => {
      if (!email) {
        alert("Email missing, please try again.");
        return;
      }
      await fetchData({
        url: "reset-password",
        method: HttpMethod.POST,
        data: { ...values, email },
      });
    },
  });

  useEffect(() => {
    if (response) {
      navigate(RoutePath.LOGIN);
    }
  }, [response, navigate]);

  return (
    <Card className="shadow-sm p-4">
      <Card.Body>
        <h3 className="text-center mb-4">Reset Password</h3>

        <Form onSubmit={formik.handleSubmit}>
          <CustomInputField
            name="otp"
            label="Enter OTP"
            placeholder="Enter the 6-digit OTP"
            type="text"
            value={formik.values.otp}
            onChange={formik.handleChange}
          />

          <CustomInputField
            name="newPassword"
            label="New Password"
            placeholder="Enter your new password"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
          />

          <div className="d-grid">
            <Button variant="primary" type="submit" disabled={resetApi.loading}>
              {resetApi.loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
