import { React, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import alertContext from '../context/alerts/AlertContext';
import LoadingBar from 'react-top-loading-bar';

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const altContext = useContext(alertContext);
  const { showAlert, loadingProgress, setLoadingProgress } = altContext;

  const handleLogOut = () => {
    setLoadingProgress(5);
    localStorage.removeItem('token');
    navigate('/login');
    setLoadingProgress(100);
    showAlert("You have successfully logged out.", "primary")
  }

  return (
    <>
      <LoadingBar color='#3B71CA' progress={loadingProgress} onLoaderFinished={() => setLoadingProgress(0)} />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img style={{ width: "25px", borderRadius: "50%", marginTop: "-3px" }} src="https://w7.pngwing.com/pngs/739/481/png-transparent-note-taking-reading-writing-taking-miscellaneous-angle-text-thumbnail.png" alt="" /> <span className='text-info'>i</span>Notebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {localStorage.getItem("token") && <Link
                  className={`nav-link ${location.pathname === "/" ? "active" : ""
                    }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>}
              </li>
            </ul>
            {localStorage.getItem("token") && <button className="btn btn-primary btn-sm mx-2 px-2" onClick={handleLogOut} >Log out</button>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;