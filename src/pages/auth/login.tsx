import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const LoginForm = () => {
  function handleSubmit() {}

  function checkUsername() {}

  return (
    <Form onFinish={handleSubmit} className="login-form">
      <Form.Item
        rules={[
          { required: true, message: 'Please input your username!' },
          { validator: checkUsername },
        ]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Checkbox>Remember me</Checkbox>
        <a className="login-form-forgot" href="">
          Forgot password
        </a>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
