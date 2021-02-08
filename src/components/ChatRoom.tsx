import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import styles from "../styles/ChatRoom.module.css";
import { Form, Input, Button } from 'antd';

interface Props {
	username: string
	selectedRoom:any
}

interface State {
	messageSent: string | null
}

export default class ChatRoom extends Component<Props,State> {
	private formRef : any
	private messagesEnd: any;
	constructor(props: Props) {
		super(props);
		this.formRef = React.createRef();
	}
	  
	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}
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
		return (
			<div className={styles.ChatHeader}>
				<div className={styles.chatRoomName}>{this.props.selectedRoom.name}</div>
				<div className={styles.chatRoomUsers}>
					<span className={styles.currentUserName}>{this.props.username}</span>
					{this.props.selectedRoom.users
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
	
	private getMessagesArea(){
		return (
			<div className={styles.messages}>
				{this.props.selectedRoom.messages.map((x:any,i:number,arr:any[])=>{
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
								{arr[i+1] && arr[i].name!==arr[i+1].name && <div className={styles.sentUser}>{x.name}</div>}
							</div>
						);
					}
				})}
				<div ref={(el) => { this.messagesEnd = el; }}></div>
			</div>
		);
	}
	
	private scrollToBottom = () => {
	  this.messagesEnd.scrollIntoView();
	}
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
						
					>
						<Input
							type="text"
							placeholder='Type a message...'
							className={styles.inputBox}
							value=''
						/>
					</Form.Item>
					<Form.Item>
						<Button type="link" htmlType="submit" className={styles.sendButton}
						>
							Send
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
	
	private async sendMessage(msg: string) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
			  name: this.props.username,
			  message: msg,
			})
		};
		fetch('http://localhost:8080/api/rooms/0/messages', requestOptions)
			.then(res => res.json())
			.then(() => {
				fetch('http://localhost:8080/api/rooms/' + this.props.selectedRoom.id + '/messages')
				.then(res => res.json())
				.then((updatedMessages) => {
					this.props.selectedRoom.messages = updatedMessages;
					this.formRef.current.resetFields();
					this.setState({
						messageSent: msg
					});
			}, (error) => {
				console.error(error.message);
				this.setState({
					messageSent: null
				});
			});
		});
	}
}