import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class ManageDonors extends React.Component {
  state={
    details:[],
    fname: '',
    lname: '',
    blood_group: '',
    contact: '',
    email: '',
    gender: '',
    organ: '',
    textchange: 'Submit'
  }
  myfn = id => (e) => {
      axios.post(`${process.env.REACT_APP_API_URL}/deleteDonor`,{id:id});
      alert('Donor has been deleted');
  } 
  handleChange = text => (e) => {
    this.setState({ [text]: e.target.value });
}
handleSubmit = (e) =>{
    e.preventDefault();
    this.setState({textchange:'Submitting'});
    
    const FName = this.state.fname;
    const LName = this.state.lname;
    const Email = this.state.email;
    const Blood_group = this.state.blood_group;
    const Gender = this.state.gender;
    const Number = this.state.number;
    const Organ = this.state.organ
    
    if (Email && FName && LName && Blood_group && Number && Gender && Organ) {
        axios.post(`${process.env.REACT_APP_API_URL}/adddonor`, {email:Email,first_name:FName,last_name:LName,number:Number,gender:Gender,organ:Organ,blood_group:Blood_group}).then(res => {
              this.setState({email:''});
              this.setState({fname:''});
              this.setState({lname:''});
              this.setState({number:''});
              this.setState({gender:''});
              this.setState({organ:''});
              
              toast.success(`Donor added Successfully. Please Refresh`);
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
  CustomCard = ({ id,name,lname, email, gender, number, blood_grp,organ }) => {
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
                                <button onClick={this.myfn(id)} type="submit" style={{textAlign:"center",flex:"auto"}}  class="tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"> Delete </button>
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
     toast.error(err.response.data.errors);
   });
  };
    render() {
      const details = this.state.details;
      return (
        <div>
            <ToastContainer/>
            <div class = "aboutus">
                  <h2> MANAGE DONORS </h2>
            </div>
            <div class="row content">
                    <div class="ourstory">
                        <h3> Donors </h3>
                    </div>
                    <div class="borderr col-12" style={{paddingBottom:"15px"}}></div>
                    <div class="col-12">
                      {/* <button onClick={this.myfn1(id)} type="submit" style={{textAlign:"center",flex:"auto"}}  class="tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"> Add a Doctor </button> */}
                      <input type="checkbox" id="check1">

                      </input>
                      <label for="check1" class="checkbtn1">
                        <h4> <i class="fas fa-plus"> </i> Add a Donor </h4>
                      </label>
                      

                        <form style={{paddingTop:"10px",marginTop:"10px",paddingBottom:"10px",marginBottom:"10px"}} class="rounded  card" id="formmm" onSubmit={this.handleSubmit}>
                            <div class="contentf">
                                <h3 style={{textAlign:"center",paddingTop:"10px",paddingBottom:"20px"}}> DONOR DETAILS </h3>
                                <div class="form-row">
                                    <div class="form-group col-md-3">
                                        <label> First Name* </label>
                                        <input onChange={this.handleChange('fname')} type="text" class="form-control" value = {this.state.fname} placeholder="Please enter First Name"/>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label> Last Name* </label>
                                        <input onChange={this.handleChange('lname')} type="text" class="form-control" value = {this.state.lname} placeholder="Please enter Last Name"/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label> Email* </label>
                                        <input onChange={this.handleChange('email')} type="email" class="form-control" value = {this.state.email} placeholder="Please enter Email"/>
                                    </div>
                                </div>
                                
                            
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label>Gender*</label>
                                        <input onChange={this.handleChange('gender')} type="text" class="form-control" value = {this.state.gender} placeholder="Please enter Gender"/>
                                    </div>
                                    <div class="form-group col-md-6">
                                      <label > Phone Number* </label>
                                      <input onChange={this.handleChange('number')} type="tel" class="form-control" value = {this.state.number} placeholder="Please enter Phone Number"/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label>Organ*</label>
                                        <input onChange={this.handleChange('organ')} type="text" class="form-control" value = {this.state.organ} placeholder="Please enter Organ"/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label>Blood Group*</label>
                                        <input onChange={this.handleChange('blood_group')} type="text" class="form-control" value = {this.state.blood_group} placeholder="Please enter Blood Group"/>
                                    </div>
                                    
                                </div>
                                
                                <button type = "submit" class="btn btn-primary col" style={{textAlign:"center"}}> {this.state.textchange} </button>
                            </div>
                        </form>            
                    

                    </div>
                    <div class="row">
                        {details.map((item, index) => {
                            return (
                            <div className="col-md-4 col-sm-6" style={{padding:"10px"}}>
                                <this.CustomCard
                                id = {item._id}
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
export default ManageDonors;