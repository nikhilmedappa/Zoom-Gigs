import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { signin } from '../../actions/userActions'

import 'antd/dist/antd.css';
import './style.css';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';




function Signin(props) {

  const onFinish = formData => {
    console.log('Received values of form: ', formData);
    props.signin(formData);
    props.history.push('/')
  };

  const styles = {
    formIput: {
      width: '260px',
      borderRadius: '100px'
    }
  }

  return (
    <div className="signin-form">
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      >
        <Form.Item
          name="username"
          style={styles.formIput}
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          style={styles.formIput}
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
        New to ZoomGigs <Link to="/signup" style={{ textDecoration: 'none' }}>Register Now!</Link>
      </Form>
    </div>
  )
}


const mapStatetoProps = (state) => ({
  userInfo: state.userSignin.userInfo,
  error: state.userSignin.error
})

export default connect(mapStatetoProps, {
  signin
})(Signin)
