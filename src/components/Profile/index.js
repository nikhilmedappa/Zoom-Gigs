import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.css'

import { updatePayment, logout, getCurrentUser } from '../../actions/userActions'

import { Form, Input, Button } from 'antd';



class Profile extends Component{
constructor(props){
    super(props);
    this.state = {
        currentUser: {}
    };

    this.onFinish = this.onFinish.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
}


    onFinish = formData => {
        console.log('Received values of form: ', formData);
        this.props.updatePayment(formData);
        console.log('after Update Data', this.props.userInfo);
        this.props.history.push('/');
    };

    logoutHandler = event => {
        event.preventDefault();
        this.props.logout();
        this.props.history.push('/');
    }

    componentDidMount() {
        this.props.getCurrentUser();
    }

    render(){
        const styles = {
            button: {
                backgroundColor: 'rgb(80, 80, 80)',
                
            }
        }

        const { currentUser } = this.props
        return (
            <div className="profile">
                <div className="profile__userInfo">
                    <div className="profile__userInfo__username">
                        Username: {currentUser && currentUser.username}
                    </div>
                    
                    <div className="profile__userInfo__email">
                        Email: {currentUser && currentUser.email}
                    </div>
                </div>
                <div className="razorpay__update">
                    <div className="razorpay__update__info">
                        Add your Razor Pay details to integrate payment for the events you create!
                    </div>
                    <div className="razorpay__update__form">
                        <Form
                            name="normal_login"
                            className="login-form"
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="razorpayappId"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Razorpay ID!',
                                },
                                ]}
                            >
                                <Input placeholder="Razorpay ID" />
                            </Form.Item>
    
                            <Form.Item
                                name="razorpayappsecretKey"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Razorpay Key!',
                                },
                                ]}
                            >
                                <Input placeholder="Razorpay Key" />
                            </Form.Item>
    
                            <div className="zoom__update__info">
                                Add your Zoom details to integrate payment for the events you create!
                            </div>
                    
                            <Form.Item
                                name="api_key"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Zoom ID!',
                                },
                                ]}
                            >
                                <Input placeholder="Zoom ID" />
                            </Form.Item>
    
                            <Form.Item
                                name="api_secret"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your Zoom Api Key!',
                                },
                                ]}
                            >
                                <Input placeholder="Zoom Key" />
                            </Form.Item>
    
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={styles.button} className="login-form-button">
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>    

                <div className="logout__btn">
                    <Button type="primary" htmlType="submit" style={styles.button} className="login-form-button" onClick={this.logoutHandler}>
                        Logout
                    </Button>
                </div>
            </div>
        )
    }
    
}

const mapStatetoProps = (state) => ({
    userInfo: state.userUpdate.userInfo,
    error: state.userUpdate.error,
    currentUser: state.getCurrentUser.currentUser 
    
})

export default connect(mapStatetoProps, { updatePayment, logout, getCurrentUser })(Profile)

