// app/register/page.js
'use client'; // This directive is essential for using hooks in Next.js App Router

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegisterPage = () => {
  // Formik hook to manage form state, validation, and submission
  const formik = useFormik({
    // Initial values for the form fields
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'Patient', // Default role
      username: '',
      password: '',
      confirmPassword: '',
    },

    // Yup validation schema to define rules for each field
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('First name is required'),
      lastName: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Last name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, 'Must be at least 10 digits')
        .max(15, 'Must be 15 digits or less')
        .required('Phone number is required'),
      role: Yup.string()
        .oneOf(['SuperAdmin', 'Admin', 'Doctor', 'Patient'], 'Invalid role selected')
        .required('Role is required'),
      username: Yup.string()
        .min(4, 'Username must be at least 4 characters')
        .required('Username is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirming your password is required'),
    }),

    // Submission handler
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // The form is now submitting
        setSubmitting(true);

        // Make the API call to your backend
        const response = await axios.post("http://localhost:8080/register", values);

        // On successful registration
        if (response.status === 200 || response.status === 201) {
          alert('Successfully Registered');
          resetForm(); // Reset the form to initial values
        }
      } catch (error) {
        // Log the error for debugging
        console.error('Registration failed:', error.response?.data || error.message);
        
        // Display a generic error message to the user
        alert('Registration failed. Please check the details and try again.');

        // Optionally, if your backend sends specific field errors, you can set them
        // For example, if the API returns { errors: { email: "Email already exists" } }
        if (error.response && error.response.data && error.response.data.errors) {
            setErrors(error.response.data.errors);
        }

      } finally {
        // This will run regardless of success or failure
        // Set submitting to false to re-enable the button
        setSubmitting(false);
      }
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Register</h1>
          <p className="text-gray-500">Create an account for the Clinic Management System</p>
        </div>
        
        <form onSubmit={formik.handleSubmit} noValidate>
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* First Name */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                className={`shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : ''}`}
                {...formik.getFieldProps('firstName')}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <p className="text-red-500 text-xs italic mt-1">{formik.errors.firstName}</p>
              ) : null}
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                className={`shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : ''}`}
                {...formik.getFieldProps('lastName')}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <p className="text-red-500 text-xs italic mt-1">{formik.errors.lastName}</p>
              ) : null}
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className={`shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-xs italic mt-1">{formik.errors.email}</p>
            ) : null}
          </div>

          {/* Phone and Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className={`shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''}`}
                {...formik.getFieldProps('phone')}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <p className="text-red-500 text-xs italic mt-1">{formik.errors.phone}</p>
              ) : null}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                className={`shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.role && formik.errors.role ? 'border-red-500' : ''}`}
                {...formik.getFieldProps('role')}
              >
                {/* Updated to include all roles from validation */}
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
                <option value="Admin">Admin</option>
                <option value="SuperAdmin">Super Admin</option>
              </select>
              {formik.touched.role && formik.errors.role ? (
                <p className="text-red-500 text-xs italic mt-1">{formik.errors.role}</p>
              ) : null}
            </div>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className={`shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.username && formik.errors.username ? 'border-red-500' : ''}`}
              {...formik.getFieldProps('username')}
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="text-red-500 text-xs italic mt-1">{formik.errors.username}</p>
            ) : null}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-xs italic mt-1">{formik.errors.password}</p>
            ) : null}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={`shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''}`}
              {...formik.getFieldProps('confirmPassword')}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="text-red-500 text-xs italic mt-1">{formik.errors.confirmPassword}</p>
            ) : null}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out disabled:bg-blue-400 disabled:cursor-not-allowed"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;