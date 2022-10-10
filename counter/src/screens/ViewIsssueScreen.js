import {SyntheticEvent, useState , useEffect, useRef } from 'react'

import '../App.css';

import {Form , Button , Table} from 'react-bootstrap'



//import axios from '../axios';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

import Pagination from '../components/pagination';

const AddIssueScreen = () => {

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

    useEffect( () =>{
         
      (
        async () =>{
          const {data} = await axios.get('http://localhost:9090/counteruser/auth');  
          setUsername(data.counter_u_name);
          console.log(data)
        }
      )();

    },[]);  
   
    const [data, setData] = useState();

    const [issues, setIssue] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [issuePerPage, setIssuePrePage]= useState(4);
    useEffect( () =>{
         
      (
        async () =>{
          setLoading(true);
          const res = await axios.get('http://localhost:9090/issue/get/');  
          setIssue(res.data);
          setLoading(false)
         // console.log(res.data)
        }
      )();
      
    },[]);  

   console.log(issues)
    useEffect(() =>{
        if (issue_id){
            getSingleIssue(issue_id);
        }
    },[issue_id]);

    const getSingleIssue = async (issue_id) =>{
        const issue = await axios.get(`http://localhost:9090/issue/get/${issue_id}` );
            setIssue(issue);
            console.log(issue)
            navigate(`/view/${issue_id}`)
        
    }  
const indexOfLastIssue = currentPage * issuePerPage;
const indexOfFirstIssue = indexOfLastIssue - issuePerPage;
const currentIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue);

const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <th>User Contact</th>
        <th>Issue</th>
        <th>Queue No</th>
        <th>Action</th>
      </tr>
    </thead>

    
    <tbody>
       { currentIssues.length >0 && currentIssues.map(function (item,key) {

         return (
             <tr key={key}>
              <th scope='row'>{item.issue_id}</th>
              <td>{item.u_contact_no}</td>
              <td>{item.issue}</td>
              <td>{item.queue_no}</td>
              <td>
         
            <Button variant="primary" onClick={() =>
          navigate('/view')
        } >View</Button> <Button variant="success" onClick={() => getSingleIssue(item.issue_id)} issue_id={item.issue_id}>Call</Button>
            
          </td>
             </tr>
         );
       })}
    </tbody>

  </Table>
  <Pagination issuePerPage={issuePerPage} totalIssues={issues.length} paginate={paginate}/>
    </section>
    )}
    </>
  )
}

export default AddIssueScreen