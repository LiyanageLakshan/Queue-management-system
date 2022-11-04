import React from 'react';

import './App.css';

import Header from './components/Header';

import Footer from './components/Footer';

import {Container} from 'react-bootstrap'

import {BrowserRouter as Router,Routes , Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';

import LoginScreen from './screens/LoginScreen';

import SignupScreen from './screens/SignupScreen';

import AddIssueScreen from './screens/ViewIsssueScreen';


import IssueScreen from './screens/View';


import {AuthProvider} from './Context/AutherProvider';

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
                   <Route path='/viewissue'element ={WithHeader(AddIssueScreen)} />
                   <Route path='/view/:issue_id' element ={WithHeader(IssueScreen)} />
                  
              </Routes>
        
   </Router>
   
  );
}

export default App;


