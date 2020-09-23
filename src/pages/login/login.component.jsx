import React, { useState } from 'react';
import AuthService from '../../services/auth.service';
import './login.styles.scss';
import Spinner from '../../components/spinner/spinner.component'

const LogIn = (props) => {
  const [input, setInput] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    })
    setError(false);
  };

  const login = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(input);
    AuthService.login(input.email, input.password)
      .then((err, token) => {
        setLoading(false);
        props.history.push('/');
        props.history.go(0);
      })
      .catch((err) => {
        console.log(err)
        setError(true)
        setLoading(false);
      });
  };
  return (
    <div className="log-in">
      <h2>Log in to your account</h2>
      <form onSubmit={login}>
        <p className={`error ${error ? 'show' : ''}`}>
          Email or Password Invalid
        </p>
        <div className="input-group">
          <label>Email Address</label>
          <input
            type="text"
            required
            name="email"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            required
            name="password"
            onChange={handleInputChange}
          />
        </div>
        {loading === true ? (
          <div className="loading">Loading...</div>
        ) : (
          <input className="submit" type="submit" value="Log In" />
        )}
      </form>
    </div>
  );
};

export default LogIn;
