// app/login/page.js
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Use for redirection in App Router

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState(''); // State to hold login error messages

  const formik = useFormik({
    // Initial values for the form fields
    initialValues: {
      email: '', // This can be email or username
      password: '',
    },

    // Yup validation schema
    validationSchema: Yup.object({
      email: Yup.string().required('Email or username is required'),
      password: Yup.string().required('Password is required'),
    }),

    // Submission handler
    onSubmit: async (values, { setSubmitting }) => {
      setError(''); // Reset error message on new submission
      try {
        // Send login credentials to the backend
        const response = await axios.post('http://localhost:8080/login', values);
        debugger;
        // Handle successful login
        if (response.status === 200) {
          alert('Logged in successfully');
          // --- IMPORTANT ---
          // Here, you would typically save the auth token from the response
          // For example: localStorage.setItem('authToken', response.data.token);
          // Then redirect the user to the dashboard or home page.
          router.push('/dashboard'); // Redirect to a protected route
        }
      } catch (err) {
        // Handle login errors from the backend
        if (err.response && (err.response.status === 401 || err.response.status === 400)) {
          // 401 Unauthorized or 400 Bad Request often means wrong credentials
          setError('Wrong Credentials. Please try again.');
        } else {
          // Handle other errors like network issues or server errors
          setError('An unexpected error occurred. Please try again later.');
          console.error('Login error:', err);
        }
      } finally {
        setSubmitting(false); // Re-enable the submit button
      }
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
          <p className="text-gray-500">Welcome back to the Clinic Management System</p>
        </div>
        
        {/* Form */}
        <form onSubmit={formik.handleSubmit} noValidate>
          {/* Server Error Message Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Email or Username */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email or Username
            </label>
            <input
              id="email"
              type="email"
              placeholder="e.g., john.doe@example.com"
              className={`shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-xs italic mt-1">{formik.errors.email}</p>
            ) : null}
          </div>

          {/* Password */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 text-sm font-bold" htmlFor="password">
                Password
              </label>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 font-semibold">
                Forgot Password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-xs italic mt-1">{formik.errors.password}</p>
            ) : null}
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out disabled:bg-blue-400 disabled:cursor-not-allowed"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
          
          <hr className="mb-6 border-t" />

          {/* Link to Register Page */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-800">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;