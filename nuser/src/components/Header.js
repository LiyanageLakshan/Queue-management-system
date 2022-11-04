import React from 'react';
//import {useDispatch, useSelector} from "react-redux"
import {Navbar,Nav,Button, Container, NavDropdown} from 'react-bootstrap';
import { useState , useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Header = () => {

  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  const username =localStorage.getItem("username")

  const loggedIn = window.localStorage.getItem("isLoggedIn");

  
  useEffect(() =>{
    if (loggedIn){
     //window.location.href = "/addissue";
     navigate('/addissue')
    }
    },[]);

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("isLoggedIn");

    window.location.href = "/";
  }



/*
const loggedIn = window.localStorage.getItem("token");
setSuccess(loggedIn)

  const navigate = useNavigate();
  function logout(){
    localStorage.clear();
    navigate('/')
  }

*/


  
  return (
    <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
        <Container>
      <Navbar.Brand href="/">Main Page</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      
       {localStorage.getItem("isLoggedIn") ? 
       <Nav className="ms-auto">
       <Nav.Link href="/">{username}</Nav.Link> 
       <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
   </Nav>
      
      : 
      <Nav className="ms-auto">
      <Nav.Link href="/signup">Sign Up</Nav.Link>
      <Nav.Link href="/">Login</Nav.Link> 
    </Nav> 
      
      }
      
      </Navbar.Collapse>  
      </Container>
  </Navbar>
  )
}

export default Header