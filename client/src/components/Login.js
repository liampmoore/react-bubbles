import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = () => {
  const history = useHistory()

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }


  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleSubmit = (e) => {
    e.preventDefault()

    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res => {
        window.localStorage.setItem('token', res.data.payload)
        history.push('/bubblepage')
      })

  }

  
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>

      <form noValidate onSubmit={(e) => {handleSubmit(e)}}>
        <input type='text' name='username' value={credentials.username} onChange={(e) => {handleChange(e)}} />
        <input type='password' name='password' value={credentials.password} onChange={(e) => {handleChange(e)}} />
        <input type='submit' value='Login' />
      </form>
    </>
  );
};

export default Login;
