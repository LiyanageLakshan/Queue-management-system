import { useState, useEffect} from 'react'
import FormContainer from '../components/FormContainer'
import {Form,Button} from 'react-bootstrap'
import axios from 'axios';
const URL = process.env.SERVER_URL;




const SignupScreen = () => {

  const [counter_email, setEmail] = useState('')
  const [counter_password, setPassword] = useState('')
  const [counter_contact, setContact] = useState('')
  const [counter_n_name, setUsername] = useState('')
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');


  useEffect (() => {
    setErrMsg('');
  },[counter_email,counter_password, counter_n_name , counter_contact])

  const submitHandler = async(e) => {
    e.preventDefault();

    setEmail('');
    setPassword('');
    setUsername('');
    setContact('');
    setSuccess(true);
  
    console.log(counter_email,counter_password, counter_n_name , counter_contact);



    // interact with the backend
   

  try{
    const response = await axios.post('http://localhost:9090/counteruser/create',JSON.stringify({counter_email,counter_password, counter_n_name , counter_contact}),
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
       <h1 >  Counter User Signup</h1><br></br>
    <Form onSubmit={submitHandler}>
    <Form.Group  controlId="counter_email" className="my-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="user_email" placeholder="Enter Your email" value={counter_email} onChange={e => setEmail(e.target.value)} required />
      </Form.Group>

      <Form.Group  controlId="counter_n_name" className="my-3" >
        <Form.Label>User Name</Form.Label>
        <Form.Control type="counter_n_name" placeholder="Enter Your User Name"  value={counter_n_name} onChange={e => setUsername(e.target.value)} required/>
      </Form.Group>

      <Form.Group  controlId="counter_contact" className="my-3" >
        <Form.Label>Contact No </Form.Label>
        <Form.Control type="number" placeholder="Enter Your Contact No"  value={counter_contact} onChange={e => setContact(e.target.value)} required/>
      </Form.Group>

      <Form.Group controlId="counter_password" className="my-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Your Password" value={counter_password} onChange={e => setPassword(e.target.value)} required/>
      </Form.Group>
      <Button variant="primary" type="submit" className="my-3" onClick={submitHandler} >
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