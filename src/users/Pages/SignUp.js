import axios from 'axios';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/use-form';
import './Auth.css';
const SignUp = () => {
  const {
    value: emailValue,
    inputHandler: emailInputHandler,
    valueIsValid: emailIsValid,
    hasError: emailHasError,
    BlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useForm((val) => val.includes('@'));

  const {
    value: usernameValue,
    inputHandler: usernameInputHandler,
    valueIsValid: usernameIsValid,
    hasError: usernameHasError,
    BlurHandler: usernameBlurHandler,
    // reset: usernameReset,
  } = useForm((val) => val.trim() !== '');

  const {
    value: passwordValue,
    inputHandler: passwordInputHandler,
    valueIsValid: passwordIsValid,
    hasError: passwordHasError,
    BlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useForm((val) => val.trim().length >= 4);

  let formIsValid = false;
  if (emailIsValid && passwordIsValid && usernameIsValid) {
    formIsValid = true;
  }

  const signUpHandler = async (e) => {
    e.preventDefault();
    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    const user = {
      email: emailValue,
      name: usernameValue,
      password: passwordValue,
    };
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/new',
        user
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    emailReset();
    passwordReset();
  };

  const emailInvalidClasses = emailHasError ? 'invalid' : '';
  const usernameInvalidClasses = usernameHasError ? 'invalid' : '';
  const passwordInvalidClasses = passwordHasError ? 'invalid' : '';

  return (
    <div className='auth' onSubmit={signUpHandler}>
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
        <div className={usernameInvalidClasses}>
          <input
            onChange={usernameInputHandler}
            type='text'
            name='username'
            placeholder='Enter name'
            onBlur={usernameBlurHandler}
            value={usernameValue}
          />
          {usernameHasError && (
            <p className='error_text'>Username must not be empty</p>
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
          회원가입
        </button>
      </form>
      <div className='signUp'>
        <span> Already have account?</span>
        <Link to='/'>
          <span className='signUpBtn'>Log in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
