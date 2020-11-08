import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './mdoctors.css'
class ManageStaff extends React.Component {
  state={
    details:[],
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    textchange: 'Submit',
    number: '',
    designation: '',
    shift: ''
  }
  myfn = id => (e) => {
    axios.post(`${process.env.REACT_APP_API_URL}/deleteStaff`,{id:id});
      alert('Staff has been removed. Please Refresh');
  }
  handleChange = text => (e) => {
    this.setState({ [text]: e.target.value });
}
handleSubmit = (e) =>{
    e.preventDefault();
    this.setState({textchange:'Submitting'});
    
    const FName = this.state.firstname;
    const LName = this.state.lastname;
    const Email = this.state.email;
    const Shift = this.state.shift;
    const Gender = this.state.gender;
    const Number = this.state.number;
    const Designation = this.state.designation
    
    if (Email && FName && LName && Shift && Number && Gender && Designation) {
        axios.post(`${process.env.REACT_APP_API_URL}/addstaff`, {email:Email,first_name:FName,last_name: LName,number:Number,gender:Gender,shift:Shift,designation:Designation}).then(res => {
              this.setState({email:''});
              this.setState({firstname:''});
              this.setState({lastname:''});
              this.setState({shift:''});
              this.setState({number:''});
              this.setState({gender:''});
              this.setState({designation:''});
              
              toast.success(`Staff added Successfully. Please Refresh`);
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
  CustomCard = ({id,fname,lname, email, shift, number, designation }) => {
    return (
      <div>
        
                    <div class="card">
                            
                            <div class="card-body">
                                <h4 class="card-title" style={{textAlign:"center"}}> {fname}  {lname} </h4>
                            </div>
                            <ul class="list-group list-group-flush" style={{fontSize:"13pt"}}>
                            <li class="deets"> &nbsp; <i class="far fa-building"></i> Designation: {designation}  </li>
                                <li class="deets"> &nbsp; <i class="fas fa-phone-square-alt"></i> Contact: {number}  </li>
                                <li class="deets"> &nbsp; <i class="fas fa-envelope-square"></i> Email: {email} </li>
                                <li class="deets"> &nbsp; <i class="far fa-address-card"></i> Shift: {shift} </li>
                            </ul>
                            <div class="card-body row">
                                <button onClick={this.myfn(id)} type="submit" style={{textAlign:"center",flex:"auto"}}  class="tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"> Remove </button>
                            </div>
                    </div>          
     
      </div>
    );
  };
  componentDidMount(){
        
    axios.get(`${process.env.REACT_APP_API_URL}/staff`).then(res => {
        console.log(res.data);
        this.setState({details:res.data});
                      
    })
    .catch(err => {
     console.log(err.response)
     toast.error(err.response.data.errors);
   });
};
    render() {
      const details = this.state.details;
      return (
        <div>
          <ToastContainer/>
            <div class="findadoc"> 
                    <h2> MANAGE STAFF </h2>
            </div>
            <div class="row content">
                    <div class="ourstory">
                        <h3> Staff </h3>
                    </div>
                    
                    <div class="borderr col-12" style={{paddingBottom:"15px"}}></div> 
                    <div class="col-12">
                      <input type="checkbox" id="check1">

                      </input>
                      <label for="check1" class="checkbtn1">
                        <h4> <i class="fas fa-plus"> </i> Add a Staff Member </h4>
                      </label>
                      

                        <form style={{paddingTop:"10px",marginTop:"10px",paddingBottom:"10px",marginBottom:"10px"}} class="rounded  card" id="formmm" onSubmit={this.handleSubmit}>
                            <div class="contentf">
                                <h3 style={{textAlign:"center",paddingTop:"10px",paddingBottom:"20px"}}> STAFF DETAILS </h3>
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label> First Name* </label>
                                        <input onChange={this.handleChange('firstname')} type="text" class="form-control" value = {this.state.firstname} placeholder="Please enter First Name"/>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label> Last Name* </label>
                                        <input onChange={this.handleChange('lastname')} type="text" class="form-control" value = {this.state.lastname} placeholder="Please enter Last Name"/>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label> Email* </label>
                                        <input onChange={this.handleChange('email')} type="email" class="form-control" value = {this.state.email} placeholder="Please enter Email"/>
                                    </div>
                                </div>
                            
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label> Shift* </label>
                                        <input onChange={this.handleChange('shift')} type="text" class="form-control" value = {this.state.shift} placeholder="Please enter Shift timings"/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label>Gender*</label>
                                        <input onChange={this.handleChange('gender')} type="text" class="form-control" value = {this.state.gender} placeholder="Please enter Gender"/>
                                    </div>
                                    <div class="form-group col-md-6">
                                      <label > Phone Number* </label>
                                      <input onChange={this.handleChange('number')} type="tel" class="form-control" value = {this.state.number} placeholder="Please enter Phone Number"/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label>Designation*</label>
                                        <input onChange={this.handleChange('designation')} type="text" class="form-control" value = {this.state.designation} placeholder="Please enter Designation"/>
                                    </div>
                                    
                                </div>
                                
                                <button type = "submit" class="btn btn-primary col" style={{textAlign:"center"}}> {this.state.textchange} </button>
                            </div>
                        </form>            
                    

                    </div>
                      
                        {details.map((item, index) => {
                            return (
                            <div className="col-md-4 col-sm-6" style={{padding:"10px"}}>
                                <this.CustomCard
                                id = {item._id}
                                fname={item.first_name}
                                lname={item.last_name}    
                                email={item.email}                                
                                shift={item.shift}
                                number={item.number}
                                gender={item.gender}
                                designation={item.designation}
                                />
                            </div>
                        )
                    })}  
            
            </div>

        </div>
      )
    }
}
export default ManageStaff;