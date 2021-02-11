/**
 * Chat Page after user has successfully logged in
 * @module: Chat
 * @author: Sadhana Rajan
 */

import React, { Component, Fragment } from 'react';
import styles from "../styles/ChatRoom.module.css";
import { message } from 'antd';
import LeftPanel from './LeftPanel';
import ChatRoom from './ChatRoom';
import NoRoomSelected from './NoRoomSelected';
import API from '../apis/RoomsAPI'

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

	/**
	 * Renders Left panel with username and list of rooms
	 * Once a room is selected, renders chat messages on the right
	 */
	public render() {
		return (
			<>
				<div className={styles.ChatWindow}>
					<LeftPanel
						username={this.props.username}
						rooms={this.props.rooms}
						selectedRoom={ (roomId, roomName) => this.getRoomDetails(roomId, roomName) }
						logOut={this.props.logOut}
					/>
					{this.state.selectedRoom ? (
						<ChatRoom
							username={this.props.username}
							selectedRoom={this.state.selectedRoom}
						/>
					) : (
						<NoRoomSelected
							rooms={this.props.rooms}
						/>
					)}
				</div>
			</>
		);
	}
	
	/**
	 * Fetch room users list and messages from backend
	 * @param roomId number ID of the chat room
	 * @param roomName name of the chat room
	 */
	private getRoomDetails(roomId:number, roomName: string) {
		Promise.all([
			API.getRoomsDetailsAPI(roomId),
			API.getMessagesAPI(roomId)
		]).then( ([roomDetails, roomMessages]) => {
			//de-duplicate users list
			const userSet = [...new Set(roomDetails.users)];
			this.setState({
				selectedRoom: {
					name: roomName,
					id: roomId,
					users: userSet,
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