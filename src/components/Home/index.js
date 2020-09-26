import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux'
import './style.css'



import { getEvents } from '../../actions/eventActions'
import { getCategories } from '../../actions/categoryActions'
import { getCurrentUser } from '../../actions/userActions'

import CategoryCard from '../CategoryCard'
const EventCard = lazy(() => import('../EventCard'))


class Home extends Component {
    constructor() {
        super();

        this.state={
            category: null
        }
        this.categoryHandler = this.categoryHandler.bind(this)
        this.alleventsHandler = this.alleventsHandler.bind(this)
    }



    componentDidMount() {
        this.props.getEvents();
        this.props.getCategories();
        this.props.getCurrentUser()
    }

    categoryHandler(id, e) {
        e.preventDefault()
        this.setState({
            category: id
        })
    }
    
    alleventsHandler(e){
        e.preventDefault()
        this.setState({
            category: null
        })
    }


    render(){
        const { isLoading, error, events, categories } = this.props

        return (
            isLoading? <div>Loading...</div> : 
            error ? <div>{error}</div> :
            <div className="home"> 
                <div className="home__categories">
                    <div className="home__categories__title">
                        Discover
                    </div>

                    <div className="home__categories__allevents">
                        <button onClick={this.alleventsHandler} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', outline: 'none'}}>All Events</button>
                    </div>
                    
                    <div className="home__categories__cards">
                        {categories && categories.map((item, index) => {
                            return <CategoryCard category={item} key={item._id} categoryHandler={this.categoryHandler} />
                        })}
                    </div>
                </div>
                
                <div className="home__events">
                    <div className="home__events__title">
                        Events
                    </div>

                    <div className="home__events__container">
                        <div className="home__events__card">
                            {events.filter((item) => { 
                                if(this.state.category == null) {
                                    return item;
                                } else if(item.categoryId.includes(this.state.category)){
                                    return item
                                }
                            }).map((item) => {
                                return <Suspense key={item._id} fallback={<div>Loading...</div>}>
                                    <EventCard event={item} key={item._id} />
                                </Suspense>               
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => ({
    events: state.getEvents.events,
    isLoading: state.getEvents.isLoading,
    error: state.getEvents.error,
    categories: state.getCategories.categories,
    currentUser: state.getCurrentUser.currentUser 
})

export default connect(mapStatetoProps, {
    getEvents,
    getCategories,
    getCurrentUser
})(Home)
