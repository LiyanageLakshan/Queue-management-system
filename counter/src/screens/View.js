import { useState , useEffect, useRef ,useContext} from 'react'

import '../App.css';

import {Form , Button , Table , Card} from 'react-bootstrap'

import FormContainer from '../components/FormContainer'

import axios from '../axios';
//import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { isConstructorDeclaration } from 'typescript';

const URL = 'http://localhost:9090';


const IssueScreen = () => {

  const [user_fname, setUsername] = useState('');

    const userRef = useRef();

    const navigate = useNavigate()

    const errRef = useRef();

    const [user_contact, setContact] = useState('')
    

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect (() => {
      if(!localStorage.getItem('token')){
        navigate('/')
      }
    },[])  

   

    useEffect( () =>{
         
      (
        async () =>{
          const {data} = await axios.get(`${URL}/counteruser/auth`);  
          setUsername(data.counter_u_name);
          console.log(data)
        }
      )();

    },[]);  
   
    const [data, setData] = useState([]);

    const {issue_id} = useParams([]);

    

  /*  useEffect( () =>{
         
      (
        async ( ) =>{
          const {data} = await axios.get(`http://localhost:9090/issue/get/${issue_id}`);  
          setData(data);
          console.log(data)
        }
      )();

    },[]);  
 */
    const [issue, setIssue] = useState([]);
    
     
    
    useEffect(() =>{
        if (issue_id){
            getSingleIssue(issue_id);
        }
    },[issue_id]);

    const getSingleIssue = async () =>{
        const issue = await axios.get(`${URL}/issue/get/${issue_id}`);
            setIssue(issue.data);
            console.log(issue.data)
        
    }
   
  
    const newid = issue_id 
    
    const [nextissue, setNextIssue] = useState([]);
    const handleNextClick = async ()=>{
      //console.log("Next")     
      (
        async () =>{
          const data = await axios.get(`${URL}/issue/next/${newid} `);  
          setNextIssue(data.data);
          console.log(data.data)
          navigate(`/view/${data.data.issue_id} `)
          setSuccess(true)
        }
      )();

     
    }

    const handledoneClick = async ()=>{
      //console.log("Next")     
      (
        async () =>{
          const done = await axios.get(`${URL}/issue/update/${issue_id}`);
          console.log(done)
          navigate(`/viewissue `)
        }
      )();

     
    }

  return (
    <>
    {success ?(
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

          <Card style={{ width: '18rem' }}>
     
     <Card.Body>
       <Card.Title>Card Title</Card.Title>
       <Card.Text>
           <strong>{nextissue.issue}</strong>
        
       </Card.Text>
       <Button variant="info" onClick={handledoneClick} issue_id={nextissue.issue_id} >Done</Button> <Button variant="danger" onClick={handleNextClick} issue_id={newid}>Next</Button> 

     </Card.Body>
   </Card>
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

     <Card style={{ width: '18rem' }}>
     
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
            <strong>{issue.issue}</strong>
         
        </Card.Text>
        <Button variant="info" onClick={handledoneClick} issue_id={issue.issue_id} >Done</Button> <Button variant="danger" onClick={handleNextClick} issue_id={newid}>Next</Button> 

      </Card.Body>
    </Card>
    
    </section>
    )}
    </>
  )
}

export default IssueScreen