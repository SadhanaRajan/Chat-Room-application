import React, { Component, Fragment } from 'react';
import styles from "../styles/LeftPanel.module.css";
import { Form, Input, Button } from 'antd';

interface Props {
	username: string
	rooms: any[]
	selectedRoom: (roomId: number, roomName: string)=>void;
	logOut: ()=>void
}

interface State {
	selectedRoom: number | null
}

export default class LeftPanel extends Component<Props,State> {
	private startTime: any;
	constructor(props: Props) {
		super(props);
		this.state = {
			selectedRoom: null
		};
	}
	  
	public componentDidMount() {
		this.startTime = Date.now();
		
	}
	
	private getOnlineTime(){
		return '--'
		// return Date.now()-this.startTime;
	}
	
	public render(){
		return (
		<div className={styles.LeftPanel}>
			<div className={styles.nameTime}>
				<div className={styles.username}>{this.props.username}</div>
				<div className={styles.onlineTime}>Online for {this.getOnlineTime()} </div>
			</div>
			<div>
				{this.props.rooms.map((x,i)=>{
					return (
						<div
							key={i}
							className={`${styles.roomName} ${this.state.selectedRoom===x.id?styles.selectedRoomName:''}`}
							onClick={()=>{this.selectRoom(x.id, x.name)}}
						>{x.name}</div>
					);
				})}
			</div>
			<Button type="link" className={styles.logOutLink} onClick={()=>this.props.logOut()}>
				&#x21e4;&nbsp;Log out
			</Button>
		</div>
		);
	}
	
	private selectRoom(roomId:number, roomName:string): void {
		this.setState({
			selectedRoom: roomId
		});
		this.props.selectedRoom(roomId, roomName);
	}
	
}