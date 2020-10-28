import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import {Navbar,Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { isAuth, getCookie, signout  } from '../helpers/auth';
import axios from 'axios';


class Header extends React.Component {
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
              // history.push('/login');
            });
          }
        });
    }
    
  }

  render() {
    return (
      <div>
        <div class="header row" style={{margin: "0px"}}>
            <div class="col-md-4 p1">
            <Link to="/">
                <div class="logo">

                </div>
            </Link>
            </div>
            <div class="col-md-8 p2">
                <div class="nav1">
                    <Nav id="mr-auto">
                    
                              <Link class="link sizzz" to="/"> HOME </Link>
                              <Link class="link sizzz" to="/about-us"> ABOUT US </Link>

                              <Link class="emergency sizzz" to="/emergency">
                                  EMERGENCY 24x7
                              </Link>
                              <Link class="link sizzz" to="/contact-us"> CONTACT US </Link>
                               
                              {this.state.isLoggedIn==='yes'?
                                <>   
                                  <Link class="link sizzz" to="/signout" style = {{ marginRight: "15px" }}> SIGN OUT </Link>
                                </>
                              :
                              <>
                                <Link class="link sizzz" to="/loginmain"> SIGN IN </Link>
                                <Link style = {{ marginRight: "15px" }} class="link sizzz" to="/register"> SIGN UP </Link>  
                              </>
                              }

                    </Nav>
                </div>
                <div class="nav2">
                    <Navbar id="mr-auto2">
                      <div class="row" style={{margin:"0px",justifyContent:"center"}}>
                            <input type="checkbox" id="check">

                            </input>
                            <label for="check" class="checkbtn">
                              <i class="fas fa-bars"></i>
                            </label>
                            <span class="comp" style={{margin:"0px"}}>
                              <Link class="link rounded" to="/appointment"><div class="appointment"></div> <span class="sizz">APPOINTMENTS</span> </Link>
                              <Link class="link rounded" to="/reports"><div class="reports"></div> <span class="sizz">LAB REPORTS</span> </Link>
                              <Link class="link rounded" to="/departments"><div class="doctor"></div> <span class="sizz">DEPARTMENTS</span> </Link>
                              <Link class="link rounded" to="/queries"><div class="queries"></div> <span class="sizz">QUICK QUERIES</span></Link>
                              <Link class="link rounded" to="/donor"><div class="donor"></div> <span class="sizz">FIND DONOR</span></Link>
                            </span>
                      </div>
                      
                     </Navbar>
                </div>

            </div>

        </div>

      </div>
    );
  }
}
export default Header;



