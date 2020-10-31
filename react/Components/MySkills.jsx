import React from 'react'
import BasicLayout from '../Layouts/BasicLayout'
export default function(){
    return (
        <BasicLayout >
                <h2 className="section__title">Мои навыки</h2>
                <section className="section__items skills center" style={{flexDirection:"column"}}>
                    <div className="section__item center card">
                         <div className="card__content">
                             <h6>HTML, JS, CSS</h6>
                             <p>
                                За время изучения frontend я получила навыки решения типовых задач фронтенд-разработчика и научилась делать настоящие проекты.
                             </p>
                         </div>
                         <div className="img-container">
                             <img src="/public/images/icon_death-star.v2.svg" alt=""/>
                         </div>
                    </div>
                    <div className="section__item center card">
                         <div className="img-container">
                             <img src="/public/images/icon_laboratory.v2.svg" alt=""/>
                          </div>
                          <div className="card__content">
                              <h6>Много практики </h6>
                              <div className="center" style={{justifyContent:"flex-end"}}>
                                  <p>С самого начала изучения frontend я старалась применять полученные знания в проектах</p>
                              </div>
                          </div>
                    </div>
                    <div className="section__item center"></div>
                </section>
        </BasicLayout>
    )
}