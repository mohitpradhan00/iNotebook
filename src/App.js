import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import AlertState from './context/alerts/AlertState';

function App() {
  return (
    <AlertState>
      <NoteState>
        <Router>
          <Navbar />
          <Alert />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </AlertState>
  );
}

export default App;