import React from 'react';

export default class extends React.PureComponent{
    render(){
        return (
<section className="section blue white pshik">
    <div className="chick"></div>
    <div className="chick2"></div>
    <div className="tool"></div>

    <div className="container center wrap-md" >
            <div className="contact_form wrap-md" id="frm" style={{paddingBottom:"2.5rem"}}>
                    <h3>
                          <div className="page-body__container">
                              <h2 className="feedback-title">Есть проект? <span className="feedback-title__highlight">Пишите!</span></h2>
                           </div>
                    </h3>
                    <p>Заполните форму, мы свяжемся с вами в течении 5 минут!</p>
                    <div className="back-map" id="orderme">
                       <form name="forms" id="form" >
                           <label>
                                <input  maxLength="40"type="email" id="email"placeholder="Ваш email" name="email"required/>
                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path opacity="0.8" d="M7.4375 8.375C6.73438 8.375 6.11914 8.22852 5.5332 7.87695C4.94727 7.55469 4.50781 7.11523 4.18555 6.5293C3.83398 5.94336 3.6875 5.32812 3.6875 4.625C3.6875 3.95117 3.83398 3.33594 4.18555 2.75C4.50781 2.16406 4.94727 1.72461 5.5332 1.37305C6.11914 1.05078 6.73438 0.875 7.4375 0.875C8.11133 0.875 8.72656 1.05078 9.3125 1.37305C9.89844 1.72461 10.3379 2.16406 10.6895 2.75C11.0117 3.33594 11.1875 3.95117 11.1875 4.625C11.1875 5.32812 11.0117 5.94336 10.6895 6.5293C10.3379 7.11523 9.89844 7.55469 9.3125 7.87695C8.72656 8.22852 8.11133 8.375 7.4375 8.375ZM10.0742 9.3125C10.7773 9.3125 11.4219 9.48828 12.0371 9.83984C12.623 10.1914 13.1211 10.6895 13.4727 11.2754C13.8242 11.8906 14 12.5352 14 13.2383V14.4688C14 14.8789 13.8535 15.2012 13.5898 15.4648C13.2969 15.7578 12.9746 15.875 12.5938 15.875H2.28125C1.87109 15.875 1.54883 15.7578 1.28516 15.4648C0.992188 15.2012 0.875 14.8789 0.875 14.4688V13.2383C0.875 12.5352 1.05078 11.8906 1.40234 11.2754C1.75391 10.6895 2.22266 10.1914 2.83789 9.83984C3.42383 9.48828 4.09766 9.3125 4.80078 9.3125H5.29883C5.97266 9.63477 6.67578 9.78125 7.4375 9.78125C8.16992 9.78125 8.87305 9.63477 9.57617 9.3125H10.0742Z" fill="white"></path> </svg>
                           </label>
                           <label>
                                <textarea style={{resize:"false"}} id="message"name="message"rows="7" placeholder="Ваше сообщение" cols="20" required  minLength='20' maxLength="400"></textarea>
                                <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"> <path opacity="0.8" d="M15 4.08594C14.7489 4.36216 14.4643 4.60491 14.1629 4.81417C12.7651 5.76004 11.3588 6.71429 9.99442 7.70201C9.2913 8.22098 8.42076 8.85714 7.50837 8.85714H7.5H7.49163C6.57924 8.85714 5.70871 8.22098 5.00558 7.70201C3.64118 6.70591 2.23493 5.76004 0.845424 4.81417C0.535714 4.60491 0.251116 4.36216 0 4.08594V10.7321C0 11.4688 0.602679 12.0714 1.33929 12.0714H13.6607C14.3973 12.0714 15 11.4688 15 10.7321V4.08594ZM15 1.625C15 0.888392 14.389 0.285714 13.6607 0.285714H1.33929C0.443638 0.285714 0 0.988839 0 1.80915C0 2.57087 0.845424 3.51674 1.43973 3.91853C2.73717 4.82254 4.05134 5.72656 5.34877 6.63895C5.89286 7.01562 6.81362 7.78571 7.49163 7.78571H7.5H7.50837C8.18638 7.78571 9.10714 7.01562 9.65123 6.63895C10.9487 5.72656 12.2628 4.82254 13.5686 3.91853C14.3052 3.40792 15 2.5625 15 1.625Z" fill="white"></path> </svg>
                            </label>
                            <div className="know" style={{display:"none"}}>
                            </div>
                
                           <div className="buttons width_all jus_center ">
                                 <button  type="submit" className="newbutton orange" style={{fontWeight: 500}}>Отправить  </button>
                           </div>
                       </form>
                 </div >
            </div>
        </div>
    </section>    
        )
    }
}