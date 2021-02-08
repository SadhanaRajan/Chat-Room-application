import React, { Component, Fragment } from 'react';
import styles from "../styles/ChatRoom.module.css";
import { Form, Input, Button } from 'antd';

interface Props {
	username: string
	selectedRoom:any
}

interface State {
}

export default class ChatRoom extends Component<Props,State> {
	private messagesEnd: any;
	constructor(props: Props) {
		super(props);
		
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
			<div className={styles.ChatHeader}>
				<div className={styles.chatRoomName}>{this.props.selectedRoom.name}</div>
				<div className={styles.chatRoomUsers}>
					<span className={styles.currentUserName}>{this.props.username}</span>
					{this.props.selectedRoom.users
						.filter((x:string)=>x!==this.props.username)
						.map((x: string, i:number, arr: string[])=>{
						return (
							<>
								&#x2c;&nbsp;
								<span key={i}>{x}</span>
							</>
						);
					})}
				</div>
			</div>
			<div className={styles.messages}>
				{this.props.selectedRoom.messages.map((x:any,i:number,arr:any[])=>{
					return (
						<div key={i}>
							<div className={styles.pastMessage}>{x.message}</div>
							<div className={styles.sentUser}>{x.name}</div>
						
							{/* <div className={styles.pastMessage}>{x.message}</div>
							<div className={styles.sentUser}>{x.name}</div>
							<div className={styles.pastMessage}>{x.message}</div>
							<div className={styles.sentUser}>{x.name}</div>
							<div className={styles.pastMessage}>{x.message}</div>
							<div className={styles.sentUser}>{x.name}</div>
							<div className={styles.pastMessage}>{x.message}</div>
							<div className={styles.sentUser}>{x.name}</div>
							<div className={styles.pastMessage}>{x.message}</div>
							<div className={styles.sentUser}>{x.name}</div> */}
						</div>
					);
				})}
				<div ref={(el) => { this.messagesEnd = el; }}></div>
			</div>
			<div className={styles.typingArea}>
				<Form
					layout="inline"
					onFinish={(values) => {
						console.log("Received values from form: ", values.currentText);
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
		</div>
		);
	}
	
	private scrollToBottom = () => {
	  this.messagesEnd.scrollIntoView();
	}
}