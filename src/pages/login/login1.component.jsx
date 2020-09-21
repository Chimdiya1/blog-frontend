import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';
// import './styles.css';
// import './styles-custom.css';

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};


// And now we can use these
const LogIn1 = () => {
  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email addresss`')
            .required('Required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await new Promise((r) => setTimeout(r, 500));
          setSubmitting(false);
        }}
      >
        <Form>
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@somewhere.com"
          />
          <MyTextInput
            label="Password"
            name="password"
            type="password"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default LogIn1;