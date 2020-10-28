import React from 'react';
import './contactus.css';
import {Link} from 'react-router-dom'
import '../assets/hospital.jpg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

class ContactUs extends React.Component {
    state={
        name: '',
        email: '',
        address: '',
        number: '',
        comment: '',
        city: '',
        statee: '',
        zip: '',
        textchange: 'Submit'
    }

    handleChange = text => (e) => {
        this.setState({ [text]: e.target.value });
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({textchange:'Submitting'});
        
        const Name = this.state.name;
        const Email = this.state.email;
        const Address = this.state.address;
        const Comment = this.state.comment;
        const Statee = this.state.statee;
        const City = this.state.city;
        const Number = this.state.number;
        const Zip = this.state.zip
        
        if (Email && Name && Address && Number && Comment && City && Statee && Zip) {
            axios.post(`${process.env.REACT_APP_API_URL}/query`, {email:Email,name:Name,number:Number,city:City,statee:Statee,comment:Comment,address:Address,zip:Zip}).then(res => {
                  this.setState({email:''});
                  this.setState({name:''});
                  this.setState({address:''});
                  this.setState({number:''});
                  this.setState({comment:''});
                  this.setState({city:''});
                  this.setState({statee:''});
                  this.setState({zip:''});
                  
                  toast.success(`Thank You! Your Query will be processed`);
              })
              .catch(err => {
               console.log(err.response)
               toast.error(err.response.data.error);
             });
         } else {
           toast.error('Please fill all fields');
         }
         this.setState({textchange:'Submit'});
    }
    render(){
        return(
            <div>
                <ToastContainer />
                <div class="marqee">
                   <li class="list-inline">
                      COVID-19 Helpline: 011-42253001, 011-42253002, 011-42253003, +91-9818840984, +91-9311407392, 9311407393
                   </li>
                </div>
                <div class = "contactus responsive">
                    <h2> CONTACT US </h2>
                </div>
                <div class="cont shadow">
                    <div class = "contpic rounded">
                       
                    </div>
                </div>
                <div class="row contentf">
                    <div class="col-xl-4" style={{paddingTop:"10px"}}>
                        <div class="card">
                            
                            <div class="card-body">
                                <h5 class="card-title" style={{textAlign:"center"}}> HOSPITAL LOCATION </h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li style={{textAlign:"center",flex:"auto"}}> &nbsp; <i class="fas fa-map-marker-alt"></i> No.46,7th street, Tansi Nagar, Velachery, Chennai - 600042 </li> <br/>
                                <li style={{textAlign:"center",flex:"auto"}}> &nbsp; <i class="fas fa-phone-square-alt"></i> +91-44-22432370 / 3370 </li> <br/>
                                <li style={{textAlign:"center",flex:"auto"}}> &nbsp; <i class="fas fa-envelope-square"></i> hospital@hpms.com </li>
                            </ul>
                            <div class="card-body row">
                                <Link to='/appointment' class="card-link" style={{textAlign:"center",flex:"auto"}}> Book Appointment </Link>
                            </div>
                        </div> 
                    </div>
                    <div class="col-xl-8">

                        <form style={{paddingTop:"10px",marginTop:"10px",paddingBottom:"10px",marginBottom:"10px"}} class="rounded  card" onSubmit={this.handleSubmit}>
                            <div class="content">
                                <h3 style={{textAlign:"center",paddingTop:"10px",paddingBottom:"20px"}}> ENQUIRY FORM </h3>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label> Name* </label>
                                        <input onChange={this.handleChange('name')} type="text" class="form-control" value = {this.state.name} placeholder="Please enter your Name"/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label> Email* </label>
                                        <input onChange={this.handleChange('email')} type="email" class="form-control" value = {this.state.email} placeholder="Please enter your Email"/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label> Address* </label>
                                    <input onChange={this.handleChange('address')} type="text" class="form-control" value = {this.state.address} placeholder="Please enter your Address"/>
                                </div>
                                <div class="form-group">
                                    <label > Phone Number* </label>
                                    <input onChange={this.handleChange('number')} type="tel" class="form-control" value = {this.state.number} placeholder="Please enter your phone number"/>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label>City*</label>
                                        <input onChange={this.handleChange('city')} type="text" class="form-control" value = {this.state.city}/>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label>State*</label>
                                        <input onChange={this.handleChange('statee')} type="text" class="form-control" value = {this.state.statee}/>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label>Zip*</label>
                                        <input onChange={this.handleChange('zip')} type="text" class="form-control" value = {this.state.zip}/>
                                    </div>
                                    <div class="form-group col">
                                        <label> Comment* </label>
                                        <input onChange={this.handleChange('comment')} type="text" class="form-control" value = {this.state.comment} placeholder="Please enter your Query"/>
                                    </div>
                                </div>
                                
                                <button type = "submit" class="btn btn-primary col" style={{textAlign:"center"}}> {this.state.textchange} </button>
                            </div>
                        </form>            
                    </div>
                </div>
            </div>
        )
    }
}
export default ContactUs;


                        