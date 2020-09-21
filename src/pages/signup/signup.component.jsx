import React, { useState } from 'react';
import AuthService from '../../services/auth.service';
import './signup.styles.scss';

const Signup = (props) => {
  const [input, setInput] = useState({});
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [match, setMatch] = useState(false);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    setError(false);
  };
  const pwmatch = (e) => {
    console.log('herrrrrrrrrr');
    if (e.target.name === 'confirmPassword') {
      e.target.value !== input.password ? setMatch(true) : setMatch(false);
    } else {
      input.confirmPassword !== e.target.value
        ? setMatch(true)
        : setMatch(false);
    }
  };

  const signup = (e) => {
    e.preventDefault();
    AuthService.signup(
      input.username,
      input.email,
      input.password,
      input.confirmPassword
    )
      .then((res) => {
        if (res.err === true) {
          setError(true);
          setErrors(res.errors.errors)
          
        }else{
          props.history.push('/login');
        }
      })
  };
  return (
    <div className="sign-up">
      <h2>Sign up</h2>
      <form onSubmit={signup}>
        {error
          ? errors.map((err) => (
              <p key={err.msg} className={`error ${error ? 'show' : ''}`}>{err.msg}</p>
            ))
          : ''}
        <div className="input-group">
          <label>Username</label>
          <input type="text" required name="username" onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" required name="email" onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={(e) => {
              handleInputChange(e);
              pwmatch(e);
            }}
          />
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            required
            name="confirmPassword"
            onChange={(e) => {
              handleInputChange(e);
              pwmatch(e);
            }}
          />
        </div>
        <p className={`pw-match ${match ? 'show' : ''}`}>
          *passwords do not match
        </p>
        <input className="submit" type="submit" />
      </form>
    </div>
  );
};

export default Signup;
