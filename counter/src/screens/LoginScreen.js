import { useState , useEffect, useRef ,useContext} from 'react'

import { useNavigate } from 'react-router-dom';
import {Form , Button , } from 'react-bootstrap';

import FormContainer from '../components/FormContainer';

//import axios from '../axios';
import axios from 'axios'


const LoginScreen = () => {

  

    const navigate = useNavigate();

    const [counter_email, setEmail] = useState('')
    const [counter_password, setPassword] = useState('')

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    
    useEffect (() => {
      setErrMsg('');
    },[counter_email,counter_password])

    const submitHandler = async(e) => {
      e.preventDefault();
     
      
  
      setSuccess(true);


      // interact with the backend
      try{
        const response = await axios.post('http://localhost:9090/counteruser/login',JSON.stringify({counter_email,counter_password}),
        {
          headers: {'Content-Type': 'application/json' },
          
        } 
        );
    
        console.log(response.data);
       
        console.log(JSON.stringify(response));
        const token = response?.data?.token;
        localStorage.setItem('token',response.data.token);
        axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
        window.localStorage.setItem("isLoggedIn", true, token);
        window.localStorage.setItem("token",response.data.token);
        console.log(response)
        setSuccess(true);
        setEmail('');
        setPassword('');
        navigate('/viewissue')
    
      }catch (err){
    
        if (!err){
          setErrMsg('No Server Response');
           alert ('No Server Response')
           
        }else if(err){
          setErrMsg('Username Taken');
          alert ('Username Taken')
          console.log(err)
    
        }else{
          setErrMsg('Regitration Failed')
          alert ('Regitration Failed')
        }
    
      }
    }


  return (
    <>
    {success ?(
      <section>
        <h1>You are loged in!</h1> <br/><p>
        <a href="/viewissue"> Enter Your Issue</a>
        </p>
      </section>
    ):(
    
    <section>
    <FormContainer>
        <h1 > Counter User Login</h1><br></br>
        <p  className={errMsg ? "errmsg" :"offscreen"} aria-live="assertive">{errMsg}</p>
      <Form onSubmit={submitHandler}>
      <Form.Group  controlId="user_email" className="my-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter Your email" value={counter_email} onChange={(e) => setEmail(e.target.value)} required
        autoComplete="off" />
      </Form.Group>

      <Form.Group controlId="user_password" className="my-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={counter_password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>
    
      <Button variant="primary" type="submit" className="my-3" >
        Login
      </Button>
      <p> <a href="/signup"> Register Here</a></p>
    </Form>
    </FormContainer>
    </section>
    )}
    </>
  )
}

export default LoginScreen