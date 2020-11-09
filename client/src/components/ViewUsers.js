import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './mdoctors.css'
class ViewUsers extends React.Component {
  state={
    details:[],
    name: '',
    email: '',
    gender: '',
    textchange: 'Submit',
    number: '',
    address: '',
    speciality: ''
  }
  myfn = id => (e) => {
    
    axios.post(`${process.env.REACT_APP_API_URL}/removeUser`,{id:id});
      alert('User has been removed. Please Refresh');
  }
//   handleChange = text => (e) => {
//     this.setState({ [text]: e.target.value });
// }
// handleSubmit = (e) =>{
//     e.preventDefault();
//     this.setState({textchange:'Submitting'});
    
//     const Name = this.state.name;
//     const Email = this.state.email;
//     const Address = this.state.address;
//     const Gender = this.state.gender;
//     const Number = this.state.number;
//     const Speciality = this.state.speciality
    
//     if (Email && Name && Address && Number && Gender && Speciality) {
//         axios.post(`${process.env.REACT_APP_API_URL}/adddoctor`, {email:Email,name:Name,phone:Number,gender:Gender,address:Address,speciality:Speciality}).then(res => {
//               this.setState({email:''});
//               this.setState({name:''});
//               this.setState({address:''});
//               this.setState({number:''});
//               this.setState({gender:''});
//               this.setState({speciality:''});
              
//               toast.success(`Doctor added Successfully. Please Refresh`);
//           })
//           .catch(err => {
//            console.log(err.response)
//            toast.error(err.response.data.errors);
//          });
//      } else {
//        toast.error('Please fill all fields');
//      }
//      this.setState({textchange:'Submit'});
// }
  CustomCard = ({id,name, email, role}) => {
    return (
      <div>
        
                    <div class="card">
                            
                            <div class="card-body">
                                <h4 class="card-title" style={{textAlign:"center"}}> {name} </h4>
                            </div>
                            <ul class="list-group list-group-flush" style={{fontSize:"13pt"}}>
                                
                                <li class="deets"> &nbsp; <i class="fas fa-envelope-square"></i> Email: {email} </li> 
                                <li class="deets"> &nbsp; <i class="far fa-address-card"></i> Role: {role} </li> 
                                
                            </ul>
                            <div class="card-body row">
                                <button onClick={this.myfn(id)} type="submit" style={{textAlign:"center",flex:"auto"}}  class="tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"> Remove </button>
                            </div>
                    </div>          
     
      </div>
    );
  };
  componentDidMount(){
        
    axios.get(`${process.env.REACT_APP_API_URL}/users`).then(res => {
        
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
                    <h2> VIEW USERS </h2>
            </div>
            <div class="row content">
                    <div class="ourstory">
                        <h3> Users </h3>
                    </div>
                    
                    <div class="borderr col-12" style={{paddingBottom:"15px"}}></div> 
                    <div class="col-12">
                      {/* <button onClick={this.myfn1(id)} type="submit" style={{textAlign:"center",flex:"auto"}}  class="tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"> Add a Doctor </button> */}
                      {/* <input type="checkbox" id="check1">

                      </input>
                      <label for="check1" class="checkbtn1">
                        <h4> <i class="fas fa-plus"> </i> Add a Doctor </h4>
                      </label>
                      

                        <form style={{paddingTop:"10px",marginTop:"10px",paddingBottom:"10px",marginBottom:"10px"}} class="rounded  card" id="formmm" onSubmit={this.handleSubmit}>
                            <div class="contentf">
                                <h3 style={{textAlign:"center",paddingTop:"10px",paddingBottom:"20px"}}> DOCTOR DETAILS </h3>
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
                                    <label> Address* </label>
                                    <input onChange={this.handleChange('address')} type="text" class="form-control" value = {this.state.address} placeholder="Please enter Address"/>
                                </div>
                            
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label>Gender*</label>
                                        <input onChange={this.handleChange('gender')} type="text" class="form-control" value = {this.state.gender} placeholder="Please enter Gender"/>
                                    </div>
                                    <div class="form-group col-md-4">
                                      <label > Phone Number* </label>
                                      <input onChange={this.handleChange('number')} type="tel" class="form-control" value = {this.state.number} placeholder="Please enter Phone Number"/>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label>Speciality*</label>
                                        <input onChange={this.handleChange('speciality')} type="text" class="form-control" value = {this.state.speciality} placeholder="Please enter Speciality"/>
                                    </div>
                                    
                                </div>
                                
                                <button type = "submit" class="btn btn-primary col" style={{textAlign:"center"}}> {this.state.textchange} </button>
                            </div>
                        </form>             */}
                    

                    </div>
                      
                        {details.map((item, index) => {
                            return (
                            <div className="col-md-4 col-sm-6" style={{padding:"10px"}}>
                                <this.CustomCard
                                id = {item._id}
                                name={item.name}    
                                email={item.email}                                
                                role={item.role}
                                />
                            </div>
                        )
                    })}  
            
            </div>

        </div>
      )
    }
}
export default ViewUsers;