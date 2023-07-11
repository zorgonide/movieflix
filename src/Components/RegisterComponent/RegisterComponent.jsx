import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postBackend } from "../../Utilities/apiCalls";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Swal from "sweetalert2";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .label("password")
    .required("Required")
    .min(8, "Seems a bit short..."),

  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   "At least 1 letter, 1 number and 1 special character"
  // ),
  confirmpassword: Yup.string()
    .required("Required")
    .label("confirmpassword")
    .test("passwords-match", "Passwords don't match", function (value) {
      return this.parent.password === value;
    }),
  firstname: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only letters allowed")
    .required("Required"), //put in number validation
  lastname: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only letters allowed")
    .required("Required"),
});

function RegisterComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="container centered">
      <div className="row justify-content-center">
        <div className="col-12 col-md-5">
          <div className="card">
            <div className="card-body">
              <div className="twelve card-title">
                <h1>Register</h1>
              </div>
              <div className="col-12">
                <Formik
                  initialValues={{
                    password: "",
                    email: "",
                    firstname: "",
                    lastname: "",
                    confirmpassword: "",
                  }}
                  validationSchema={SignUpSchema}
                  onSubmit={(values) => {
                    setLoading(true);
                    postBackend({
                      url: "user/",
                      data: {
                        firstName: values.firstname,
                        lastName: values.lastname,
                        email: values.email,
                        password: values.password,
                      },
                    })
                      .then((res) => res.data)
                      .then((res) => {
                        if (res.token) {
                          setLoading(false);
                          Swal.fire({
                            confirmButtonColor: "#e31c5f",
                            title: "Success",
                            text: `New user created`,
                            icon: "success",
                            confirmButtonText: "Log In",
                          }).then((res) => {
                            if (res.isConfirmed) navigate("/login");
                          });
                        } else throw new Error();
                      })
                      .catch(() => {
                        Swal.fire({
                          title: "Error",
                          text: `User already exists`,
                          icon: "error",
                          confirmButtonText: "Dismiss",
                        });
                      });
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="form-floating mb-3">
                        <Field
                          className={
                            touched.email && errors.email
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          id="email"
                          name="email"
                          placeholder="example@email.com"
                        />
                        <label htmlFor="email">Email</label>
                        <div className="error">
                          <ErrorMessage name="email" />
                        </div>
                      </div>
                      <div className="form-floating mb-3">
                        <Field
                          className={
                            touched.firstname && errors.firstname
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          id="firstname"
                          name="firstname"
                          placeholder="example@firstname.com"
                        />
                        <label htmlFor="firstname">First Name</label>
                        <div className="error">
                          <ErrorMessage name="firstname" />
                        </div>
                      </div>
                      <div className="form-floating mb-3">
                        <Field
                          className={
                            touched.lastname && errors.lastname
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          id="lastname"
                          name="lastname"
                          placeholder="example@lastname.com"
                        />
                        <label htmlFor="lastname">Last Name</label>
                        <div className="error">
                          <ErrorMessage name="lastname" />
                        </div>
                      </div>
                      <div className="form-floating mb-3">
                        <Field
                          className={
                            touched.password && errors.password
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          id="password"
                          type="password"
                          name="password"
                          placeholder="password"
                          autoComplete="new-password"
                        />
                        <label htmlFor="password">Password</label>
                        <div className="error">
                          <ErrorMessage name="password" />
                        </div>
                      </div>
                      <div className="form-floating mb-3">
                        <Field
                          className={
                            touched.confirmpassword && errors.confirmpassword
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          id="password-confirm"
                          type="password"
                          name="confirmpassword"
                          placeholder="confirmpassword"
                          autoComplete="new-password"
                        />
                        <label htmlFor="confirmpassword">
                          Confirm Password
                        </label>
                        <div className="error">
                          <ErrorMessage name="confirmpassword" />
                        </div>
                      </div>
                      <div className="d-grid gap-2">
                        <button type="submit" className="button button1 mb-3">
                          <i className="fa fa-user-plus"></i>{" "}
                          {!loading ? "Register" : "Registering..."}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="card-footer text-muted text-center link">
              Already registered? <Link to="/login">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterComponent;
