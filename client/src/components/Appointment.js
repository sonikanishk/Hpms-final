import React from 'react';
import './appointment.css'
import { isAuth } from '../helpers/auth';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function myfn() {
    return(
        alert('Appointment Booked for Tommorow 1pm')
    )
}

class Appointment extends React.Component{
    state={
        department: 'All',
        name: '',
        textch: 'Submit',
        details:[]
    }

    handleChange = text => (e) => {
        this.setState({ [text]: e.target.value });
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({textch:'Submitting'});
        
        const Name = this.state.name;
        const Department = this.state.department;
        
    
        if (Department || Name) {
            axios.post(`${process.env.REACT_APP_API_URL}/doc`, {department:Department,name:Name}).then(res => {
                  this.setState({details:res.data}); 
                  this.setState({textch:'Submit'});
              })
              .catch(err => {
               console.log(err.response)
               toast.error(err.response.data.error);
               this.setState({textch:'Submit'});
             });
         } else {
           toast.error('Please Select a different Department or Name');
           this.setState({textch:'Submit'});
         }   
    }
    CustomCard = ({ name, email, address, number, speciality }) => {
        return (
          <div>
            
                        <div class="card">
                                
                                <div class="card-body">
                                    <h4 class="card-title" style={{textAlign:"center"}}> {name} </h4>
                                </div>
                                <ul class="list-group list-group-flush" style={{fontSize:"13pt"}}>
                                    
                                    <li class="deets"> &nbsp; <i class="far fa-building"></i> Department: {speciality}  </li>
                                    <li class="deets"> &nbsp; <i class="fas fa-phone-square-alt"></i> Contact: {number}  </li>
                                    <li class="deets"> &nbsp; <i class="fas fa-envelope-square"></i> Email: {email} </li> 
                                    <li class="deets"> &nbsp; <i class="far fa-address-card"></i> Address: {address} </li> 
                                    
                                </ul>
                                <div class="card-body row">
                                    <button onClick={myfn} type="submit" style={{textAlign:"center",flex:"auto"}}  class="tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"> Book Appointment </button>
                                </div>
                        </div>          
         
          </div>
        );
      };
    componentDidMount(){
        
        axios.get(`${process.env.REACT_APP_API_URL}/doctors`).then(res => {
            
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
                    <h2> FIND A DOCTOR </h2>
                </div> 
                <div class="contentf" style={{marginTop:"25px"}}>
                    <form onSubmit={this.handleSubmit}>                    
                    <div class="row">
                        
                        <div class = "col-md-5">
                            <label>Department</label>
                            <select class="form-control" onChange={this.handleChange('department')}>
                                <option selected>All</option>
                                <option>Cardiac Sciences</option>
                                <option>Cancer care</option>
                                <option>Dermitology</option>
                                <option>Diabetic care</option>
                                <option>Gynaecology</option>
                                <option>Neurosciences</option>
                                <option>Orthopaedics</option>
                                <option>Pathology</option>
                                <option>Radiology</option>
                                <option>Urology</option>   
                            </select>
                        </div>
                        <div class="form-group col-md-5">
                            <label>Search by Name</label>
                            <input type="text" class="form-control" placeholder="Please Enter Name" onChange={this.handleChange('name')}/>
                        </div>
                        <div class="col-md-2">
                            <button type="submit" style = {{marginTop:"30pt"}} class="tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"> {this.state.textch} </button>
                        </div>
                        
                    </div>
                    </form>
                    <div class="row">
                        {details.length === 0?this.state.name!==''?
                        
                        <div style={{padding:"10px"}}> Sorry we could not find any Results. Please check the Name or try something else. </div>
                        
                        :
                        null
                        :null
                        }
                        {details.map((item, index) => {
                            return (
                            <div className="col-md-4 col-sm-6" style={{padding:"10px"}}>
                                <this.CustomCard
                                name={item.name}    
                                email={item.email}
                                
                                address={item.address}
                                number={item.phone}
                                speciality={item.speciality}
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
export default Appointment;

