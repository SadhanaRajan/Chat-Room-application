import React, { Component } from 'react';
import styles from "../styles/Login.module.css";
import { Form, Input, Button, Alert } from 'antd';

interface Props {
  loginWithUsername: (username: string)=>void
}

interface State {
}

export default class Login extends Component<Props,State> {
    constructor(props: Props) {
        super(props);
    }

    /**
     * Renders form for user to login to chat app
     */
    public render(){
        return (
            <Form className={styles.login}
                onFinish={ (values) => {
                this.props.loginWithUsername(values.username);
                }}>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: <div>Username is required and can only include <br/>a-z A-Z 0-9 _ - '</div>,
                            // pattern: /\S+/
                            pattern: /[A-Za-z0-9_][A-Za-z0-9_\'\-]*([\ A-Za-z0-9_][A-Za-z0-9_\'\-]+)*/
                        },
                    ]}>
                    <Input className={styles.username} name="username" placeholder="Type your username..." />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" danger htmlType="submit" className={styles.loginButton}>
                        Join the DoorDash Chat!
                    </Button>
                </Form.Item>
                {/* <Alert message="Usernames are case sensitive" type="info" /> */}
            </Form>
        )
    }
  }