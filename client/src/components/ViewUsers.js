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
      alert('Patient has been removed. Please Refresh');
  }

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
                    <h2> VIEW PATIENTS </h2>
            </div>
            <div class="row content">
                    <div class="ourstory">
                        <h3> Patients </h3>
                    </div>
                    
                    <div class="borderr col-12" style={{paddingBottom:"15px"}}></div> 
                    <div class="col-12">
                      
                    </div>
                      
                        {details.map((item, index) => {
                          if(item.role==='patient'){
                            return (
                            <div className="col-md-4 col-sm-6" style={{padding:"10px"}}>
                                <this.CustomCard
                                id = {item._id}
                                name={item.name}    
                                email={item.email}                                
                                role={item.role}
                                />
                            </div>
                        )}
                        else return null
                    })}  
            
            </div>

        </div>
      )
    }
}
export default ViewUsers;