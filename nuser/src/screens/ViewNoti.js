import {SyntheticEvent, useState , useEffect, useRef } from 'react'

import '../App.css';

import {Form , Button , Table} from 'react-bootstrap'

import io from 'socket.io-client';

//import axios from '../axios';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';


const ENDPOINT ="http://localhost:9090";
var socket, selecteduserCompare;

const NotiScreen = () => {

  const [user, setUser] = useState('');
  const [notification, setNotificatio] = useState([]);
  const [socketConnected, setsocketConnected] = useState(false)

  const [user_fname, setUsername] = useState('');

    const userRef = useRef();

    const navigate = useNavigate()

    const errRef = useRef();

    const [user_contact, setContact] = useState('')
   
    const {issue_id} = useParams([]);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect (() => {
      if(!localStorage.getItem('token')){
        navigate('/')
      }
    },[])  

    useEffect (() => {
      setErrMsg('');
    },[user_contact]);

    useEffect(() =>{
      socket = io(ENDPOINT);
      socket.emit("setup",user);
      socket.on("connection",() =>setsocketConnected(true))

    },[]);

    useEffect( () =>{
         
      (
        async () =>{
          const noti = await axios.get('http://localhost:9090/notification/get/');  
          setNotificatio(noti.data);
          console.log(noti.data)
        }
      )();

    },[]); 

    useEffect( () =>{
         
      (
        async () =>{
          const {data} = await axios.get(`http://localhost:9090/normaluser/authuser/`);  
          setUsername(data.user_fname);
          console.log(data)
        }
      )();

    },[]);  
   
    const [data, setData] = useState([]);


    useEffect( () =>{
         
      (
        async () =>{
          const {data} = await axios.get('http://localhost:9090/issue/get/');  
          setData(data);
          console.log(data)
        }
      )();

    },[]);  

    const [issue, setIssue] = useState([]);
     
    
    useEffect(() =>{
        if (issue_id){
            getSingleIssue(issue_id);
        }
    },[issue_id]);

    const getSingleIssue = async (issue_id) =>{
        const issue = await axios.get('http://localhost:9090/issue/get/${issue_id}');
            setIssue(issue);
            console.log(issue)
            navigate('/view')
        
    }

    

  return (
    <>
    {success ?(
      <section>
        <h1>Issue Added Successfuly!</h1> <br/><p>
        <a href="/home"> Go to Home</a>
        </p>
      </section>
    ):(
    
    <section>
      <div className='card'>
        <div>
        <label className='ulabel'>User Name:{user_fname}</label><button className='btn1'
        onClick={() =>{
          localStorage.clear()
          navigate('/')
        }}>Logout</button>
        </div>
      </div>
        <br></br>
      <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Notification</th>
        
      </tr>
    </thead>
    <tbody>
       {notification && notification.map((item,index) =>{
         return (
             <tr key={index}>
              <th scope='row'>{item.not_id}</th>
              <td>{item.notification}</td>
              
             </tr>
         );
       })}
    </tbody>
  </Table>
    </section>
    )}
    </>
  )
}

export default NotiScreen