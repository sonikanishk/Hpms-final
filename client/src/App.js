import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ContactUs from'./components/ContactUs';
import Emergency from'./components/Emergency';
import AboutUs from'./components/AboutUs';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Register from './components/Register';
import LoginMain from './components/LoginMain.jsx';
import LoginDoctor from './components/LoginDoctor.jsx';
import Login from './components/Login.jsx';
import LoginStaff from './components/LoginStaff.jsx';
import Private from './components/Private.jsx';
import Signout from './components/SignOut.jsx';
import Forgot from './components/Forgot.js';
import Reset from './components/Reset.js';
import QuickQueries from './components/QuickQueries';
import Doctor from './components/Doctor';
import Appointment from './components/Appointment';
import Reports from './components/Reports';
import Donor from './components/Donor';

import dotenv from 'dotenv';

dotenv.config();

function App() {
  return (
    <div className="page-element">
        <div style={{flex: "1"}}>
            <Router>
                <Header/>
                <Switch>
                        <Route path="/" exact component = {Home} />
                        <Route path="/contact-us" exact component = {ContactUs} />
                        <Route path="/emergency" exact component = {Emergency} />
                        <Route path="/about-us" exact component = {AboutUs} />
                        <Route path="/register" exact component = {Register} />
                        <Route path="/logindoctor" exact component = {LoginDoctor} />
                        <Route path="/loginmain" exact component = {LoginMain} />
                        <Route path="/loginstaff" exact component = {LoginStaff} />
                        <Route path="/login" exact component = {Login} />
                        <Route path="/private" exact component = {Private} />
                        <Route path="/signout" exact component = {Signout} />
                        <Route path="/forgotpassword" exact component = {Forgot} />
                        <Route path="/resetpassword/:token" exact component = {Reset} />
                        <Route path="/queries" exact component={QuickQueries}/>
                        <Route path="/departments" exact component={Doctor}/>
                        <Route path="/appointment" exact component={Appointment}/>
                        <Route path="/reports" exact component={Reports}/>
                        <Route path="/donor" exact component={Donor}/>
                        
                        
                </Switch>
            </Router>
        </div>
      <Footer/>
    </div>
  );
}

export default App;