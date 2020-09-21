import React, { useState } from 'react';
import AuthService from '../../services/auth.service';
import './login.styles.scss';


const LogIn = (props) => {
  const [input, setInput] = useState({});
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    })
    setError(false);
  };

  const login = (e) => {
    e.preventDefault();
    console.log(input);
    AuthService.login(input.email, input.password)
      .then((err, token) => {
        console.log(token);
        props.history.push('/');
        props.history.go(0);
      })
      .catch((err) => {
        console.log(err)
        setError(true)
      });
  };
  return (
    <div className="log-in">
      <h2>Log in to your account</h2>
      <form>
        <p className={`error ${error?'show' :''}`}>Email or Password Invalid</p>
        <div className="input-group">
          <label>Email Address</label>
          <input type="text" name="email" onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" onChange={handleInputChange} />
        </div>
        <input className='submit' type="submit" onClick={login} />
      </form>
    </div>
  );
};

export default LogIn;
