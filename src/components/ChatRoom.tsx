/**
 * Chat Room main panel - shows room details and messages
 * @module: ChatRoom
 * @author: Sadhana Rajan
 */

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import styles from "../styles/ChatRoom.module.css";
import { Form, Input, Button } from 'antd';
import API from '../apis/RoomsAPI';

interface Props {
	username: string
	selectedRoom: {
		name: string,
		id: number,
		users?: string[],
		messages?: any[]
	}
}

interface State {
	messageSent: string | null
	refresh: boolean
}

export default class ChatRoom extends Component<Props,State> {
	private formRef : any
	private messagesEnd: HTMLDivElement | null
	private intervalID: NodeJS.Timeout | null

	constructor(props: Props) {
		super(props);
		this.formRef = React.createRef();
		this.intervalID = null;
		this.messagesEnd = null;
	}
	  
	async componentDidMount() {
		
		this.scrollToBottom();
		////////// this is highly dangerous //////// commenting it out for now
		// this.intervalID = setInterval(
		//   () => this.checkForNewMessages(),
		//   1000
		// );
	}

	async componentDidUpdate() {
		this.scrollToBottom();
	}
	
	public componentWillUnmount() {
		if(this.intervalID) {
			clearInterval(this.intervalID);
		}
	}

	/**
	 * Renders chat room UI
	 */
	public render(){
		return (
		<div className={styles.ChatRoom}>
				{this.getChatRoomHeader()}
				{this.getMessagesArea()}
				{this.getChatRoomFooter()}
		</div>
		);
	}
	
	private getChatRoomHeader(){
		//TODO: check room with 10 or more users
		return (
			<div className={styles.ChatHeader}>
				<div className={styles.chatRoomName} id={'chatRoomName'}>{this.props.selectedRoom.name}</div>
				<div className={styles.chatRoomUsers} id={'chatRoomUsers'}>
					<span className={styles.currentUserName}>{this.props.username}</span>
					{this.props.selectedRoom.users && this.props.selectedRoom.users
						.filter((x:string)=>x!==this.props.username)
						.map((x: string, i:number, arr: string[])=>{
						return (
							<span key={i}>
								&#x2c;&nbsp;{x}
							</span>
						);
					})}
				</div>
			</div>
		);
	}
	
	/**
	 * Renders all messages in chat room
	 * Will always scroll to the bottom automatically to show latest messages
	 */
	private getMessagesArea(){
		return (
			<div className={styles.messages}>
				{this.props.selectedRoom.messages && this.props.selectedRoom.messages.map((x:any,i:number,arr:any[])=>{
					if(x.name===this.props.username){
						return (
							<div key={i}>
								<div className={styles.currentUserMessage}>{x.message}</div>
							</div>
						);
					} else {
						return (
							<div key={i}>
								<div className={styles.pastMessage}>{x.message}</div>
								{arr[i+1] ?
									(arr[i].name!==arr[i+1].name ?
										<div className={styles.sentUser}>{x.name}</div>:'')
									: <div className={styles.sentUser}>{x.name}</div>}
							</div>
						);
					}
				})}
				<div ref={(el) => { this.messagesEnd = el; }}></div>
			</div>
		);
	}
	
	/**
	 * Will always scroll to the bottom automatically to show latest messages
	 */
	private scrollToBottom = () => {
		if(this.messagesEnd) {
			this.messagesEnd.scrollIntoView();
		}
	}

	/**
	 * Renders Form for user to type messages and send
	 */
	private getChatRoomFooter(){
		return (
			<div className={styles.typingArea}>
				<Form
					ref={this.formRef}
					layout="inline"
					onFinish={(values) => {
						if(values && values.currentText) {
							let trimmedText = values.currentText.replace(/^\s*(\S+)\s*$/, "$1");
							if(trimmedText.length>0) {
								this.sendMessage(trimmedText);
							}
						}
					}}
				>
					<Form.Item
						name="currentText"
						label=""
						style={{width:'80%'}}
					>
						<Input
							type="text"
							placeholder='Type a message...'
							className={styles.inputBox}
							value=''
						/>
					</Form.Item>
					<Form.Item>
						<Button type="link" htmlType="submit" className={styles.sendButton}>
							Send
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
	
	private async checkForNewMessages(){
		API.getMessagesAPI(this.props.selectedRoom.id).then( (messages) =>{
			if(JSON.stringify(this.props.selectedRoom.messages)!==JSON.stringify(messages)){
				//new message found - needs refresh
				this.props.selectedRoom.messages = messages;
				this.formRef.current.resetFields();
				this.setState({
					refresh: true
				});
			}
		}).catch( (error) => {
			console.error(error.message);
			this.setState({
				messageSent: null
			});
		});
	}
	
	/**
	 * POST call to backend server to store the message sent
	 * @param msg string message sent by current user
	 */
	private async sendMessage(msg: string) {
		API.postMessagesAPI(this.props.selectedRoom.id, {
			name: this.props.username,
			message: msg
		}).then( () =>{
			API.getMessagesAPI(this.props.selectedRoom.id).then( (updatedMessages) =>{
				this.props.selectedRoom.messages = updatedMessages;
				this.formRef.current.setFieldsValue({currentText:''});
				this.setState({
					messageSent: msg
				});
			}).catch( (error) => {
				console.error(error.message);
				this.setState({
					messageSent: null
				});
			});
		});
	}
}