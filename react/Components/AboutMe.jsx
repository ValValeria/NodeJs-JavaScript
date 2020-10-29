import React from 'react';

export default function(){
    return(
        <section className="section  center section">
                <div className="wrap-md-pd center text-center">
                       <div className="center flex-column wrap-md">
                           <h2 className="section__title">Немного обо мне</h2>
                           <section className="section__items center" >
                                  <div className="section__item about_h1">
                                      <div className="img-container">
                                          <img src="/public/icon_review.v2.svg" alt="" style={{maxWidth:"300px"}}/>
                                      </div>
                                  </div>
                                  <div className="section__item">
                                       <p>
                                         Меня зовут Валерия Дорошенко и я веб-разработчик. Занимаюсь программированием более двух лет и за это время познакомилась 
                                         с различными технологиями.
                                       </p>
                                  </div>
                           </section>
                       </div>
                </div>
        </section>
    )
}