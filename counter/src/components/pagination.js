import React from 'react'
import {Nav} from 'react-bootstrap'

const Pagination =({issuePerPage, totalIssues, paginate}) =>{

    const pageNumbers =[];

    for (let i =1; i<= Math.ceil(totalIssues/ issuePerPage);i++){
        pageNumbers.push(i);

    }
        return(
            <Nav>
                <ul className='pagination'>
                    {pageNumbers.map(number =>(
                        <li key={number} className="page-item"><a onClick={() => paginate(number)} href="#" className='page-link'>{number}</a></li>
                    ))}
                </ul>

            </Nav>
        )
    

};

export default Pagination;