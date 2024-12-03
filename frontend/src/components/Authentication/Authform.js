import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [responseError, setResponseError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!isLogin) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } 
    // else if (formData.password.length < 6) {
    //   newErrors.password = 'Password must be at least 6 characters';
    // }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {

      const axiosConfig = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
      }

      if (isLogin){
          axios.post('http://192.168.1.9:5000/api/v1/users/login', {
            "email": formData.email,
            "password": formData.password
          }, axiosConfig).then((res)=>{
            if (res.data.status=='success'){
              localStorage.removeItem('token');
              localStorage.setItem('token',res.data.token);
              navigate("/",{ replace: true });
            }
            if (res.data.status=='error') setResponseError(res.data.message);
          }).catch((err)=>{
            setResponseError("Something went wrong. Please try again later!");
            console.log(err);
          });
      }
      else {
        axios.post('http://192.168.1.9:5000/api/v1/users/signup', {
          "firstName": formData.firstName,
          "middleName": formData.middleName,
          "lastName": formData.lastName,
          "username": formData.username,
          "email": formData.email,
          "password": formData.password,
          "confirmPassword": formData.confirmPassword
        }, axiosConfig).then((res)=>{
          if (res.data.status=='success'){
            localStorage.removeItem('token');
            localStorage.setItem('token',res.data.token);
            navigate("/",{ replace: true });
          }
          if (res.data.status=='error') setResponseError(res.data.message);
        }).catch((err)=>{
          setResponseError("Something went wrong. Please try again later!");
          console.log(err);
        });
      }

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container-fluid mt-5 d-flex align-items-center justify-content-center " >
      <div className="card shadow-lg" style={{ maxWidth: '500px', width: '100%', borderRadius: '20px' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <i className="fas fa-comments text-primary mb-3" style={{ fontSize: '2.5rem' }}></i>
            <h2 className="fw-bold">{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
            <p className="text-muted">
              {isLogin ? 'Login to continue your journey' : 'Join our community today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="needs-validation">
            {!isLogin && (
              <>
                <div className="row g-3 mb-3">
                  <div className="col-md-4">
                    <label htmlFor="firstName" className="form-label">
                      <i className="fas fa-user me-2"></i>First Name*
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="middleName" className="form-label">Middle Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="middleName"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      placeholder="David"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="lastName" className="form-label">Last Name*</label>
                    <input
                      type="text"
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Smith"
                    />
                    {errors.lastName && (
                      <div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    <i className="fas fa-at me-2"></i>Username*
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a unique username"
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
              </>
            )}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <i className="fas fa-envelope me-2"></i>Email address*
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <i className="fas fa-lock me-2"></i>Password*
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  <i className="fas fa-lock me-2"></i>Confirm Password*
                </label>
                <input
                  type="password"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">{errors.confirmPassword}</div>
                )}
              </div>
            )}

            {isLogin && (
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">
                  <i className="fas fa-cookie me-2"></i>Remember me
                </label>
              </div>
            )}

          {responseError && <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              {responseError}
          </div> }

            <button type="submit" className="btn btn-primary w-100 mb-3 py-2">
              <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'} me-2`}></i>
              {isLogin ? 'Login' : 'Sign Up'}
            </button>


            <div className="text-center">
              <button
                type="button"
                className="btn btn-link text-decoration-none"
                onClick={() => setIsLogin(!isLogin)}
              >
                <i className={`fas ${isLogin ? 'fa-user-plus' : 'fa-sign-in-alt'} me-2`}></i>
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default AuthForm;