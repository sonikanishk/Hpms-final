import React from 'react';
import './contactus.css';
import '../assets/hospital.jpg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

class QuickQueries extends React.Component {
    state={
        name: '',
        email: '',
        address: '',
        number: '',
        comment: '',
        city: '',
        statee: '',
        zip: '',
        textchange: 'Submit'
    }

    handleChange = text => (e) => {
        this.setState({ [text]: e.target.value });
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({textchange:'Submitting'});
        
        const Name = this.state.name;
        const Email = this.state.email;
        const Address = this.state.address;
        const Comment = this.state.comment;
        const Statee = this.state.statee;
        const City = this.state.city;
        const Number = this.state.number;
        const Zip = this.state.zip
        
        if (Email && Name && Address && Number && Comment && City && Statee && Zip) {
            axios.post(`${process.env.REACT_APP_API_URL}/query`, {email:Email,name:Name,number:Number,city:City,statee:Statee,comment:Comment,address:Address,zip:Zip}).then(res => {
                  this.setState({email:''});
                  this.setState({name:''});
                  this.setState({address:''});
                  this.setState({number:''});
                  this.setState({comment:''});
                  this.setState({city:''});
                  this.setState({statee:''});
                  this.setState({zip:''});
                  
                  toast.success(`Thank You! Your Query will be processed`);
              })
              .catch(err => {
               console.log(err.response)
               toast.error(err.response.data.error);
             });
         } else {
           toast.error('Please fill all fields');
         }
         this.setState({textchange:'Submit'});
    }
    render(){
        return(
            <div>
                <ToastContainer />
                <div class="marqee">
                   <li class="list-inline">
                      COVID-19 Helpline: 011-42253001, 011-42253002, 011-42253003, +91-9818840984, +91-9311407392, 9311407393
                   </li>
                </div>
                <div class = "contactus responsive">
                    <h2> QUICK QUERIES </h2>
                </div>
                
                <div class="row contentf">
                    <div class="col-12">

                        <form style={{paddingTop:"10px",marginTop:"10px",paddingBottom:"10px",marginBottom:"10px"}} class="rounded  card" onSubmit={this.handleSubmit}>
                            <div class="contentf">
                                <h3 style={{textAlign:"center",paddingTop:"10px",paddingBottom:"20px"}}> QUERY FORM </h3>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label> Name* </label>
                                        <input onChange={this.handleChange('name')} type="text" class="form-control" value = {this.state.name} placeholder="Please enter your Name"/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label> Email* </label>
                                        <input onChange={this.handleChange('email')} type="email" class="form-control" value = {this.state.email} placeholder="Please enter your Email"/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label> Address* </label>
                                    <input onChange={this.handleChange('address')} type="text" class="form-control" value = {this.state.address} placeholder="Please enter your Address"/>
                                </div>
                                <div class="form-group">
                                    <label > Phone Number* </label>
                                    <input onChange={this.handleChange('number')} type="tel" class="form-control" value = {this.state.number} placeholder="Please enter your phone number"/>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label>City*</label>
                                        <input onChange={this.handleChange('city')} type="text" class="form-control" value = {this.state.city}/>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label>State*</label>
                                        <input onChange={this.handleChange('statee')} type="text" class="form-control" value = {this.state.statee}/>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label>Zip*</label>
                                        <input onChange={this.handleChange('zip')} type="text" class="form-control" value = {this.state.zip}/>
                                    </div>
                                    <div class="form-group col">
                                        <label> Comment* </label>
                                        <input onChange={this.handleChange('comment')} type="text" class="form-control" value = {this.state.comment} placeholder="Please enter your Query"/>
                                    </div>
                                </div>
                                
                                <button type = "submit" class="btn btn-primary col" style={{textAlign:"center"}}> {this.state.textchange} </button>
                            </div>
                        </form>            
                    </div>
                    <div class="contentf">
                    <div class="faq">
                        <h3> FAQ </h3>
                    </div>
                    <div class="borderr col-12" style={{paddingBottom:"20px"}}></div>
                    <ol class="justify" style={{listStyle: "decimal"}}>
						<li><b>How is India in comparison to other countries when it comes to medical treatment?</b>
						    <br/>
							<p>India has some of the world's best healthcare facilities, backed by the latest
                                technology, trained healthcare professionals and doctors with international
                                qualifications and years of rich experience in their field. Also when it comes to the
                                cost of treatment, India is much less expensive than most developed countries. With
                                the best healthcare infrastructure and the finest medical and surgical expertise, India
                                offers world-class medical treatment and patient care services at a much affordable
                                cost.
                            </p>
						</li>
						<li><b>How is HPMS Healthcare when compared with other hospitals?</b>
							<p></p>
                            <ul style={{listStyle: "circle"}}>
								<li>HPMS healthcare form a large network of integrated healthcare services across Asia-Pacific</li>
                                <li>They offer the best of medical facilities and the latest technologies</li>
                                <li>HPMS has some of the most qualified, highly specialized and trained doctors
                                recognized globally for their expertise and skills</li>
                                <li>Flawless services and personalized care and attention</li>
                                <li>HPMS offers international standards in healthcare services at comparativelyaffordable prices</li>
						    </ul>
                            <p></p>
                        </li>
						<li><b>Can you help me get a visa?</b>
							<p>Yes, we can. Once you confirm your visit to our facility for medical treatment, we will
                                send a visa requisition letter to the Indian Embassy in the country you live in. A copy
                                of the letter will be marked to you.
                            </p>
                            <p>For us to do the same, you will have to send us the following details via email:</p>
                            <p></p>
                            <ul style={{listStyle: "circle"}}>
                                <li>Patient's name and passport number</li>
                                <li>Patient attendants name and passport number</li>
                                <li>Country of residence</li>
                                <li>Your tentative date of arrival at HPMS for treatment</li>
                            </ul>
                            <p></p>
                                <p><b>Please Note:</b></p>
                                <p></p>
                            <ul>
                                <li>If you are traveling on a medical visa, you are required to register at the
                                Foreigner's Regional Registration Office within 14 days of your arrival.</li>
                                <li>Patients from Pakistan and Bangladesh are required to register with the
                                nearest Police Station or Police Commissioner's office within 24 hours of
                                arrival.</li>
                                <li>Refer to your Visa/ Transit document for detailed instructions.</li>
                                <li>Please bring 10 passport sized photographs with you for the above formalities.</li>
                            </ul><p></p>
                        </li>

                        <li><b>Will a pick up from the airport be arranged for me?</b>
                            <p>Yes, our International Patient Care Team will arrange airport pick up for you once your
                                date and time of arrival in confirmed. A representative from our <b>International Patient
                                Services</b> team shall escort you from the airport to the hospital/hotel as per your
                                itinerary.
                            </p>
                                                                        
                        </li>
                        <li><b>Where will I stay till I'm admitted to the hospital or after I'm discharged?</b>
                            <p>Our team can help you in arranging for an accommodation (hotel/rented apartment
                                etc.) based on your budget preferences. There are various guest houses, service
                                apartments and luxurious 5-star hotels in the vicinity of the hospital. Facilities like
                                hospital visits, on-call doctor, cab services and emergency ambulance can also be
                                arranged, if you may require them.
                            </p>
                        </li>
                            <li><b>What about my appointments with the doctor?</b>
                                <p>A relationship manager will liaise between you and the hospital. All your appointments
                                for various services like the outpatient clinic, laboratory and pathology, medical
                                imaging, and inpatient surgical procedures will be managed by the team.</p>
                            </li>
                            <li><b>Are there any special facilities and services that you provide for patients from
                                outside India?</b>
                                <p></p><ul style={{listStyle: "circle"}}><li>Pickup and drop from the airport</li>
                                <li>A SIM card on arrival, so that you can talk to your relatives back home</li>
                                <li>VISA/FRRO assistance</li>
                                <li>Language interpreters</li>
                                <li>Foreign Exchange conversion at the hospital</li>
                                <li>Fax, photocopy and courier services</li>
                                <li>Laundry services</li>
                                <li>In-room color television, cable connection, DVD player</li>
                                <li>Complimentary Wi-Fi in most of our hospitals</li>
                                <li>Complimentary stay in your room for one attendant (while you are being
                                operated on, we will provide alternative accommodation for your attendant)</li>
                                <li>Special arrangements to meet specific religious or dietary needs</li>
                                <li>Daily updates for your referring doctors and family</li></ul><p></p>
                            </li>
                            <li><b>What modes of payment do you accept?</b>
                                <p>We accept the following modes of payment:</p>
                                <p><b>Wire Transfer-</b>
                                You can transfer money directly from your bank account to HPMS
                                Healthcare's account</p>
                                <p><b>Direct payment-</b>
                                At the hospital, you can pay your bills directly through cash, card, or
                                traveler's cheque</p>
                                <p><b>Please Note:</b>&nbsp;We accept all major credit cards like VISA, MASTER Card, AMEX and
                                CIRRUS. We accept payment for inpatient services in the following currencies- US
                                Dollar, Euro, Pound Sterling, Omani Riyal, UAE Dirham, Kuwait Dinar, Saudi Riyal and
                                Singapore dollars.</p>
                            </li>
					</ol>
                    </div>
                </div>
            </div>
        )
    }
}
export default QuickQueries;


                        