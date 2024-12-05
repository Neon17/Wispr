import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Authform from './components/Authentication/Authform';
import Profile from './components/Profile';
import WisprLanding from './components/LandingPage/WisprLanding';
import WisprNav from './components/LandingPage/WisprNav';

function App(){
  return (
    <>
      <Router future={{v7_startTransition: 'true', v7_relativeSplatPath: 'true'}}>
        <WisprNav/>
        <Routes>
        <Route  path="/home" element={<WisprLanding/>} />
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/auth" element={<Authform/>}/>
          <Route exact path="/profile" element={<Profile/>} />
          <Route path='*' element={<div className='text-center mt-2'>Page Not Found</div>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;

