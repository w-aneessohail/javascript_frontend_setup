import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAxios from "@/hook/useAxios.hook";
import { HttpMethod, RoutePath } from "@/enum";
import { useNavigate, useLocation } from "react-router-dom";

const OtpFeature = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { response, error, loading, fetchData } = useAxios();

  const email = location.state?.email;
  if (!email) {
    navigate(RoutePath.REGISTER);
    return null;
  }

  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^\d{6}$/, "OTP must be 6 digits")
      .required("OTP is required"),
  });

  const handleSubmit = async (values) => {
    const result = await fetchData({
      method: HttpMethod.POST,
      url: "/verify-otp",
      data: { email, otp: values.otp },
    });

    if (result && !error) {
      navigate(RoutePath.LOGIN);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-5">
        <div className="card shadow-lg p-4 rounded-4">
          <h2 className="mb-3 text-center">Verify OTP</h2>
          <p className="text-center text-muted mb-4">
            We've sent an OTP to <strong>{email}</strong>
          </p>

          <Formik
            initialValues={{ otp: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group mb-3">
                  <label htmlFor="otp">Enter OTP</label>
                  <Field
                    id="otp"
                    name="otp"
                    type="text"
                    className="form-control"
                    placeholder="Enter 6-digit OTP"
                  />
                  <ErrorMessage
                    name="otp"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>

                {error && (
                  <div className="alert alert-danger">{String(error)}</div>
                )}
                {response && (
                  <div className="alert alert-success">
                    {response.message || "OTP verified! Redirecting..."}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-2"
                  disabled={isSubmitting || loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default OtpFeature;
