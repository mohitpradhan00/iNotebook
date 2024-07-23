import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import notesContext from '../context/notes/NoteContext'
import alertContext from '../context/alerts/AlertContext';

const Login = () => {
  const noteContext = useContext(notesContext);
  const { host } = noteContext;
  const altContext = useContext(alertContext);
  const { setLoadingProgress, showAlert } = altContext;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [passwordEye, setPasswordEye] = useState(false);
  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handlePasswordEye = () => {
    if (passwordEye) {
      setPasswordEye(false);
    } else {
      setPasswordEye(true);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingProgress(20);
    const url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    setLoadingProgress(70);
    const json = await response.json();
    if (json.success) {
      // redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      showAlert("Logged in Successfully.", "primary")
    } else {
      showAlert("Error: Invalid Email or Password.", "danger")
    }
    setLoadingProgress(100);
  }

  return (
    <div className='container mt-4'>
      <h1 className='text-center mb-4'>Login to <span className='text-primary'>i</span>Notebook</h1>
      <form className='shadow p-4 rounded' onSubmit={handleLogin} style={{maxWidth: '575px', marginInline: 'auto'}}>
        <div className="mb-4">
          <label htmlFor="loginEmail" className="form-label">Email address :</label>
          <input type="email" className="form-control" id="loginEmail" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <label htmlFor="loginPassword" className="form-label">Password :</label><br />
        <div className="input-group mb-4">
          <input type={passwordEye ? "text" : "password"} className="form-control" id='loginPassword' name='password' aria-label="loginPassword" aria-describedby="basic-addon2" value={credentials.password} onChange={onChange} required />
          <span className="input-group-text" id="basic-addon2" onClick={handlePasswordEye} >{passwordEye ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}</span>
        </div>
        <div className='d-flex justify-content-center mt-4'>
          <button type="submit" className="btn btn-primary px-3">Login</button>
          {/* <button className="btn btn-primary ms-4" onClick={()=>{navigate("/signup")}}>SignUp</button> */}
        </div>
      </form>
      <div className='text-center mt-2 lead'>New to iNotebook? <Link to={"/signup"}>SignUp</Link> now.</div>
    </div>
  )
}

export default Login