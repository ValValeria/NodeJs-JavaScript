import React from 'react';
import './style.css';
import Banner from './Components/Banner';
import Form from './Components/Form'
import MySkills from './Components/MySkills';
import MyStack from './Components/MyStack'
import Examples from './Components/Examples';

//heroku run rails console
export default function (){
    return (
        <React.Fragment>
          <Banner/>
          <MySkills/>
          <MyStack/>
          <Examples/>
          <Form/>
        </React.Fragment>
    )
}