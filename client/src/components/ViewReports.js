import React from 'react';
import './reports.css'
import { isAuth,signout } from '../helpers/auth';

import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'


class Appointment extends React.Component{
    state={
        userdetails:{},
        reportdetails: [],
    }
    componentDidMount(){

        axios.get(`${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`, {
            headers: {
            Authorization: `Bearer ${this.state.token}`
            }
        })
        .then(res => {
            const deets = res.data;
            this.setState({userdetails:deets});
            return axios.post(`${process.env.REACT_APP_API_URL}/getreports`,{email:this.state.userdetails.email}).then(res => {
                this.setState({reportdetails:res.data[0]});
                // console.log(this.state.reportdetails);
                
            })
            .catch(err => {
             console.log(err.response)
             toast.error(err.response.data.errors);
           });
            
        })
        .catch(err => {
            toast.error(`Error To Your Information ${err.response.statusText}`);
            if (err.response.status === 401) {
            signout(() => {
                
            });
            }
        });
    
    };
render(){ 
    const today = new Date();
    
    return(
        // <div>
        //     {isAuth() ? null : toast.error('Please Sign in First')}
        //         {isAuth() ? null : <Redirect to="/loginmain"/>}
        //         <ToastContainer/>
                
        //         <div class="findadoc"> 
        //             <h2> REPORT </h2>
        //         </div>
                
        //         <div class="row contentf">
               
          <div class="invoice-box">
              <ToastContainer/>
             <table cellpadding="0" cellspacing="0" style={{font: "black"}}>
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                           
                            <td>
                               Date: {`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                               Patient name: {this.state.reportdetails.name}
                            </td>
                            <td>
                               Patient id: {this.state.reportdetails._id}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                   <td>Attribute</td>
                   <td>Details</td>
                </tr>
                <tr class="item">
                   <td>Email:</td>
                   <td>{this.state.reportdetails.email}</td>
                </tr>
                <tr class="item">
                   <td>Contact:</td>
                   <td>{this.state.reportdetails.number}</td>
                </tr>
                <tr class="item">
                   <td>Symptoms:</td>
                   <td>{this.state.reportdetails.symptoms}</td>
                </tr>
                <tr class="item">
                   <td>Department:</td>
                   <td>{this.state.reportdetails.department}</td>
                </tr>
                <tr class="item">
                   <td>Gender:</td>
                   <td>{this.state.reportdetails.gender}</td>
                </tr>
                <tr class="item">
                   <td>Insurance:</td>
                   <td>{this.state.reportdetails.insurance}</td>
                </tr>
             </table>
             <br />
             
          </div>
    )
}
};
export default Appointment;