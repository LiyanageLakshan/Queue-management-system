import {SyntheticEvent, useState , useEffect, useRef ,useContext} from 'react'

import '../App.css';

import {Form , Button , } from 'react-bootstrap'

import FormContainer from '../components/FormContainer'

import socketIO from 'socket.io-client'

import axios from '../axios';
//import axios from 'axios';

import { useNavigate, useParams} from 'react-router-dom';

import notifi from "../img/images.png";


const ENDPOINT ="http://localhost:9090";

export const socket = socketIO(ENDPOINT);

const AddIssueScreen = () => {

      const username =localStorage.getItem("username")


  const [user, setUser] = useState('');
  const [notification, setNotificatio] = useState('');
 


    const navigate = useNavigate()
    const {issue_id } = useParams([]);
    const [user_contact, setContact] = useState('')
    const [issue, setIssue] = useState('')
    const [issueid, setAdIssue] = useState('')

    const [success, setSuccess] = useState(false);

    useEffect (() => {
      if(!localStorage.getItem('token')){
        navigate('/')
      }
      socket.on("notification",(props)=>{
        props.increaseNontification()
        setNotificatio()
      })
      socket.on("cancel_counter",(response)=>{
        if(response){
          setAdIssue(response.next)
        }
      })
    },[socket])  



 

  const singOut = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("isLoggedIn");

    window.location.href = "/";
  }
 
 
    const CallNotification = async ()=>{
      //console.log("Next")     
      (
        async () =>{
          const noti = await axios.get('http://localhost:9090/notification/get/');  
          //setNotificatio(noti);
          console.log(noti)
          navigate(`/noti `)
        }
      )();

     
    } 
  const submitHandler = async(e) => {
      e.preventDefault()
         
      setContact('');
      setIssue('');
      setSuccess(true);

      // interact with the backend
      try{
        const response = await axios.post('http://localhost:9090/issue/create/',JSON.stringify({user_contact,issue}),
        {
          headers: {
            'Content-Type': 'application/json',  
         } 
        }
        );
       // console.log(response.data);
       //console.log(response.token);
        console.log(JSON.stringify(response));
        setSuccess(true);
        setAdIssue(response.issue_id);
        alert ('Issue Added Successfuly')
        navigate(`/que/${issueid}`)
    
      }catch (err){
    
        if (!err){
        
          alert ('No Server Response')
    
        }else if(err){
         
          alert ('User Name Response')
          console.log(err)
    
        }else{
         
          alert ('No Response')
        }
    
      }
    }
  
  return (
    <>
    {success ?   (

         navigate(`/que/${issue_id}`)
      
    ):(
    
    <section>
      <div className='card'>
        <div>
        <label className='ulabel'>User Name:{username}</label><img src={notifi} className="notiimg" alt=""/><button onClick={CallNotification} className='noticount'>{notification.length}</button>
        <button className='btn1'
        onClick={singOut}>Logout</button>
        </div>
      </div>
        
    <FormContainer>
        <h4 > Add  details</h4><br></br>
        
      <Form onSubmit={submitHandler}>
      

      <Form.Group controlId="Contact_no" className="my-3" >
        <Form.Label>Contact No</Form.Label>
        <Form.Control type="number" placeholder="Enter Your contact no" value={user_contact} onChange={(e) => setContact(e.target.value)} required />
      </Form.Group>

     

      <Form.Group controlId="issue" className="my-6" >
        <Form.Label>Issue</Form.Label>
        <Form.Control type="Issue" placeholder="Enter your issue" value={issue} onChange={(e) => setIssue(e.target.value)} required />
      </Form.Group>
    
      <Button variant="primary" type="submit" className="my-3" 
        >
        Submit
      </Button>
    </Form>
    </FormContainer>
    </section>
    )}
    </>
  )
}

export default AddIssueScreen