import React from 'react';
import './style.css';
import Banner from './Components/Banner';
import Form from './Components/Form'
//heroku run rails console

export default function (){
    return (
        <>
        <Banner/>
        <Form/>
        </>
    )
}