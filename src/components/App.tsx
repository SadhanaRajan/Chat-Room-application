import React, { Component, Fragment } from 'react';

import '../styles/App.css';
import { Button } from 'antd';
import Login from './Login';
import Chat from './Chat';

interface Props {
  
}

interface State {
	page: 'login'|'chat'
	username?: any
}

export default class App extends Component<Props,State> {
	private rooms: { name: React.ReactNode; }[];
	constructor(props: Props) {
	super(props);
		this.loginWithUsername = this.loginWithUsername.bind(this);
		this.state = {
			page: 'login'
		};
		this.rooms = [];
	}

	private loginWithUsername(username: string){
		fetch('http://localhost:8080/api/rooms')
		.then(res => res.json())
		.then(
			(result) => {
				this.rooms = result;
				this.setState({
					page: 'chat',
					username: username
				});
			}, (error) => {
				console.error(error.message);
				this.setState({
					page: 'login',
					username: username
				});
			});
	}

	public render() {
		return (
			<Fragment>
				{this.state.page==='login' && (
					<Login
						loginWithUsername={this.loginWithUsername}
					/>
				)}
				{this.state.page==='chat' && (
					<Chat
						username={this.state.username}
						rooms={this.rooms}
					/>
				)}
			</Fragment>
		)
	}
}