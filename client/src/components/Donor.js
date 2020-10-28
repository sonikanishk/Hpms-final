import React from 'react';
import './appointment.css'
import { isAuth } from '../helpers/auth';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function myfn() {
    return(
        alert('Message has been sent to Donor')
    )
}
class Donor extends React.Component{
    state={
        bloodgrp: 'All',
        organ: 'All',
        textch: 'Submit',
        details:[]
    }

    handleChange = text => (e) => {
        this.setState({ [text]: e.target.value });
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({textch:'Submitting'});
        
        const Organ = this.state.organ;
        const Bloodgrp = this.state.bloodgrp;
        
        if (Bloodgrp || Organ) {
            axios.post(`${process.env.REACT_APP_API_URL}/donors`, {bloodgrp:Bloodgrp,organ:Organ}).then(res => {
                  console.log(res.data);  
                  this.setState({details:res.data}); 
                  this.setState({textch:'Submit'});
              })
              .catch(err => {
               console.log(err.response)
               toast.error(err.response.data.error);
               this.setState({textch:'Submit'});
             });
         } else {
           toast.error('Invalid Request');
           this.setState({textch:'Submit'});
         }   
    }
    CustomCard = ({ name,lname, email, gender, number, blood_grp,organ }) => {
        return (
          <div>
            
                        <div class="card">
                                
                                <div class="card-body">
                                    <h4 class="card-title" style={{textAlign:"center"}}> {name} {lname} </h4>
                                </div>
                                <ul class="list-group list-group-flush" style={{fontSize:"13pt"}}>
                                    
                                    <li class="deets"> &nbsp; <i class="far fa-building"></i> Blood Group: {blood_grp}  </li>
                                    <li class="deets"> &nbsp; <i class="fas fa-phone-square-alt"></i> Contact: {number}  </li>
                                    <li class="deets"> &nbsp; <i class="fas fa-envelope-square"></i> Email: {email} </li> 
                                    <li class="deets"> &nbsp; <i class="fas fa-venus-mars"></i> Gender: {gender} </li> 
                                    
                                    <li class="deets"> &nbsp; <i class="fas fa-lungs"></i> Organ: {organ} </li> 

                                    
                                    
                                </ul>
                                <div class="card-body row">
                                    <button onClick={myfn} type="submit" style={{textAlign:"center",flex:"auto"}}  class="tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"> Approach </button>
                                </div>
                        </div>          
         
          </div>
        );
      };
    componentDidMount(){
        
        axios.get(`${process.env.REACT_APP_API_URL}/donor`).then(res => {
            
            this.setState({details:res.data});
                          
        })
        .catch(err => {
         console.log(err.response)
         toast.error(err.response.data.error);
       });
    };
    render(){
        const details = this.state.details;
        return(
            <div>
                
                {isAuth() ? null : toast.error('Please Sign in First')}
                {isAuth() ? null : <Redirect to="/loginmain"/>}
                <ToastContainer/>
                <div class="marqee">
                   <li class="list-inline">
                       COVID-19 Helpline: 011-42253001, 011-42253002, 011-42253003, +91-9818840984, +91-9311407392, 9311407393
                   </li>
                </div>
                <div class="findadoc"> 
                    <h2> FIND A DONOR </h2>
                </div> 
                <div class="contentf" style={{marginTop:"25px"}}>
                    <form onSubmit={this.handleSubmit}>                    
                    <div class="row">
                        
                        <div class = "col-md-5">
                            <label>Blood Group</label>
                            <select  class="form-control" onChange={this.handleChange('bloodgrp')}>
                                <option selected>All</option>
                                <option>A+</option>
                                <option>A-</option>
                                <option>B+</option>
                                <option>B-</option>
                                <option>AB+</option>
                                <option>AB-</option>
                                <option>O+</option>
                                <option>O-</option>
                            </select>
                        </div>
                        <div class = "col-md-5">
                            <label>Organ</label>
                            <select class="form-control" onChange={this.handleChange('organ')}>
                                <option selected>All</option>
                                <option>eyes</option>
                                <option>liver</option>
                                <option>kidney</option>
                                <option>tissues</option>
                                <option>bone marrow</option>
                                <option>plazma</option>
                                <option>blood</option>   
                            </select>
                        </div>
                        
                        <div class="col-md-2">
                            <button type="submit" style = {{marginTop:"30pt"}} class="tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"> {this.state.textch} </button>
                        </div>
                        
                    </div>
                    </form>
                    <div class="row">
                        
                        {details.length === 0?this.state.organ!=='All'?
                        
                        <div style={{padding:"10px"}}> Sorry we could not find any Results. Please check the Name or try something else. </div>
                        
                        :
                        null
                        :null
                        }
                        {details.map((item, index) => {
                            return (
                            <div className="col-md-4 col-sm-6" style={{padding:"10px"}}>
                                <this.CustomCard
                                name={item.first_name}
                                lname = {item.last_name}   
                                email={item.email}
                                gender={item.gender}
                                number={item.number}
                                blood_grp={item.blood_group}
                                organ = {item.organ}
                                />
                            </div>
                        )
                    })}
                    
                    </div>
                </div>
            </div>
        )
    }
}
export default Donor;

