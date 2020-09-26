import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


import { Image, Button } from 'antd'

import './style.css'

import { getEventById, registerEvent } from '../../actions/eventActions'



class EventScreen extends Component {
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this)
    }

    componentDidMount() {
        this.props.getEventById(this.props.match.params.id)
    }

    handleRegister(){
        const data = {
            id: this.props.match.params.id,
            orderAmount: this.props.event.price
        }
        this.props.registerEvent(data)
    }
    
    render(){
        const { event, isLoading, error, userInfo } = this.props

        if( event === null ){
            return null
        }

        const loggedIn = userInfo

        const eventDate = new Date(event && event.eventDate)
        const day = eventDate.toLocaleDateString("en-US", { day: 'numeric' })
        const month = eventDate.toLocaleDateString("en-US", { month: 'short' })

        const time = eventDate.toLocaleTimeString('en-US', {
        hour12: true, hour: 'numeric', minute: '2-digit'
    })

        return (
            isLoading ? <div>Loading ...</div> : 
            error ? <div>{error}</div> :
            <div className="event__screen">
                <div className="event__details">
                    <div className="event__image__container">
                        {event.imagePath && <Image 
                        width={600}
                        src={"https://super1233456.herokuapp.com/" + event.imagePath}
                    />}
                    </div>

                    <div className="event__screentitle">
                        <h2>{event.title}</h2>
                    </div>

                    <div className="event__description">
                        <p>{event.description}</p>
                    </div>

                    
                    
                    <div className="event__category">
                        <div className="event__category__title">
                            Category
                        </div>
                        <div className="event__category__details">
                            {event.category}    
                        </div>
                    </div>

                    <div className="eventscreen__timingsprice__details">
                        <div className="eventscreen__timings">
                            <div className="eventscreen__timings__title">
                                Timings
                            </div>

                            <div className="eventscreen__timings__details">
                                <div className="eventscreen__date">
                                    {day + " " + month}
                                </div>

                                <div className="eventscreen__time">
                                    {time}
                                </div>
                            </div>
                            
                        </div>

                        <div className="eventscreen__price">
                            <div className="event__price__title">
                                Price
                            </div>
                            <div className="eventscreen__price__details">
                                Rs. {event.price}  
                            </div>
                        </div>
                    </div>
                    
                    {loggedIn ?  <Button onClick={this.handleRegister}>Register</Button> : 
                    (<Button><Link to='/signin' style={{ textDecoration: 'none' }}>Register</Link></Button>)}
                </div>
            </div>
            
        )
    }
    
}


const mapStateToProps = (state) => ({
    event: state.getEventById.event,
    isLoading: state.getEventById.isLoading,
    error: state.getEventById.error,
    registeredevent: state.registeredevent.registeredevent,
    userInfo: state.userSignin.userInfo
})

const mapDispatchToProps =  {
    getEventById,
    registerEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen)



