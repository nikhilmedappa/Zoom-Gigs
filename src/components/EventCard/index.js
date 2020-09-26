import React from 'react';
import { Link } from 'react-router-dom'

import { Badge } from 'antd'

import './style.scss'

export default function EventCard(props) {

    const styles = {
        
        link: {
            textDecoration: "none",
        }
    }

    const eventDate = new Date(props.event.eventDate)
    const day = eventDate.toLocaleDateString("en-US", { day: 'numeric' })
    const month = eventDate.toLocaleDateString("en-US", { month: 'short' })

    const time = eventDate.toLocaleTimeString('en-US', {
        hour12: true, hour: 'numeric', minute: '2-digit'
    })



    return (
        <Link to={"/event/" + props.event._id} style={styles.link}>
            <div className="card">
                
                <div className="card__content">
                    <div className="card__front">
                        <img src={"https://super1233456.herokuapp.com/" + props.event.imagePath} alt={props.event.title} />
                        <div className="card__image">
                            
                            <div className="event__title">
                                {props.event.title}
                            </div>
                            <div className="event__category">
                                {props.event.category}
                            </div>
                        </div>

                        <div className="event__subcount">
                            <Badge count={props.event.subscribersCount} style={{ backgroundColor: '#52c41a'}} />
                        </div>
                    </div>

                    <div className="card__back">
                        <div className="card__body">
                            <div className="event__date">
                                <div className="event__day">
                                    {day}
                                </div>
                                <div className="event__month">
                                    {month}
                                </div>
                            </div>

                            <div className="event__price">
                                <div>
                                    Time
                                </div>
                                
                                <div className="event__time">
                                    {time}
                                </div>
                                <div>
                                    Entry
                                </div>
                                <div className="event__priceitem">
                                    Rs. {props.event.price}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </Link>
        
    )
}


