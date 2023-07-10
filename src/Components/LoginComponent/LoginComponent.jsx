import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postBackend } from "../../Utilities/apiCalls";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useUser } from "../../Shared/js/user-context";
import Swal from "sweetalert2";
import Login from "../../Shared/images/login.svg";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});
function LoginComponent() {
  const { dispatch } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="container centered">
      <div className="row justify-content-center">
        <div className="col-12 col-md-5">
          <div className="card">
            <div className="card-body">
              <div className="twelve card-title">
                <h1>Log In</h1>
              </div>
              <div className="img mx-auto my-2">
                <img src={Login} alt="login" />
              </div>
              <Formik
                initialValues={{
                  password: "",
                  email: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                  setLoading(true);
                  postBackend({
                    url: `signin`,
                    data: {
                      email: values.email,
                      password: values.password,
                    },
                  })
                    .then((res) => res.data)
                    .then((res) => {
                      setLoading(false);
                      dispatch({ type: "login", user: res.user });
                      localStorage.setItem("token", res.token);
                      if (res.user.role === "admin") navigate("/manage");
                      else
                        res.user.genres.length
                          ? navigate("/")
                          : navigate("/genres");
                    })
                    .catch((err) => {
                      console.log(err);
                      Swal.fire({
                        title: "Error",
                        text: `Incorrect username or password`,
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
                          errors.email && touched.email
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="email"
                        name="email"
                        placeholder="example@email.com"
                        autoFocus
                      />
                      <label htmlFor="email">Email</label>
                      <div className="error">
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        className={
                          errors.password && touched.password
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="password"
                      />
                      <label htmlFor="password">Password</label>
                      <div className="error">
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                    <div className="d-grid gap-2">
                      <button type="submit" className="button button1 mb-3">
                        <i className="fa fa-sign-in"></i>{" "}
                        {!loading ? "Log in" : "Logging In"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer text-muted text-center link">
              Not registered? <Link to="/register">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
