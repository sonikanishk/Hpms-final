import React from 'react';
import authSvg from '../assets/welcome.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { isAuth,signout,getCookie } from '../helpers/auth';
import { Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

class SignOut extends React.Component {
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
  render(){
  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        {isAuth() ? null : <Redirect to='/login' />}
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Welcome {this.state.formdata.name}
            </h1>

            <form
              className='w-full flex-1 mt-8 text-indigo-500'
            >
              <div className='mx-auto max-w-xs relative '>
                <button
                  onClick={() => {
                    signout(() => {
                      toast.error('Signout Successfully');
                      window.location.reload();
                    });
                  }}
                  type='submit'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                  <span className='ml-3'> Sign Out </span>
                </button>
              </div>
              
            </form>
          </div>
        </div>
        <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
      </div>
      
    </div>
  );
}};

export default SignOut;

                                  