/**
 * Entry page for Chat room Application
 * @module: App
 * @author: Sadhana Rajan
 */

import React, { Component, Fragment } from 'react';
import '../styles/App.css';
import { message } from 'antd';
import Login from './Login';
import Chat from './Chat';
import API from '../apis/RoomsAPI'

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

	/**
	 * fetch rooms data, and sets state with username
	 * @param username string entered by user to login to chat app
	 */
	private loginWithUsername(username: string) {
		API.getRoomListAPI().then( (result) => {
			this.rooms = result;
			this.setState({
				page: 'chat',
				username: username
			});
		}).catch( (error) => {
			console.error(error.message);
			message.error(error.name + '. There seems to be an error logging in');
			this.setState({
				page: 'login',
				username: username
			});
		});
	}

	/**
	 * Renders Login page or Chat page according to state
	 */
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
						logOut={()=>{
							this.setState({
								page: 'login'
							})
						}}
					/>
				)}
			</Fragment>
		);
	}
}