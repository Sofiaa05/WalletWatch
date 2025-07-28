import { useState, useContext, useEffect } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom'; 
import Input from '../../components/Inputs/Input';
import { isValidEmail } from '../../utils/helper';
import '../../styles/Login.css';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
      setTimeout(() => {
        setError(""); // clear after 5 seconds 
      }, 4000)
    }
  };

    useEffect(() => {
      if (error) {
        const timer = setTimeout(() => setError(''), 5000);
        return () => clearTimeout(timer);
      }
    }, [error]);

  return (
    <AuthLayout>
      <div className="login-container">
        <h3 className="login-title">Welcome Back</h3>
        <p className="login-subtitle">Please enter your details to log in</p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="email"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn-primary">Login</button>

          <p className="login-footer">
            Don't have an account?{" "}
            <Link className="signup-link" to="/signup">SignUp</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
