import {useState, useContext, useEffect} from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom'; 
import Input from '../../components/Inputs/Input';
import { isValidEmail } from '../../utils/helper';
import '../../styles/SignUp.css';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';
import '../../styles/SignUp.css'

const SignUp = () => {
  //these value names should match the backend
  const [profilePic, setProfilePic] = useState(null);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const { updateUser } = useContext(UserContext); //destructing updateUser function from UserContext object
  const navigate = useNavigate();

  //handle sign up form submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullname){
      setError("Please Enter your name");
      return;
    }

    if (!isValidEmail(email)){
      setError("Please enter a valid email address");
      return;
    }

    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setError(""); //If all validations passed, clear any previous error.

    //signup Api call
    try{

      //upload image if present
      if(profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || ""
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullname,
        email,
        password,
        profileImageUrl
      });

      const {token, user} = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }  else {
        setError("Someting went wrong. Please try again");
      } 
    }
  }
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <AuthLayout>
      <div className='signup-container'>
        <h3 className='signup-title'>Create an Account</h3>
        <p className='signup-subtitle'>
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            <Input
              value= {fullname}
              onChange={({target}) => setFullName(target.value)} 
              label="Full Name"
              placeholder="John"
              type="text"
            />

            <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="email"
          />

          <Input
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {error && <p className="error-message">{error}</p>} 

          <button type="submit" className="btn-primary">SignUp</button>

          <p className="signup-footer">
            Already have an account?{" "}
            <Link className="login-link" to="/login">
              Login
            </Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
