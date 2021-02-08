import React, { Component, Fragment } from 'react';
import styles from "../styles/ChatRoom.module.css";
import { Form, Input, Button } from 'antd';
import LeftPanel from './LeftPanel';
import ChatRoom from './ChatRoom';
import NoRoomSelected from './NoRoomSelected';

interface Props {
	username: string
	rooms: any[]
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
		fetch('http://localhost:8080/api/rooms/' + roomId + '/messages')
		.then(res => res.json())
		.then(
			(roomMessages) => {
				this.setState({
					selectedRoom: {
						name: roomName,
						id: roomId,
						users: roomMessages.map((x:any)=>x.name),
						messages: roomMessages
					}
				});
			}, (error) => {
				console.log(error.message);
				this.setState({
					selectedRoom: null
				});
			});
	}
}