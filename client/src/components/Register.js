import React from "react";
import { Formik } from "formik";
import * as Yup from "yup"; // used when validating with a pre-built solution
import AuthService from "../services/auth.service";
import './Register.css';

const Register = () => (
  <Formik
    initialValues={{ username: "", password: "", email: "", confirmPassword: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        AuthService.register(values.username, values.email, values.password).then(
          () => {
            window.location.replace("/login");
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
        .min(6, ".MINIMUM 6 CHAR NEEDED")
        .matches(/(?=.*[0-9])/, ".MUST CONTAIN NUMBER"),
      email: Yup.string()
        .email(".EMAIL NOT VALID") 
        .required(".REQUIRED"),
      confirmPassword: Yup.string()
        .required(".NO PASSWORD PROVIDED")
        .min(6, ".MINIMUM 6 CHAR NEEDED")
        .matches(/(?=.*[0-9])/, ".MUST CONTAIN NUMBER")
        .oneOf([Yup.ref('password'), null], '.PASSWORDS MUST MATCH')
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
          <form className="register" onSubmit={handleSubmit}>

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

          <label htmlFor="email">.EMAIL</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="..."
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && "error"}
          />

          {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
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

          <label htmlFor="confirmPassword">.CONFIRM PASSWORD</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="..."
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.confirmPassword && touched.confirmPassword && "error"}
          />

          {errors.confirmPassword && touched.confirmPassword && (
            <div className="input-feedback">{errors.confirmPassword}</div>
          )}

          <button type="submit" id="submit-register" disabled={isSubmitting}>
            .SIGNUP
          </button>

          </form>
        </div>
      );
    }}
  </Formik>
);

//     if (checkBtn.current.context._errors.length === 0) {
//       AuthService.register(username, email, password).then(
//         (response) => {
//           setMessage(response.data.message);
//           setSuccessful(true);
//         },
//         (error) => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();

//           setMessage(resMessage);
//           setSuccessful(false);
//         }
//       );
//     }
//   };

//   return (
//     <div className="col-md-12">
//       <div className="card card-container">
//         <img
//           src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//           alt="profile-img"
//           className="profile-img-card"
//         />

//         <Form onSubmit={handleRegister} ref={form}>
//           {!successful && (
//             <div>
//               <div className="form-group">
//                 <label htmlFor="username">Username</label>
//                 <Input
//                   type="text"
//                   className="form-control"
//                   name="username"
//                   value={username}
//                   onChange={onChangeUsername}
//                   validations={[required, vusername]}
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <Input
//                   type="text"
//                   className="form-control"
//                   name="email"
//                   value={email}
//                   onChange={onChangeEmail}
//                   validations={[required, validEmail]}
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <Input
//                   type="password"
//                   className="form-control"
//                   name="password"
//                   value={password}
//                   onChange={onChangePassword}
//                   validations={[required, vpassword]}
//                 />
//               </div>

//               <div className="form-group">
//                 <button className="btn btn-primary btn-block">Sign Up</button>
//               </div>
//             </div>
//           )}

//           {message && (
//             <div className="form-group">
//               <div
//                 className={ successful ? "alert alert-success" : "alert alert-danger" }
//                 role="alert"
//               >
//                 {message}
//               </div>
//             </div>
//           )}
//           <CheckButton style={{ display: "none" }} ref={checkBtn} />
//         </Form>
//       </div>
//     </div>
//   );
// };

export default Register;