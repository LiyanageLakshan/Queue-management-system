import React, {useState, useEffect} from 'react';


import {Link} from "react-router-dom";

import "../App.css";

import {toast} from "react-toastify";
import axios from "axios";
import { Table } from 'react-bootstrap';


const HomeScreen = () => {

  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get('http://localhost:9090/issue/get');
    setData(response.data);
  }

  useEffect(() => {
    loadData();
  },[]);

  return (

    <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>User Contact</th>
        <th>Issue</th>
        <th>Queue No</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item,index) => {
        return(
          <tr >
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>

        )
      })}
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <td>3</td>
        <td colSpan={2}>Larry the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </Table>

  )
}

export default HomeScreen