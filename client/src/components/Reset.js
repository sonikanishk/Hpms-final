import React from 'react'
import authSvg from '../assets/forget.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

class Reset extends React.Component{
    
    state={
        password1: '',
        password2: '',
        
        textchange: 'Submit',
        token: ''
    }
    componentDidMount(){
        const { match: { params } } = this.props;
        const tok = params.token;
        this.setState({token:tok});
        
    }
    handleChange = text => (e) => {
        this.setState({ [text] : e.target.value });
    }  
    handleSubmit = e => {
        e.preventDefault();
        
        this.setState({textchange:'Submitting'});
        
        const Token = this.state.token;
        const Password1 = this.state.password1;
        const Password2 = this.state.password2;
        this.setState({password1:''});
        this.setState({password2:''});
        if ((Password1 === Password2) && Password1 && Password2) {
           axios.put(`${process.env.REACT_APP_API_URL}/resetpassword`, {newPassword:Password1,resetPasswordLink:Token}).then(res => {
                 toast.success(res.data.message);
             })
             .catch(err => {
              console.log(err.response)
              toast.error('Somthing went wrong! Please try again');
            });
        } else {
          toast.error('Passwords don\'t match');
        }
        this.setState({textchange:'Submit'});
      };
    render(){
        return(
            <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Reset Your Password
            </h1>
            <div className='w-full flex-1 mt-8 text-indigo-500'>
              
              <form
                className='mx-auto max-w-xs relative '
                onSubmit={this.handleSubmit}
              >
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='password'
                  placeholder='Password'
                  onChange={this.handleChange('password1')}
                  value={this.state.password1}
                  />
                  <input
                  className='w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='password'
                  placeholder='Confirm password'
                  onChange={this.handleChange('password2')}
                  value={this.state.password2}
                />
                <button
                  type='submit'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                    <span className='ml-3'>{this.state.textchange}</span>
                </button>
              </form>
            </div>
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
        )
    }
}
export default Reset;