import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


class ManageQueries extends React.Component {
  state={
    details:[]
  }
  myfn = id => (e) => {
      axios.post(`${process.env.REACT_APP_API_URL}/deleteQuery`,{id:id});
      alert('Query has been deleted');
  }  
  CustomCard = ({ id,name,comment }) => {
    return (
      <div>
        <div class="row border box1" style={{margin:"0px",padding:"5px"}}>               
            
            <span class="col-md-3">  {name} </span>
            <span class="col-md-8">  {comment}</span>
            {/* <button label="Delete Query" onClick={this.myfn(id)}  class="col-md-1" style={{textAlign:"center"}}> <i class="fas fa-minus-circle"> </i> </button> */}
            <button onClick={this.myfn(id)} type="submit" style={{textAlign:"center",flex:"auto"}}  class="tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none col-md-1"> Delete </button>

        </div>
        <div class="row border box2" style={{margin:"0px",padding:"5px"}}>               
            
            <span class="col-md-3"> Name: {name} </span>
            <span class="col-md-8"> Query: {comment}</span>
            {/* <button label="Delete Query" onClick={this.myfn(id)}  class="col-md-1" style={{textAlign:"center"}}> <i class="fas fa-minus-circle"> </i> </button> */}
            <button onClick={this.myfn(id)} type="submit" style={{textAlign:"center",flex:"auto"}}  class="tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none col-md-1"> Delete </button>

        </div>   
      </div>
    );
  };
  componentDidMount(){
        
    axios.get(`${process.env.REACT_APP_API_URL}/queries`).then(res => {
        
        this.setState({details:res.data});
                      
    })
    .catch(err => {
     console.log(err.response)
     toast.errors(err.response.data.errors);
   });
  };
    render() {
      const details = this.state.details;
      return (
        <div>
            <ToastContainer/>
            <div class = "aboutus">
                  <h2> MANAGE QUERIES </h2>
            </div>
            <div class="row content">
                    <div class="ourstory">
                        <h3> Queries / Feedback </h3>
                    </div>
                    <div class="borderr col-12" style={{paddingBottom:"15px"}}></div> 
                    <div class="top">  
                      <div class="col-3"> Name</div>
                      <div class="col-8"> Query </div>
                      <div class="col-1"> Delete </div>
                    </div>
                    {details.map((item, index) => {
                            return (
                            <div class="col-12">
                              <div>
                                <this.CustomCard
                              
                                id = {item._id}
                                name={item.name} 
                                email={item.email}
                                comment = {item.comment}
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
export default ManageQueries;