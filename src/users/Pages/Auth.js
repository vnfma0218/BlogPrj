import axios from 'axios';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/use-form';
import './Auth.css';

const Auth = () => {
  const {
    value: emailValue,
    inputHandler: emailInputHandler,
    valueIsValid: emailIsValid,
    hasError: emailHasError,
    BlurHandler: emailBlurHandler,
    // reset: emailReset,
  } = useForm((val) => val.includes('@'));

  const {
    value: passwordValue,
    inputHandler: passwordInputHandler,
    valueIsValid: passwordIsValid,
    hasError: passwordHasError,
    BlurHandler: passwordBlurHandler,
    // reset: passwordReset,
  } = useForm((val) => val.trim().length >= 4);

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    const user = {
      email: emailValue,
      password: passwordValue,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        user
      );
      // console.log(response);
      const loggedInUser = response.data.user;
      if (loggedInUser) {
        localStorage.setItem('token', response.data.token);
        // history.push('/users');
      }
      //Users push
    } catch (error) {
      console.log(error);
    }
  };

  const moveUserListHandler = async () => {
    const response = await axios.get('http://localhost:5000/api/users/isAuth', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    console.log(response);
  };

  const emailInvalidClasses = emailHasError ? 'invalid' : '';
  const passwordInvalidClasses = passwordHasError ? 'invalid' : '';

  return (
    <div className='auth' onSubmit={loginHandler}>
      <form className='login_form'>
        <h1 className='company_name'>Blog App</h1>
        <div className={emailInvalidClasses}>
          <input
            onChange={emailInputHandler}
            type='text'
            name='email'
            placeholder='Enter email'
            onBlur={emailBlurHandler}
            value={emailValue}
          />
          {emailHasError && (
            <p className='error_text'>Email must includes @ character</p>
          )}
        </div>
        <div className={passwordInvalidClasses}>
          <input
            onChange={passwordInputHandler}
            type='password'
            name='password'
            placeholder='Enter password'
            onBlur={passwordBlurHandler}
            value={passwordValue}
          />
          {passwordHasError && (
            <p className='error_text'>
              password shoud be more than 4 characters
            </p>
          )}
        </div>
        <button disabled={!formIsValid} className='submit_Btn'>
          Login
        </button>
      </form>
      <div className='signUp'>
        <span> Create account?</span>
        <Link to='/users/sign-up'>
          <span className='signUpBtn'>Sign up</span>
        </Link>
      </div>

      <button onClick={moveUserListHandler}>go to user List</button>
    </div>
  );
};

export default Auth;
