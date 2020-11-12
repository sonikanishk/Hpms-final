import React from 'react';
import './reports.css'
import { isAuth,signout } from '../helpers/auth';
import { Redirect,Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'


class Appointment extends React.Component{
    state={
        userdetails:{},
        reportdetails: []
    }
    componentDidMount(){
        if(isAuth()){
        axios.get(`${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`, {
            headers: {
            Authorization: `Bearer ${this.state.token}`
            }
        })
        .then(res => {
            const deets = res.data;
            this.setState({userdetails:deets});
            return axios.post(`${process.env.REACT_APP_API_URL}/getreports`,{email:this.state.userdetails.email}).then(res => {
                this.setState({reportdetails:res.data});
                // console.log(this.state.reportdetails);
                
            })
            .catch(err => {
             console.log(err.response)
             toast.error(err.response.data.errors);
           });
            
        })
        .catch(err => {
            toast.error(`Error To Your Information ${err.response.statusText}`);
            if (err.response.status === 401) {
            signout(() => {
                
            });
            }
        });
        }
    };
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
                
                <div class="row contentf">
                    <div class="report">
                        <h3> Reports </h3>
                    </div>
                    <div class="borderr col-12"></div>   
                    {
                        this.state.reportdetails.length !== 0?
                            <div style={{margin: "5px"}}>
                                Your Reports are ready click here to <Link to="/viewreports"> <button type="submit" class="tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"> View </button> </Link>
                            </div>
                        :
                        <p class="justify">
                            Currently you have no Due Reports. To Book an Appointment <Link to="/appointment" class="hover:no-underline"> click here </Link>.
                        </p>
                    }                 
                   
                
                </div>
        </div>
    )
}
};
export default Appointment;