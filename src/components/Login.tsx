import React, { Component } from 'react';
import styles from "../styles/Login.module.css";
import { Form, Input, Button } from 'antd';

interface Props {
  loginWithUsername: (username: string)=>void
}

interface State {
}

export default class Login extends Component<Props,State> {
      constructor(props: Props) {
          super(props);
      }
      public render(){
          return (
              <Form className={styles.login}
                  onFinish={ (values) => {
                    console.log('Success:', values);
                    this.props.loginWithUsername(values.username);
                  }}
                  onFinishFailed={ (errorInfo) => {
                    console.log('Failed:', errorInfo);
                  }}>
                  <Form.Item
                      name="username"
                      rules={[
                          {
                              required: true,
                              message: <div>Please enter valid username <br/>(only including alphabets, numbers, underscore, hyphen, apostrophe. No other special characters are allowed)</div>,
                              pattern: /^[A-Za-z0-9_][A-Za-z0-9_\'\-]+([\ A-Za-z0-9_][A-Za-z0-9_\'\-]+)*/
                          },
                      ]}>
                      <Input className={styles.username} name="username" placeholder="Type your username..." />
                  </Form.Item>
                  <Form.Item >
                      <Button type="primary" danger htmlType="submit" className={styles.loginButton}>
                          Join the DoorDash Chat!
                      </Button>
                  </Form.Item>
              </Form>
          )
      }
  }