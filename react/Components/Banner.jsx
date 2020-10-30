import  React from 'react';
import Button from '@material-ui/core/Button';
import AboutMe from './AboutMe';

export default class Banner extends React.Component{
    render(){
        return (
            <>
            <section className="banner-abme first-slide center section bg-dark text-white">
                <div className="wrap-md-pd center text-center section__items">
                       <div className="section__item center flex-column mr-2-rem" style={{maxWidth:"500px"}}>
                           <h2 className="banner__title-gr">Programmer</h2>
                           <p className="banner__subtitle">I'm a passionate developer who loves to exploring more and more in programming specially frameworks & libraries</p>
                           <Button variant="contained" className="btn-beauty" href="#frm" >Contact me</Button>
                       </div>
                       <div className="section__item" style={{paddingTop:"2rem"}}>
                           <div className="img-container center">
                               <img alt=".." src="/public/tutor.svg"/>
                            </div>
                       </div>
                </div>
            </section>
            <AboutMe/>
            </>
        )
    }
}