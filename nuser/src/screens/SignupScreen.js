import {SyntheticEvent, useState, useEffect} from 'react'
import FormContainer from '../components/FormContainer'

import axios from '../axios';


import {Form,Button} from 'react-bootstrap'


const URL = 'http://localhost:9090';



const SignupScreen = () => {

  const [user_email, setEmail] = useState('')
  const [user_password, setPassword] = useState('')
  const [user_fname, setUsername] = useState('')
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect (() => {
    setErrMsg('');
  },[user_email,user_password, user_fname])

  const submitHandler = async(e) => {
    e.preventDefault();

    setEmail('');
    setPassword('');
    setUsername('');
    setSuccess(true);
  
    console.log(user_email, user_fname, user_password);



    // interact with the backend
   

  try{
    const response = await axios.post(`${URL}/normaluser/create`,JSON.stringify({user_email,user_fname,user_password}),
    {
      headers: {'Content-Type': 'application/json'}
      
    }
    );
    console.log(response.data);
   //console.log(response.token);
    console.log(JSON.stringify(response))
    setSuccess(true);

  }catch (err){

    if (!err){
      setErrMsg('No Server Response');

    }else if(err){
      setErrMsg('Username Taken');

    }else{
      setErrMsg('Regitration Failed')
    }

  }
}

  return (

    <>
    {success ?(
      <section>
        <h1>You are registed!</h1> <br/><p>
        <a href="/"> Login</a>
        </p>
      </section>
    ):(
      <section>
    <FormContainer>
       <h1 >   User Signup</h1><br></br>
    <Form onSubmit={submitHandler}>
      <Form.Group  controlId="user_email" className="my-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="user_email" placeholder="Enter Your email" value={user_email} onChange={e => setEmail(e.target.value)} required />
      </Form.Group>

      <Form.Group  controlId="username" className="my-3" >
        <Form.Label>User Name</Form.Label>
        <Form.Control type="username" placeholder="Enter Your User Name"  value={user_fname} onChange={e => setUsername(e.target.value)} required/>
      </Form.Group>

      <Form.Group controlId="Password" className="my-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={user_password} onChange={e => setPassword(e.target.value)} required/>
      </Form.Group>
    
      <Button variant="primary" type="submit" className="my-3" >
        Signup
      </Button>
    </Form>
    </FormContainer>
    </section>
    )}
    </>
  )
}

export default SignupScreen