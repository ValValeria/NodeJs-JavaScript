import React from 'react';
import BasicLayout from '../Layouts/BasicLayout';
import {connect} from 'react-redux';
import MyCard from './Card'


const mapStateToProps = (state)=>{
    return {
       skills:state.skills
    }
}

function MyStack({skills}){

    return(
        <BasicLayout>
              <h3 className="section__title">Мой стек веб-технологий</h3>
              <p className="section__subtitle" style={{paddingBottom:"1rem"}}>Технологии, которые я использую</p>
              <div className="section__items center flex-wrap" >
                  {
                    skills.map(v=>{
                        return (
                            <div className="section__item center"  key={v.image} style={{maxWidth:"300px",margin:"1.2rem",flex:"1 1 27%"}}>
                                <MyCard {...v}/>
                            </div>
                        )
                    })
                  }
              </div>
        </BasicLayout>
    )
}

export default connect(mapStateToProps)(MyStack)
