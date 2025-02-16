import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import '../style/UserRegistration.css'

// Define validation schema using Yup
const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required."),
  address: yup.string().required("Address is required."),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required."),
  contact: yup
    .string()
    .matches(/^[0-9]{10}$/, "Contact must be a 10-digit number.")
    .required("Contact is required."),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .matches(/[A-Za-z]/, "Password must contain at least one letter.")
    .matches(/\d/, "Password must contain at least one number.")
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords must match.")
    .required("Confirm Password is required.")
});

const UserSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log('User Data:', data);
    alert('Signup successful!');
  };

  return (
    <div className="main">
      <div className="wrap">
        <div className="content">
          <div id="form" className="content">
            <h1>SignUp as a User</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name */}
              <div className="input-wrapper">
                <input
                  type="text"
                  id="fullName"
                  placeholder="Full Name"
                  {...register('fullName')}
                />
                {errors.fullName && (
                  <p className="error-message">{errors.fullName.message}</p>
                )}
              </div>

              {/* Address */}
              <div className="input-wrapper">
                <input
                  type="text"
                  id="address"
                  placeholder="Address"
                  {...register('address')}
                />
                {errors.address && (
                  <p className="error-message">{errors.address.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </div>

              {/* Contact */}
              <div className="input-wrapper">
                <input
                  type="text"
                  id="contact"
                  placeholder="Contact"
                  {...register('contact')}
                />
                {errors.contact && (
                  <p className="error-message">{errors.contact.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="error-message">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="input-wrapper">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="error-message">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn" id="button">
                SignUp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
