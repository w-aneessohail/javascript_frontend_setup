"use client";

import { useEffect, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import CustomInputField from "@/component/customInput.component";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAxios from "@/hook/useAxios.hook";
import { useNavigate } from "react-router-dom";
import { RoutePath, HttpMethod } from "@/enum";
import { UserRole } from "@/enum/userRole.enum";
import { useAuth } from "@/context/auth.context";

const LoginFeature = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const loginApi = useAxios();
  const { fetchData, error, loading, response } = loginApi;
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (response && response.user) {
      const userData = response.user;
      setUser(userData);
      setRedirecting(true);

      const redirectTimer = setTimeout(() => {
        if (userData.role === UserRole.ATTENDEE) {
          navigate(RoutePath.HOME);
        } else if (userData.role === UserRole.ORGANIZER) {
          navigate(RoutePath.ORGANIZER_DASHBOARD);
        } else if (userData.role === UserRole.ADMIN) {
          navigate(RoutePath.ADMIN_DASHBOARD);
        } else {
          navigate(RoutePath.HOME);
        }
      }, 100);

      return () => clearTimeout(redirectTimer);
    }
  }, [response, navigate, setUser]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      console.log("[v0] Submitting login with credentials:", values.email);
      await fetchData({
        url: "/login",
        method: HttpMethod.POST,
        data: values,
      });
    },
  });

  return (
    <Card className="shadow-sm p-4">
      <Card.Body>
        <h3 className="text-center mb-4">Login Account</h3>

        {error && (
          <Alert variant="danger" className="text-center">
            {typeof error === "string"
              ? error
              : error.message || "Login failed"}
          </Alert>
        )}

        {redirecting && (
          <Alert variant="info" className="text-center">
            Login successful! Redirecting...
          </Alert>
        )}

        <Form onSubmit={formik.handleSubmit}>
          <CustomInputField
            name="email"
            label="Email"
            placeholder="Enter email address"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={redirecting}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger small">{formik.errors.email}</div>
          )}

          <CustomInputField
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={redirecting}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-danger small">{formik.errors.password}</div>
          )}

          <div className="text-end mb-3">
            <a
              href={RoutePath.FORGOT_PASSWORD}
              className="text-decoration-none small"
            >
              Forgot Password?
            </a>
          </div>

          <div className="d-grid">
            <Button
              variant="primary"
              type="submit"
              disabled={loading || redirecting}
            >
              {redirecting
                ? "Redirecting..."
                : loading
                ? "Logging in..."
                : "Login"}
            </Button>
          </div>
        </Form>

        <p className="text-center mt-3 mb-0">
          Don't have an account?{" "}
          <a href={RoutePath.REGISTER} className="text-decoration-none">
            Signup
          </a>
        </p>
      </Card.Body>
    </Card>
  );
};

export default LoginFeature;
