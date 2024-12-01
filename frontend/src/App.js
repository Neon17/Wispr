import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MessageDesign from './components/MessageDesign';

function App(){
  return (
    <>
      <Router future={{v7_startTransition: 'true', v7_relativeSplatPath: 'true'}}>
        <Navbar title = "Messages"/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/message-design" element={<MessageDesign/>}/>
          <Route path='*' element={<div className='text-center mt-2'>Page Not Found</div>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;

