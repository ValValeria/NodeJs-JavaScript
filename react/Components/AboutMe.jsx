import React from 'react';
import BasicLayout from '../Layouts/BasicLayout'

export default function(){
        return(
                    <>
                     <BasicLayout className="bg-light">
                           <h2 className="section__title">Немного обо мне</h2>
                           <section className="aboutme__area section__items center justify-content-around">
                                  <div className="section__item">
                                       <p>
                                         Меня зовут Валерия Дорошенко и я веб-разработчик. Занимаюсь программированием более двух лет и за это время познакомилась 
                                         с различными технологиями.
                                       </p>
                                  </div>
                                 <div className="section__item about_h1">
                                      <div className="img-container">
                                          <img src="/public/icon_review.v2.svg" alt="" style={{maxWidth:"300px"}}/>
                                      </div>
                                  </div>
                            </section>      
                     </BasicLayout>
                      <div className="curveUpColor" style={{width:"100%"}}>
                                 <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="104px" viewBox="0 0 100 100" preserveAspectRatio="none">
                                      <path d="M0 100 C 20 0 50 0 100 100 Z" fill="rgb(245, 245, 245)"></path>
                                 </svg>
                      </div>
                      </>
    )
}