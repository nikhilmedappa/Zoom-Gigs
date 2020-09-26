import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


import { Button } from 'antd';


import 'antd/dist/antd.css';
import './style.css';


function Navbar(props){
  const loggedIn = props.userInfo
  
  const styles = {
    headerButton: {
      borderRadius: "20px",
      color: 'rgb(80, 80, 80)'
    },
    createShowButton: {
      borderRadius: "20px",
      color: 'rgb(80, 80, 80)',
      backgroundColor: '#DFCFBE'
    }
  }

  return ( 
    <div className="header">
      <div className="header__left">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h3 style={{color: 'white'}}>Zoom Gigs</h3>
        </Link>
      </div>

      <div className="header__right">
        <div className="header__options">
          <Button key="3" style={styles.headerButton}>
            {loggedIn ? (<Link to="/myshows" style={{ textDecoration: 'none' }}>My Shows</Link>) : (<Link to="/signin" style={{ textDecoration: 'none' }}>My Shows</Link>)}
          </Button>
        </div>
            
        <div className="header__options">
          <Button key="2" style={styles.headerButton}>
            {loggedIn ? (<Link to="/profile" style={{ textDecoration: 'none' }}>Profile</Link>) : (<Link to="/signin" style={{ textDecoration: 'none' }}>Sign In</Link>)}
          </Button>
        </div>
            
        <div>
          <Button key="1" type="primary" style={styles.createShowButton}>
            {loggedIn ? (<Link to="/createshow" style={{ textDecoration: 'none' }}>Create Show</Link>) : (<Link to="/signin" style={{ textDecoration: 'none' }}>Create Show</Link>)}
          </Button>
        </div>
      </div>
    </div>
  )
};

const mapStatetoProps = state => ({
  userInfo: state.userSignin.userInfo
})

export default connect(mapStatetoProps)(Navbar)