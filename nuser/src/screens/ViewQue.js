import {SyntheticEvent, useState , useEffect, useRef ,useContext} from 'react'

import '../App.css';

import {Form , Button , Table , Card} from 'react-bootstrap'

import FormContainer from '../components/FormContainer'

//import axios from '../axios';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
//import ReactPaginate from 'react-paginate';
import io from 'socket.io-client';
import notifi from "../img/images.png";

const ENDPOINT ="http://localhost:9090";
var socket, selecteduserCompare;


const QueScreen = () => {

  const [user, setUser] = useState('');
  const [notification, setNotificatio] = useState([]);
  const [socketConnected, setsocketConnected] = useState(false)

  const [user_fname, setUsername] = useState('');

    const userRef = useRef();

    const navigate = useNavigate()

   
    const {issue_id} = useParams([]);

   
    

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect (() => {
      if(!localStorage.getItem('token')){
        navigate('/')
      }
    },[])  

    useEffect(() =>{
      socket = io(ENDPOINT);
      socket.emit("setup",user);
      socket.on("connection",() =>setsocketConnected(true))


    },[]);

  
    const CallNotification = async ()=>{
      //console.log("Next")     
      (
        async () =>{
          const noti = await axios.get('http://localhost:9090/notification/get/');  
          setNotificatio(noti.data);
          console.log(noti.data)
          navigate(`/noti `)
        }
      )();

     
    }
   

    useEffect( () =>{
         
      (
        async () =>{
          const {data} = await axios.get('http://localhost:9090/normaluser/authuser');  
          setUsername(data.user_fname);
          console.log(data)
        }
      )();

    },[]);  
   
    const [data, setData] = useState([]);


    useEffect( () =>{
         
      (
        async ( ) =>{
          const {data} = await axios.get('http://localhost:9090/normaluser/counter/');  
          setData(data);
          console.log(data)
        
        }
      )();

    },[]);  

    const [issue, setIssue] = useState([]);
    const [issueid, setIssueId] = useState([]);
     
    
    useEffect(() =>{

      (
        async ( ) =>{
          const issue = await axios.get('http://localhost:9090/normaluser/que/');  
          setIssue(issue.data);
          setIssueId(issue.data.issue_id)
          console.log(issue.data)
        
        }
      )();
       
    },[issue_id]);

 const handledoneClick = async ()=>{
      //console.log("Next")     
       (
         async () =>{
          const done = await axios.get(`http://localhost:9090/issue/delete/${issueid}`,JSON.stringify({}),  
          //setData(data);
       
          {
            headers: {'Content-Type': 'application/json'}
          }
          );
          console.log(done)
          navigate(`/ `)
        }
       )();

     
    }

  return (
    <>
    {success ?(
      <section>
        <h1>Issue Added Successfuly!</h1> <br/><p>
        <a href="/que"> Go to Home</a>
        </p>
      </section>
    ):(
    
    <section>
      <div className='card'>
        <div>
        <label className='ulabel'>User Name:{user_fname}</label><img src={notifi} className="notiimg" alt=""/><button onClick={CallNotification} className='noticount'>{notification.length }</button>
        <button className='btn1'
        onClick={() =>{
          localStorage.clear()
          navigate('/')
        }}>Logout</button><img src={notification} className="notiimg" alt=""/>
        </div>
      </div>
        <br></br>

     <Card style={{ width: '18rem' }}>
     
      <Card.Body>
        <Card.Title>Curruent No</Card.Title>
        <Card.Text>
            <strong className='curruntno'>{data.current_token}</strong>
         
        </Card.Text>

      </Card.Body>
    </Card>
    <label className='next'> Next</label> <label className='nextno'> {data.next_token}</label><br></br><br></br><br></br>
    <label className='next'> My No</label> <label className='nextno'> {issue.queue_no}</label>
 
    <Button className='cancel' variant="danger" onClick={handledoneClick} >Cancel</Button> 
    </section>
    )}
    </>
  )
}

export default QueScreen