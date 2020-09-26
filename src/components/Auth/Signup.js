import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { register } from '../../actions/userActions'

import 'antd/dist/antd.css';
import './style.css'

import { Form, Input, Tooltip, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Signup(props) {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
    props.register(values);
    if(values) {
      props.history.push('/signin')
    } else {
      console.log(props.error)
    }
  };

  return (
    <div className="signup-form">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }

              return Promise.reject('The two passwords that you entered do not match!');
            },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="username"
          label={
          <span>
            Username&nbsp;
            <Tooltip title="What do you want others to call you?">
            <QuestionCircleOutlined />
            </Tooltip>
          </span>
          }
          rules={[
          {
            required: true,
            message: 'Please input your username!',
            whitespace: true,
          },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
          Register
          </Button>
        </Form.Item>
        Already a user <Link to="/signin" style={{ textDecoration: 'none' }}>Sign In</Link>
      </Form>
    </div>
  );
};

const mapStatetoProps = state => ({
  userInfo: state.userRegister.userInfo,
  error: state.userRegister.error

})

export default connect(mapStatetoProps, {
  register,
})(Signup)