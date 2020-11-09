import React from 'react';
import axios from'axios';
import { ToastContainer, toast } from 'react-toastify';
import {Link} from 'react-router-dom';
class Admin extends React.Component {
    state={
      doctors: [],
      appointments: [],
      queries: [],
      donors: [],
      users:[],
      staff: []
    }
    componentDidMount(){
      axios.get(`${process.env.REACT_APP_API_URL}/doctors`).then(res => {
            
            this.setState({doctors:res.data});
                          
        })
        .catch(err => {
        console.log(err.response)
        toast.error(err.response.data.errors);
      });
      axios.get(`${process.env.REACT_APP_API_URL}/donor`).then(res => {
                                
            this.setState({donors:res.data});
                          
        })
        .catch(err => {
        console.log(err.response)
        toast.error(err.response.data.errors);
      }); 
      axios.get(`${process.env.REACT_APP_API_URL}/appointments`).then(res => {
            
            this.setState({appointments:res.data});
                          
        })
        .catch(err => {
        console.log(err.response)
        toast.error(err.response.data.errors);
      }); 
      axios.get(`${process.env.REACT_APP_API_URL}/queries`).then(res => {
            
            this.setState({queries:res.data});
                          
        })
        .catch(err => {
        console.log(err.response)
        toast.error(err.response.data.errors);
      });
      axios.get(`${process.env.REACT_APP_API_URL}/users`).then(res => {
            
            this.setState({users:res.data});
                          
        })
        .catch(err => {
        console.log(err.response)
        toast.error(err.response.data.errors);
      });
      axios.get(`${process.env.REACT_APP_API_URL}/staff`).then(res => {
                
            this.setState({staff:res.data});
                          
        })
        .catch(err => {
        console.log(err.response)
        toast.error(err.response.data.errors);
      });
    }
    render() {
      return (
        <div>
            <ToastContainer/>
            <div class = "aboutus">
                <h2> WELCOME ADMIN </h2>
            </div>
            <div class="row contentf">
              <div class="col-md-4 col-sm-12">
                <div class="card text-white bg-success shadow" style={{padding: "10px",marginBottom: "10px",marginTop: "20px"}}>
                  <div class="card-header" style={{textAlign: "center"}}><h1> {this.state.users.length} &nbsp; <i class="fas fa-user-friends"> </i> </h1></div>
                  <div class="card-body">
                    <h5 class="card-title"> Registered Patients </h5>
                    <p class="card-text"> Only Registered Patients can book Appointments or View Donors </p>
                  </div>
                  <div class="card-footer">
                    <Link to="viewusers" class="btn btn-info"> View Patients </Link>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-12">
                <div class="card text-white bg-success shadow" style={{padding: "10px",marginBottom: "10px",marginTop: "20px"}}>
                  <div class="card-header" style={{textAlign: "center"}}><h1> {this.state.doctors.length} &nbsp; <i class="fas fa-user-md"> </i> </h1></div>
                  <div class="card-body">
                    <h5 class="card-title"> Doctors </h5>
                    <p class="card-text"> HPMS provides the latest technology & medical procedures in all its units. The team of reputed doctors ensure that quality care at affordable costs is always delivered to the patients.  </p>
                  </div>
                  <div class="card-footer">
                    <Link to="managedoctors" class="btn btn-info"> Manage Doctors </Link>
                    
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-12"> 
                <div class="card text-white bg-info shadow" style={{padding: "10px",marginBottom: "10px",marginTop: "20px"}}>
                  <div class="card-header" style={{textAlign: "center"}}><h1> {this.state.donors.length} &nbsp; <i class="fas fa-hand-holding-heart"> </i> </h1></div>
                  <div class="card-body">
                    <h5 class="card-title"> Donors </h5>
                    <p class="card-text"> HPMS provides the latest facilities in organ Donation. Millions of Lives can be saved </p>
                  </div>
                  <div class="card-footer">
                    <Link to="managedonors" class="btn btn-info"> Manage Donors </Link>
                    
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-12">
              <div class="card text-white bg-info shadow" style={{padding: "10px",marginBottom: "10px",marginTop: "20px"}}>
                <div class="card-header" style={{textAlign: "center"}}><h1> {this.state.appointments.length} &nbsp; <i class="far fa-calendar-check"></i> </h1></div>
                  <div class="card-body">
                    <h5 class="card-title"> Appointments </h5>
                    <p class="card-text"> To view and manage Appointments booked by the user </p>
                  </div>
                  <div class="card-footer">
                    <Link to="manageappointments" class="btn btn-info"> Manage Appointments </Link>
                    
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-12">
              <div class="card text-white bg-info shadow" style={{padding: "10px",marginBottom: "10px",marginTop: "20px"}}>
                <div class="card-header" style={{textAlign: "center"}}><h1> {this.state.queries.length} &nbsp; <i class="far fa-question-circle"></i> </h1></div>
                  <div class="card-body">
                    <h5 class="card-title"> Queries </h5>
                    <p class="card-text"> To view and manage Patient Queries </p>
                  </div>
                  <div class="card-footer">
                    <Link to="managequeries" class="btn btn-info"> Manage Queries </Link>
                    
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-12"> 
                <div class="card text-white bg-success shadow" style={{padding: "10px",marginBottom: "10px",marginTop: "20px"}}>
                  <div class="card-header" style={{textAlign: "center"}}><h1> {this.state.staff.length} &nbsp; <i class="fas fa-user-nurse"> </i> </h1></div>
                  <div class="card-body">
                    <h5 class="card-title"> Nurses and Staff </h5>
                    <p class="card-text"> Our World Class staff provies best in quality experience to our Patients </p>
                  </div>
                  <div class="card-footer">
                    <Link to="managestaff" class="btn btn-info"> Manage Staff </Link>
                    
                  </div>
                </div>
              </div> 
              <div class="col-md-4 col-sm-12">
              <div class="card text-white bg-info shadow" style={{padding: "10px",marginBottom: "10px",marginTop: "20px"}}>
                <div class="card-header" style={{textAlign: "center"}}><h1> Reports &nbsp; <i class="fas fa-file"></i> </h1></div>
                  <div class="card-body">
                    <h5 class="card-title"> Reports </h5>
                    <p class="card-text"> To view and manage Reports </p>
                  </div>
                  <div class="card-footer">
                    <Link to="managereports" class="btn btn-info"> Manage Reports </Link>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )
    }
}
export default Admin;