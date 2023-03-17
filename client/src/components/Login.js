import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import "./Login.css";


const Login = () => (
  <Formik
    initialValues={{ username: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {

      setTimeout(() => {
        
        AuthService.login(values.username, values.password).then(
          () => {
            window.location.replace("/files");
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );

        setSubmitting(false);
      }, 500);
    }}

    validationSchema={Yup.object().shape({
      username: Yup.string()
        .required(".REQUIRED"),
      password: Yup.string()
        .required(".NO PASSWORD PROVIDED")
    })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;

      return (
        <div className="background">
          <form className="login" onSubmit={handleSubmit}>
            <label htmlFor="username">.USERNAME</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="..."
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.username && touched.username && "error"}
            />

            {errors.username && touched.username && (
              <div className="input-feedback">{errors.username}</div>
            )}

            <label htmlFor="password">.PASSWORD</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="..."
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password && "error"}
            />

            {errors.password && touched.password && (
              <div className="input-feedback">{errors.password}</div>
            )}

            <button type="submit" id="submit-login" disabled={isSubmitting}>
              .LOGIN
            </button>

            </form>
        </div>
      );
    }}
  </Formik>
);

export default Login;