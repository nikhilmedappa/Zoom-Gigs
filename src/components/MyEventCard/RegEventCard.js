import React from 'react'


import { Badge } from 'antd'
import { Button } from 'antd'
import './style.css'


export default function RegEventCard(props) {

    const styles = {
        button: {
            borderRadius: 20
        },
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
            <div className="mycard">
                
                <div className="mycard__content">
                    <div className="mycard__left">
                        <div className="mycard__image">
                            <img src={"https://super1233456.herokuapp.com/" + props.event.imagePath} alt={props.event.title} />
                            
                        </div>

                        <div className="myevent__subcount">
                            <Badge count={props.event.subscribersCount} style={{ backgroundColor: '#52c41a'}} />
                        </div>
                    </div>

                    <div className="mycard__middle">
                        <div className="mycard__body">
                            <div className="myevent__title">
                                {props.event.title}
                            </div>
                            <div className="myevent__category">
                                {props.event.category}
                            </div>
                            <div className="myevent__date">
                                {day + " " + month + "   " + time} 
                            </div>
                        </div>
                    </div>
                    <div className="mycard__right">
                        <div className="myevent__button">
                            {
                                {
                                    "scheduled": <Button onClick={() => window.open(props.event.joinUrl, "_blank")} style={styles.button}>Scheduled</Button>,
                                    "In progress" : <Button onClick={() => window.open(props.event.zoomLink, "_blank")} style={styles.button}>Join</Button>,
                                    "completed": <Button style={styles.button}>Completed</Button>,
                                }[props.event.eventStatus]
                            }
                        </div>
                    </div>
                </div>    
            </div>
    )
}

