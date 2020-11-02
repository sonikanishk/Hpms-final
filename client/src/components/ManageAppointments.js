import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class ManageAppointments extends React.Component {
  state={
    details:[]
  }
  myfn = id => (e) => {
      axios.post(`${process.env.REACT_APP_API_URL}/cancelAppointment`,{id:id});
      toast.error('Appointment has been Canceled');
  }  
  CustomCard = ({ id,pname,email,drname,time }) => {
    return (
      <div>
        <div class="row border box1" style={{margin:"0px",padding:"5px"}}>               
            
            <span class="col-lg-3"> {pname} </span>
            <span class="col-lg-3"> {drname} </span>
            <span class="col-lg-3"> {email} </span>
            <span class="col-lg-2"> {time} </span>
            
            <button onClick={this.myfn(id)} type="submit" style={{textAlign:"center",flex:"auto"}}  class="tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none col-md-1"> Cancel </button>

        </div> 
        <div class="row border box2" style={{margin:"0px",padding:"5px"}}>               
            
            <span class="col-lg-3"> Patient: {pname} </span>
            <span class="col-lg-3"> For: {drname} </span>
            <span class="col-lg-3"> Patient Email: {email} </span>
            <span class="col-lg-2"> Time: {time} </span>
            
            <button onClick={this.myfn(id)} type="submit" style={{textAlign:"center",flex:"auto"}}  class="tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none col-md-1"> Cancel </button>

        </div>  
      </div>
    );
  };
  componentDidMount(){
        
    axios.get(`${process.env.REACT_APP_API_URL}/appointments`).then(res => {
        
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
                  <h2> MANAGE APPOINTMENTS </h2>
            </div>
            <div class="row content">
                    <div class="ourstory">
                        <h3> Appointments </h3>
                    </div>
                    <div class="borderr col-12" style={{paddingBottom:"15px"}}></div> 
                    <div class="top">  
                      <div class="col-3"> Patient Name</div>
                      <div class="col-3"> Doctor Name</div>
                      <div class="col-3"> Patient Email</div>
                      <div class="col-2"> Time </div>
                      <div class="col-1"> Cancel </div>
                    </div>
                    {details.map((item, index) => {
                            return (
                            <div class="col-12">
                              <div>
                                <this.CustomCard
                              
                                id = {item._id}
                                pname={item.pname} 
                                email={item.email}
                                drname = {item.drname}
                                time = {item.time}
                                />     
                            </div>
                          </div>
                        )
                    })}
            </div>
        </div>
      )
    }
}
export default ManageAppointments;