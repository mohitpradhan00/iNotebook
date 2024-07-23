import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import notesContext from '../context/notes/NoteContext';
import alertContext from '../context/alerts/AlertContext';

const Signup = () => {
  const noteContext = useContext(notesContext);
  const { host } = noteContext;
  const altContext = useContext(alertContext);
  const { setLoadingProgress, showAlert } = altContext;
  let navigate = useNavigate();
  const [signupCredentials, setSignupCredentials] = useState({ name: "", email: "", password: "", confirmPass: "" });
  const [passwordEye, setPasswordEye] = useState(false);

  const onChange = (e) => {
    setSignupCredentials({ ...signupCredentials, [e.target.name]: e.target.value })
  }

  const handlePasswordEye = () => {
    if (passwordEye) {
      setPasswordEye(false);
    } else {
      setPasswordEye(true);
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupCredentials.password !== signupCredentials.confirmPass) {
      return showAlert("password dosen't match with confirm password", "danger");
    }
    setLoadingProgress(20);
    const url = `${host}/api/auth/createuser`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: signupCredentials.name, email: signupCredentials.email, password: signupCredentials.password })
    })
    setLoadingProgress(70);
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/");
      showAlert("Account Created Successfully.", "success");
    } else {
      showAlert("Error: Invalid Details.", "danger");
    }
    setLoadingProgress(100);
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Create a new account</h1>
      <h6 className='text-center text-muted mb-2'>It's quick and easy.</h6>
      <form className='shadow py-3 px-4 rounded' onSubmit={handleSignup} style={{maxWidth: '575px', marginInline: 'auto'}}>
        <div className="mb-2">
          <label htmlFor="username" className="form-label">User Name :</label>
          <input type="text" className="form-control" id="username" name='name' style={{ textTransform: "capitalize" }} value={signupCredentials.name} onChange={onChange} required />
        </div>
        <div className="mb-2">
          <label htmlFor="signupEmail" className="form-label">Email address :</label>
          <input type="email" className="form-control" id="signupEmail" aria-describedby="emailHelp" name='email' value={signupCredentials.email} onChange={onChange} required />
        </div>
        <label htmlFor="signupPassword" className="form-label">Password :</label>
        <div className="input-group">
          <input type={passwordEye ? "text" : "password"} className="form-control" id='signupPassword' name='password' aria-label="signupPassword" aria-describedby="basic-addon2" value={signupCredentials.password} minLength={5} onChange={onChange} required />
          <span className="input-group-text" id="basic-addon2" onClick={handlePasswordEye} >{passwordEye ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}</span>
        </div>
        <div id="emailHelp" className="form-text mb-2">Password must be at least 5 characters long.</div>
        <label htmlFor="signupConfirmPassword" className="form-label">Confirm Password :</label>
        <div className="input-group">
          <input type={passwordEye ? "text" : "password"} className="form-control" id='signupConfirmPassword' name='confirmPass' aria-label="signupConfirmPassword" aria-describedby="basic-addon2" value={signupCredentials.confirmPass} minLength={5} onChange={onChange} required />
          <span className="input-group-text" id="basic-addon2" onClick={handlePasswordEye} >{passwordEye ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}</span>
        </div>
        <div className='d-flex justify-content-center mt-3'>
          <button type="submit" className="btn btn-success px-3">Sign Up</button>
        </div>
      </form>
      <div className='text-center my-2 lead'>Already have a account? click here to <Link to={"/login"}>Login</Link>.</div>
    </div>
  )
}

export default Signup