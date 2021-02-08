import React, { Component, Fragment } from 'react';
import styles from "../styles/ChatRoom.module.css";
import { Form, Input, Button, message } from 'antd';
import LeftPanel from './LeftPanel';
import ChatRoom from './ChatRoom';
import NoRoomSelected from './NoRoomSelected';

interface Props {
	username: string
	rooms: any[]
	logOut: ()=>void
}

interface State {
	selectedRoom: any
}

export default class Chat extends Component<Props,State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			selectedRoom: null
		};
	}
	public render() {
		return (
		<Fragment>
			<div className={styles.ChatWindow}>
				<LeftPanel
					username={this.props.username}
					rooms={this.props.rooms}
					selectedRoom={ (roomId, roomName) => this.getRoomDetails(roomId, roomName) }
					logOut={this.props.logOut}
				/>
				{this.state.selectedRoom && (
					<ChatRoom
						username={this.props.username}
						selectedRoom={this.state.selectedRoom}
					/>
				)}
				{this.props.rooms.length===1 && (
					<ChatRoom
						username={this.props.username}
						selectedRoom={this.props.rooms[0]}
					/>
				)}
				{!this.state.selectedRoom && (
					<NoRoomSelected
						rooms={this.props.rooms}
					/>
				)}
			</div>
		</Fragment>
		);
	}
	
	private getRoomDetails(roomId:number, roomName: string) {
		Promise.all([
			fetch('http://localhost:8080/api/rooms/' + roomId),
			fetch('http://localhost:8080/api/rooms/' + roomId + '/messages')
		]).then(function (responses) {
			// Get a JSON object from each of the responses
			return Promise.all(responses.map(function (response) {
				return response.json();
			}));
		}).then( ([roomDetails, roomMessages]) => {
			this.setState({
				selectedRoom: {
					name: roomName,
					id: roomId,
					users: roomDetails.users,
					messages: roomMessages
				}
			});
		}).catch( (error) => {
			// if there's an error, log it and show it
			console.error(error);
			message.error(error.name + '. There seems to be an error fetching chat room details');
			this.setState({
				selectedRoom: null
			});
		});
	}
}