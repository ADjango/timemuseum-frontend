import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Select, Form, Input, Card } from 'antd';
import api from '../http/api';
import { store } from '../redux/store';
import { setUsername, setUserId, setJwtToken, setAvatarUrl } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const { Option } = Select;


function LoginPage() {

  const [verifyCodeLogin, setVerifyCodeLogin] = useState(false)
  const navigate = useNavigate();

  const onPasswordFinish = (values) => {
    console.log("username password login: ", values)
    // api.postRequest('/login', {
    //   username: values.username,
    //   password: values.password
    // }).then(res => {
    //   console.log(res)
    //   store.dispatch(setUsername(res.data.username))
    //   store.dispatch(setUserId(res.data.id))
    //   store.dispatch(setJwtToken(res.data.accessToken))
    //   console.log(store.getState())
    //   navigate('/')
    // })
    axios.post(
      'http://localhost:8080/api/login',
      {
        username: values.username,
        password: values.password
      }
    ).then(res => {
      console.log(res)
      store.dispatch(setUsername(res.data.username))
      store.dispatch(setUserId(res.data.id))
      store.dispatch(setJwtToken(res.data.accessToken))
      store.dispatch(setAvatarUrl(res.data.avatarUrl))
      console.log(store.getState())
      navigate('/')
      window.location.reload()
    })
  }

  const onVerifyCodeFinish = (values) => {
    console.log(values)
  }

  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select
  //       style={{
  //         width: 70,
  //       }}
  //     >
  //       <Option value="86">+86</Option>
  //       <Option value="87">+87</Option>
  //     </Select>
  //   </Form.Item>
  // );

  const PasswordForm = (
    <>
      <h2>帐号密码登录</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
          prefix: '86'
        }}
        onFinish={onPasswordFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="手机号 / 邮箱" size='large' />
        </Form.Item>
        <Form.Item
          name="password"
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
            placeholder="请输入密码"
            size='large'
          />
        </Form.Item>

        <Form.Item>
          <Button name='passworloginbt' type="primary" htmlType="submit" className="login-form-button" size='large' block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </>

  )

  const VerifyCodeForm = (

    <>
      <h2>验证码登录</h2>
      <Form
        name="verifyCode_login"
        className="verifyCode-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onVerifyCodeFinish}
      >
        <Form.Item
          name="phonenumber"
          rules={[
            {
              required: true,
              message: 'Please input your phonenumber!',
            },
          ]}
        >

          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="手机号" size='large' />
        </Form.Item>
        <Form.Item
          name="verifycode"
          rules={[
            {
              required: true,
              message: 'Please input your verifycode!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="请输入验证码"
            size='large'
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" size='large' block>
            登录 / 注册
          </Button>
        </Form.Item>
      </Form>
    </>
  )

  const comp = () => {
    if (verifyCodeLogin)
      return VerifyCodeForm
    else
      return PasswordForm
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '50px 0', }}>
      <Card style={{ width: '500px', boxShadow: '0px 3px 6px 0px rgba(0, 0, 0, 0.12)' }}>

        {comp()}

        {
          verifyCodeLogin ?
            <a onClick={() => setVerifyCodeLogin(false)}>密码登录</a>
            :
            <a onClick={() => setVerifyCodeLogin(true)}>验证码登录</a>
        }

        <div style={{
          marginTop: '42px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          注册或登录即代表您同意《用户协议》和《隐私协议》
        </div>
      </Card>
    </div>
  )
}

export default LoginPage
