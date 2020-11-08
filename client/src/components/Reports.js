import React from 'react';
import './reports.css'
import { isAuth } from '../helpers/auth';
import { Redirect,Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


class Appointment extends React.Component{
render(){
    return(
        <div>
            {isAuth() ? null : toast.error('Please Sign in First')}
                {isAuth() ? null : <Redirect to="/loginmain"/>}
                <ToastContainer/>
                <div class="marqee">
                   <li class="list-inline">
                    COVID-19 Helpline: 011-44444444, 011-44444445, 011-44444446, +91-9999999991, +91-9999999992
                   </li>
                </div>
                <div class="findadoc"> 
                    <h2> YOUR REPORTS </h2>
                </div>
                <div class="picconemerp shadow">
                        <div class = "picccc rounded"> 
                       
                       </div>
                    
                </div>
                {/* <div class="contentf" style={{marginTop:"25px",textAlign:"-webkit-center"}}>
                    
                    <p style={{textAlign:"left"}}> Currently you have no Due Reports. </p>
                    
                </div> */}
                <div class="row contentf">
                    <div class="report">
                        <h3> Reports </h3>
                    </div>
                    <div class="borderr col-12"></div>                    
                    <p class="justify">
                        Currently you have no Due Reports. To Book an Appointment <Link to="/appointment" class="hover:no-underline"> click here</Link>.
                    </p>
                </div>
        </div>
    )
}
};
export default Appointment;