import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class ManageDoctors extends React.Component {
  state={
    details:[]
  }
  myfn = id => (e) => {
    console.log(id)  
    axios.post(`${process.env.REACT_APP_API_URL}/deleteDoctor`,{id:id});
      alert('Doctor has been removed');
  }

  CustomCard = ({id,name, email, address, number, speciality }) => {
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
                                <button onClick={this.myfn(id)} type="submit" style={{textAlign:"center",flex:"auto"}}  class="tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"> Remove </button>
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
    render() {
      const details = this.state.details;
      return (
        <div>
          <ToastContainer/>
            <div class="findadoc"> 
                    <h2> MANAGE DOCTORS </h2>
            </div>
            <div class="row content">
                    <div class="ourstory">
                        <h3> Doctors </h3>
                    </div>
                    <div class="borderr col-12" style={{paddingBottom:"15px"}}></div> 
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
                                id = {item._id}
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
      )
    }
}
export default ManageDoctors;