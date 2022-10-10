import {SyntheticEvent, useState , useEffect, useRef ,useContext} from 'react'

import { useNavigate } from 'react-router-dom';
import {Form , Button , } from 'react-bootstrap';

import FormContainer from '../components/FormContainer';

//import axios from '../axios';
import axios from 'axios'

const LOGIN_URL ='http://localhost:9090/normaluser/login';

const LoginScreen = () => {

    const userRef = useRef();

    const navigate = useNavigate();

    const errRef = useRef();

    const [user_email, setEmail] = useState('')
    const [user_password, setPassword] = useState('')

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    
    useEffect (() => {
      setErrMsg('');
    },[user_email,user_password])

    const submitHandler = async(e) => {
      e.preventDefault();
     
      
      setEmail('');
      setPassword('');
      setSuccess(true);


      // interact with the backend
      try{
        const response = await axios.post('http://localhost:9090/normaluser/login',JSON.stringify({user_email,user_password}),
        {
          headers: {'Content-Type': 'application/json' },
          
        } 
        );
      /**   .then((response)=>{
          if (response.data.token){
            localStorage.setItem("user", JSON.stringify(response.data));
          }

        }) */
        console.log(response.data);
       //console.log(response.token);
        console.log(JSON.stringify(response));
        const token = response?.data?.token;
        window.localStorage.setItem("token",response.data.token);
        axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
        window.localStorage.setItem("isLoggedIn", true, token);
        console.log(response)
        setSuccess(true);
        navigate('/addissue')
    
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
        <a href="/addissue"> Enter Your Issue</a>
        </p>
      </section>
    ):(
    
    <section>
    <FormContainer>
        <h1 > User Login</h1><br></br>
        <p  className={errMsg ? "errmsg" :"offscreen"} aria-live="assertive">{errMsg}</p>
      <Form onSubmit={submitHandler}>
      <Form.Group  controlId="user_email" className="my-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter Your email" value={user_email} onChange={(e) => setEmail(e.target.value)} required
        autoComplete="off" />
      </Form.Group>

      <Form.Group controlId="user_password" className="my-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={user_password} onChange={(e) => setPassword(e.target.value)} required />
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