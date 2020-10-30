import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class ManageDonors extends React.Component {
  state={
    details:[]
  }
  myfn = id => (e) => {
      axios.post(`${process.env.REACT_APP_API_URL}/deleteDonor`,{id:id});
      alert('Donor has been deleted');
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
     toast.error(err.response.data.error);
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