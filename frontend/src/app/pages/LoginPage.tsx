import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false); // 🔴 ADDED: loading state
  const [serverError, setServerError] = useState(''); // 🔴 ADDED: backend error state

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔴 EDITED FUNCTION: CONNECTED TO BACKEND
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true); // 🔴 start loading
      setServerError(''); // 🔴 clear old error

      const response = await fetch(
        'http://localhost:5000/api/auth/login', 
        // 🔴 CHANGE THIS if your backend port or route is different
        {
          method: 'POST', // 🔴 Backend expects POST
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,      // 🔴 Must match backend
            password: formData.password // 🔴 Must match backend
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // 🔴 Backend sends { message: "Invalid credentials" }
        throw new Error(data.message || "Login failed");
      }

      // 🔴 Backend returns token → Save it
      localStorage.setItem("token", data.token);

      // 🔴 Redirect after successful login
      navigate('/feed');

    } catch (error: any) {
      setServerError(error.message); // 🔴 Show backend error
    } finally {
      setLoading(false); // 🔴 stop loading
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [e.target.name]: undefined
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">

        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">D</span>
            </div>
            <span className="text-3xl font-bold text-gray-900">DevConnect</span>
          </div>
          <p className="text-gray-600">
            Welcome back! Please login to your account
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-6"
              disabled={loading} // 🔴 disable while loading
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* 🔴 Backend Error Display */}
          {serverError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Register
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}