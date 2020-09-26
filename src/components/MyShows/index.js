import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getMyRegEvents , getMyOrgEvents } from '../../actions/eventActions';

import OrgEventCard from '../MyEventCard/OrgEventCard';
import RegEventCard from '../MyEventCard/RegEventCard';

import './style.css';

class MyShows extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        this.props.getMyOrgEvents();
        this.props.getMyRegEvents();
    }


    render(){

        const { myRegEvents, myOrgEvents } = this.props

        return(
            <div className="myshow">
                <div className="myreg__events">
                    <div className="events__title">
                        Registered Events
                    </div>
                    <div className="events__card">
                        {myRegEvents ? myRegEvents.map((item, index) => {
                            return <RegEventCard event={item} key={item.id} />
                        }) : <div><h1>No Registered Events</h1></div>}
                    </div>
                </div>
                <div className="myorg__events">
                    <div className="events__title">
                        Organised Events
                    </div>
                    <div className="events__card">
                        {myOrgEvents ? myOrgEvents.map((item, index) => {
                            return <OrgEventCard event={item} key={item.id} />
                        }) : <div><h1>No Organised Events</h1></div>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => ({
    myRegEvents: state.getMyRegEvents.myregisteredevents,
    myOrgEvents: state.getMyOrgEvents.myorganisedevents,

})

export default connect(mapStatetoProps, {
    getMyRegEvents,
    getMyOrgEvents,
})(MyShows)