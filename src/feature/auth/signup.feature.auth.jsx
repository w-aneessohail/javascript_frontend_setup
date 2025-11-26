import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { RoutePath, HttpMethod, UserRole } from "@/enum";
import useAxios from "@/hook/useAxios.hook";

const SignupFeature = () => {
  const navigate = useNavigate();
  const { error, loading, fetchData } = useAxios();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Full name is required")
      .min(2, "Name must be at least 2 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    role: Yup.string().required("Role is required"),
    organizationName: Yup.string().when("role", {
      is: UserRole.ORGANIZER,
      then: (schema) => schema.required("Organization name is required"),
    }),
    organizerName: Yup.string().when("role", {
      is: UserRole.ORGANIZER,
      then: (schema) => schema.required("Organizer name is required"),
    }),
    cnic: Yup.string().when("role", {
      is: UserRole.ORGANIZER,
      then: (schema) => schema.required("CNIC is required"),
    }),
    phone: Yup.string().when("role", {
      is: UserRole.ORGANIZER,
      then: (schema) => schema.required("Phone is required"),
    }),
    address: Yup.string().when("role", {
      is: UserRole.ORGANIZER,
      then: (schema) => schema.required("Address is required"),
    }),
  });

  const handleSubmit = async (values) => {
    let organizerDetails = null;
    if (values.role === UserRole.ORGANIZER) {
      organizerDetails = {
        organizationName: values.organizationName,
        organizerName: values.organizerName,
        cnic: values.cnic,
        phone: values.phone,
        address: values.address,
      };
    }

    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
      isVerified: false,
      organizerDetails,
    };

    const result = await fetchData({
      method: HttpMethod.POST,
      url: "/register",
      data: payload,
    });

    if (result && !error) {
      navigate("/auth/otp", { state: { email: payload.email } });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <div className="card shadow-lg p-4 rounded-4 scrollable-card">
          <h3 className="text-center mb-4">Create Account</h3>

          {error && <div className="alert alert-danger">{String(error)}</div>}
          {loading && (
            <div className="alert alert-info text-center">Registering...</div>
          )}

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              role: UserRole.ATTENDEE,
              organizationName: "",
              organizerName: "",
              cnic: "",
              phone: "",
              address: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Select Role
                  </label>
                  <Field
                    id="role"
                    name="role"
                    as="select"
                    className="form-select"
                  >
                    <option value={UserRole.ADMIN}>Admin</option>
                    <option value={UserRole.ORGANIZER}>Organizer</option>
                    <option value={UserRole.ATTENDEE}>Attendee</option>
                  </Field>
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="text-danger mt-1"
                  />
                </div>

                {values.role === UserRole.ORGANIZER && (
                  <>
                    <h5>Organizer Details</h5>
                    <div className="mb-3">
                      <label htmlFor="organizationName" className="form-label">
                        Organization Name
                      </label>
                      <Field
                        id="organizationName"
                        name="organizationName"
                        type="text"
                        className="form-control"
                        placeholder="Enter organization name"
                      />
                      <ErrorMessage
                        name="organizationName"
                        component="div"
                        className="text-danger mt-1"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="organizerName" className="form-label">
                        Organizer Name
                      </label>
                      <Field
                        id="organizerName"
                        name="organizerName"
                        type="text"
                        className="form-control"
                        placeholder="Enter organizer name"
                      />
                      <ErrorMessage
                        name="organizerName"
                        component="div"
                        className="text-danger mt-1"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="cnic" className="form-label">
                        CNIC
                      </label>
                      <Field
                        id="cnic"
                        name="cnic"
                        type="text"
                        className="form-control"
                        placeholder="35202-1234567-8"
                      />
                      <ErrorMessage
                        name="cnic"
                        component="div"
                        className="text-danger mt-1"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <Field
                        id="phone"
                        name="phone"
                        type="text"
                        className="form-control"
                        placeholder="03001234567"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-danger mt-1"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <Field
                        id="address"
                        name="address"
                        type="text"
                        className="form-control"
                        placeholder="Enter address"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-danger mt-1"
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting || loading}
                >
                  {loading ? "Submitting..." : "Sign Up"}
                </button>

                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <Link to={RoutePath.LOGIN} className="text-decoration-none">
                    Login
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignupFeature;
