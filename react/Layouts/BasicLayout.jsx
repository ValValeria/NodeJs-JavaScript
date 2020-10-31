import React from 'react'
import PropTypes from 'prop-types';

export default class BasicLayout extends React.PureComponent{
    render(){
        return (
            <section className={"section  center section "+this.props.className}>
                <div className="wrap-md-pd center text-center">
                       <div className="center flex-column wrap-md">
                            {this.props.children}
                       </div>
                </div>
            </section>       
        )
    }
}

BasicLayout.defaultProps = {
    className:""
}

BasicLayout.propTypes ={
    className:PropTypes.string
}