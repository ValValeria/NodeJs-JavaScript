import React from 'react';
import BasicLayout from '../Layouts/BasicLayout';
import { connect } from "react-redux";
import ImageCard from './ImageCard';
import Button from '@material-ui/core/Button';


const mapStateToProps = (state)=>{
    return {
       examples:state.examples
    }
}

function Examples({examples}){

    return(
        <BasicLayout >
              <h3 className="section__title">Примеры моих работ</h3>
              <div className="section__items center examples">
                <>
                 {
                 examples.map(v=>{
                   return (<ImageCard image={v} url={v.url} key={v.url} >
                              <Button variant="contained" color="primary" className="btn-beauty" href="#">{v.title}</Button>
                           </ImageCard>)
                 })
                 }
                </> 
                <div className="section__item center" style={{paddingTop:"1rem"}}>
                      <a href="https://github.com/ValValeria" className="newbutton orange">Больше проектов</a>
                </div>
              </div>
        </BasicLayout>
    )
}


export default connect(mapStateToProps)(Examples);