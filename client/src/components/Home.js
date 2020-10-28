import React from 'react';
import './Home.css'
import { isAuth } from '../helpers/auth';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  
  render() {
    return (
      <div>
        {isAuth() ? <Redirect to='/private' /> : null}
            <div class="marqee">
                        <li class="list-inline">
                            COVID-19 Helpline: 011-42253001, 011-42253002, 011-42253003, +91-9818840984, +91-9311407392, 9311407393
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
export default Home;
