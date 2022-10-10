import React from 'react';
//import {useDispatch, useSelector} from "react-redux"
import {Navbar,Nav,Button, Container, NavDropdown} from 'react-bootstrap';
import { useState , useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Header = () => {

  const [user_fname, setUsername] = useState('');


  useEffect( () =>{
         
    (
      async () =>{
        const {data} = await axios.get('http://localhost:9090/normaluser/authuser/');  
        setUsername(data.user_fname);
        console.log(data)
      }
    )();

  },[]);  

  

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("isLoggedIn");

    window.location.href = "/";
  }

  var AuthButtons = '';
  if(!localStorage.getItem("token")){

    AuthButtons = (

       <Nav className="ms-auto">
          <Nav.Link href="/signup">Sign Up</Nav.Link>
          <Nav.Link href="/">Login</Nav.Link> 
          
        </Nav>

    );

  } else{
     AuthButtons = (

      <Nav className="ms-auto">
      <Nav.Link href="/">{user_fname}</Nav.Link> 
      <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
      
      
    </Nav>

     );


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
      
       {AuthButtons}
      
      </Navbar.Collapse>  
      </Container>
  </Navbar>
  )
}

export default Header