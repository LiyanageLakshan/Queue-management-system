import React from 'react';

import './App.css';

import Header from './components/Header';


import {Container} from 'react-bootstrap'

import {BrowserRouter as Router,Routes , Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';

import LoginScreen from './screens/LoginScreen';

import SignupScreen from './screens/SignupScreen';

import AddIssueScreen from './screens/AddIsssueScreen';
import QueScreen from './screens/ViewQue';
import NotiScreen from './screens/ViewNoti';

const loggedIn = window.localStorage.getItem("isLoggedIn");

console.log(loggedIn, "login");

const WithHeader = (Page)=>{
  return(
    <>
    <Header/>
    <Page />
    </>
  )
}


function App() {
  return (
    <Router>
          
               <Routes>
                   <Route path='/home'  element ={< HomeScreen />} />
                   <Route path='/signup' element ={<SignupScreen/> } />
                   <Route path='/' element={WithHeader(LoginScreen)} />
                   <Route path='/addissue' element={WithHeader(AddIssueScreen)} />
                   <Route path='/que/:issue_id' element={WithHeader(QueScreen)} />
                   <Route path='/noti' element ={< NotiScreen />} />
              </Routes>
       
     
   </Router>
  );
}

export default App;


