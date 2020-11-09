import React from 'react';
import './Home.css'
import { isAuth } from '../helpers/auth';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  
  render() {
    return (
      <div>
        {isAuth() ? isAuth().role==='admin'?<Redirect to='/admin'/> : <Redirect to='/private' /> : null}
            <div class="marqee">
                        <li class="list-inline">
                          COVID-19 Helpline: 011-44444444, 011-44444445, 011-44444446, +91-9999999991, +91-9999999992
                        </li>
            </div>
            <div class="slider-container responsive shadow rounded">
                <span id="slider-1"></span>
                <span id="slider-2"></span>
                <span id="slider-3"></span>
                <div class="image-container responsive">
                   <div  class="slider-image i1 rounded"></div>
                   <div  class="slider-image i2 rounded"></div>
                   <div  class="slider-image i3 rounded"></div>
                </div>
                <div class="button-container responsive">
                    <a rel="noopener noreferrer" href="#slider-1" > <span class="carousel-control-prev-icon bg rounded" aria-hidden="true"></span></a>
                    <a rel="noopener noreferrer" href="#slider-2" > <span class="carousel-control-next-icon bg rounded" aria-hidden="true"></span></a>
                    <a rel="noopener noreferrer" href="#slider-3" > <span class="carousel-control-next-icon bg rounded" aria-hidden="true"></span></a>
                    
                </div>
            </div>
            
            
            
      </div>
    );
  }
}
export default Home;
