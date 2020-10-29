import  React from 'react';
import Button from '@material-ui/core/Button';
import AboutMe from './AboutMe';

export default class Banner extends React.Component{
    render(){
        return (
            <>
            <section className="banner-abme first-slide center section bg-dark text-white">
                <div className="wrap-md-pd center text-center">
                       <div className="center flex-column">
                           <h2 className="banner__title-gr">Programmer</h2>
                           <p className="banner__subtitle">I'm a passionate developer who loves to exploring more and more in programming specially frameworks & libraries</p>
                           <Button variant="contained" className="btn-beauty" href="#frm" >Contact me</Button>
                       </div>
                </div>
            </section>
            <AboutMe/>
            </>
        )
    }
}