import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import HomePage from './HomePage';
import LandingPage from './LandingPage'
import AuthenticationWrapper from './AuthenticationWrapper';
import HostQuiz from './HostQuiz';


function App() {

  const WrappedHostQuiz = AuthenticationWrapper(HostQuiz);

  return (


    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/registration" element={<RegistrationForm />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/host-a-quiz" element={<WrappedHostQuiz />} />
      </Routes>
    </Router>

  );
}

export default App;
