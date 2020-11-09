import React from 'react';
import './contactus.css';
import '../assets/hospital.jpg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

class ManageReports extends React.Component {
    state={
        name: '',
        email: '',
        symptoms: '',
        number: '',
        gender: '',
        department: '',
        insurance: '',
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
        const Symptoms = this.state.symptoms;
        const Gender = this.state.gender;
        const Department = this.state.department;
        const Number = this.state.number;
        const Insurance = this.state.insurance
        
        if (Email && Name && Symptoms && Number && Gender && Department && Insurance) {
            axios.post(`${process.env.REACT_APP_API_URL}/addreport`, {email:Email,name:Name,number:Number,department:Department,gender:Gender,symptoms:Symptoms,insurance:Insurance}).then(res => {
                  this.setState({email:''});
                  this.setState({name:''});
                  this.setState({symptoms:''});
                  this.setState({number:''});
                  this.setState({gender:''});
                  this.setState({department:''});
                  this.setState({insurance:''});
                  
                  toast.success(`Report added`);
              })
              .catch(err => {
               console.log(err.response)
               toast.error(err.response.data.errors);
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
                
                <div class = "contactus responsive">
                    <h2> ADD REPORTS </h2>
                </div>
                
                <div class="row contentf">
                    <div class="col-12">

                        <form style={{paddingTop:"10px",marginTop:"10px",paddingBottom:"10px",marginBottom:"10px"}} class="rounded  card" onSubmit={this.handleSubmit}>
                            <div class="contentf">
                                <h3 style={{textAlign:"center",paddingTop:"10px",paddingBottom:"20px"}}> REPORT FORM </h3>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label> Name* </label>
                                        <input onChange={this.handleChange('name')} type="text" class="form-control" value = {this.state.name} placeholder="Please enter Name"/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label> Email* </label>
                                        <input onChange={this.handleChange('email')} type="email" class="form-control" value = {this.state.email} placeholder="Please enter Email"/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label> Symptoms* </label>
                                    <input onChange={this.handleChange('symptoms')} type="text" class="form-control" value = {this.state.symptoms} placeholder="Please enter Symptoms"/>
                                </div>
                                <div class="form-group">
                                    <label > Phone Number* </label>
                                    <input onChange={this.handleChange('number')} type="tel" class="form-control" value = {this.state.number} placeholder="Please enter phone number"/>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label>Department*</label>
                                        <input onChange={this.handleChange('department')} type="text" class="form-control" value = {this.state.department} placeholder="Please enter Department"/>
                                    </div>
                                   
                                    <div class="form-group col-md-4">
                                        <label>Insurance*</label>
                                        <input onChange={this.handleChange('insurance')} type="text" class="form-control" value = {this.state.insurance} placeholder="Insurance?"/>
                                    </div>
                                    <div class="form-group col">
                                        <label> Gender* </label>
                                        <input onChange={this.handleChange('gender')} type="text" class="form-control" value = {this.state.gender} placeholder="Please enter Gender"/>
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
export default ManageReports;


                        