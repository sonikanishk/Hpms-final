import React from 'react';
import { ToastContainer ,toast} from 'react-toastify';
import axios from 'axios';
import { isAuth, getCookie,signout } from '../helpers/auth';
import './Home.css'
import 'react-toastify/dist/ReactToastify.css';

class Private extends React.Component {    
  state= {
    token: '',
    formdata:{
      name: '',
      email: '',
      password: '',
      role: ''
    },
    isLoggedIn: 'no'
  }

  componentDidMount(){
    const token = getCookie('token');
    
    this.setState({token:token});
    if(token!==undefined){
      this.setState({isLoggedIn:'yes'});
    }
    
    var deets = {
      role: '',
      name: '',
      email: ''
    }
    
    if(token!==undefined){
      axios.get(`${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        })
        .then(res => {
          deets = res.data;
          this.setState({formdata:deets});
          // console.log(this.state.formdata);
          
        })
        .catch(err => {
          toast.error(`Error To Your Information ${err.response.statusText}`);
          if (err.response.status === 401) {
            signout(() => {
              
            });
          }
        });
    }
  }
  render() {
    return (
      <div>
        <ToastContainer/>
        
            <div class="marqee">
                <li class="list-inline">
                    COVID-19 Helpline: 011-42253001, 011-42253002, 011-42253003, +91-9818840984, +91-9311407392, 9311407393
                </li>
            </div>
            <h2 style = {{font: "Yanone Kaffeesatz"}}> Dear {this.state.formdata.name}, Welcome to HPMS </h2>
            <div class="slider-container responsive">
                <span id="slider-1"></span>
                <span id="slider-2"></span>
                <span id="slider-3"></span>
                <div class="image-container responsive">
                   <div  class="slider-image i1"></div>
                   <div  class="slider-image i2"></div>
                   <div  class="slider-image i3"></div>
                </div>
                <div class="button-container responsive">
                    <a href="#slider-1" class="slider-button"> </a>
                    <a rel="noopener noreferrer" href="#slider-2" class="slider-button"> </a>
                    <a rel="noopener noreferrer" href="#slider-3" class="slider-button"> </a>

                </div>
            </div>
            <div>

            </div>
      </div>
    );
  }
}
export default Private;
