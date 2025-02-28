import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../style/UserRegistration.css';

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
    .required("Confirm Password is required."),
});

const UserSignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5001/users/register', data);

      if (response.status === 201) {
        alert('Signup successful!');
        reset(); // Reset form fields after successful submission
        navigate('/userlogin'); // Redirect to login page
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="main">
      <div className="wrap">
        <div className="content">
          <div id="form" className="content">
            <h1>Sign Up as a User</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name */}
              <div className="input-wrapper">
                <input type="text" placeholder="Full Name" {...register('fullName')} />
                {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
              </div>

              {/* Address */}
              <div className="input-wrapper">
                <input type="text" placeholder="Address" {...register('address')} />
                {errors.address && <p className="error-message">{errors.address.message}</p>}
              </div>

              {/* Email */}
              <div className="input-wrapper">
                <input type="email" placeholder="Email" {...register('email')} />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
              </div>

              {/* Contact */}
              <div className="input-wrapper">
                <input type="text" placeholder="Contact" {...register('contact')} />
                {errors.contact && <p className="error-message">{errors.contact.message}</p>}
              </div>

              {/* Password */}
              <div className="input-wrapper">
                <input type="password" placeholder="Password" {...register('password')} />
                {errors.password && <p className="error-message">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div className="input-wrapper">
                <input type="password" placeholder="Confirm Password" {...register('confirmPassword')} />
                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
