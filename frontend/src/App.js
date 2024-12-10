import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Authform from './components/Authentication/Authform';
import Profile from './components/Profile/Profile';
import WisprLanding from './components/LandingPage/WisprLanding';
import WisprNav from './components/LandingPage/WisprNav';
import PageLoader from './components/Loader/PageLoader';
import UploadProfilePicture from './components/UploadProfilePicture';

function App(){
  return (
    <>
      <PageLoader>
      <Router future={{v7_startTransition: 'true', v7_relativeSplatPath: 'true'}}>
        <WisprNav/>
        <Routes>
        <Route  path="/" element={<WisprLanding/>} />
          <Route exact path="/home" element={localStorage.getItem('token')?<Home/>:<Authform/>} />
          <Route exact path="/auth" element={<Authform/>}/>
          <Route exact path="/profile" element={localStorage.getItem('token')?<Profile/>:<Authform/>} />
          <Route exact path="/uploadProfilePicture" element={<UploadProfilePicture/>} />
          <Route path='*' element={<div className='text-center p-5' style={{marginTop: '76px'}}>Page Not Found</div>} />
        </Routes>
      </Router>
      </PageLoader>
    </>
  )
}

export default App;

