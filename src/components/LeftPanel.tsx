import React, { Component, Fragment } from 'react';
import styles from "../styles/LeftPanel.module.css";
import { Form, Input, Button, message } from 'antd';
import { clear } from 'console';

interface Props {
	username: string
	rooms: any[]
	selectedRoom: (roomId: number, roomName: string)=>void;
	logOut: ()=>void
}

interface State {
	onlineTimer: any
	selectedRoom: number | null
}

export default class LeftPanel extends Component<Props,State> {
	private startTime: any;
	private intervalID: NodeJS.Timeout | null
	constructor(props: Props) {
		super(props);
		this.state = {
			onlineTimer: 'less than a second',
			selectedRoom: null
		};
		this.intervalID = null;
	}
	  
	public componentDidMount() {
		this.startTime = Date.now();
		this.intervalID = setInterval(
		  () => this.getOnlineTime(),
		  5000
		);
	}

	public componentWillUnmount() {
		if(this.intervalID) {
			clearInterval(this.intervalID);
		}
	}
	
	public render() {
		return (
			<div className={styles.LeftPanel}>
				<div className={styles.nameTime}>
					<div className={styles.username}>{this.props.username}</div>
					{this.state.onlineTimer && <div className={styles.onlineTime}>Online for {this.state.onlineTimer}</div>}
				</div>
				<div className={styles.roomList}>
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

	private millisecondsToStr () {
		const milliseconds = Date.now() - this.startTime;
		function numberEnding (number: number) {
			return (number > 1) ? 's' : '';
		}

		var temp = Math.floor(milliseconds / 1000);
		var years = Math.floor(temp / 31536000);
		if (years) {
			return years + ' year' + numberEnding(years);
		}
		//TODO: Months! Maybe weeks?
		var days = Math.floor((temp %= 31536000) / 86400);
		if (days) {
			return days + ' day' + numberEnding(days);
		}
		var hours = Math.floor((temp %= 86400) / 3600);
		if (hours) {
			return hours + ' hour' + numberEnding(hours);
		}
		var minutes = Math.floor((temp %= 3600) / 60);
		if (minutes) {
			return minutes + ' minute' + numberEnding(minutes);
		}
		var seconds = temp % 60;
		if (seconds) {
			return seconds + ' second' + numberEnding(seconds);
		}
		return 'less than a second';
	}
	
	private getOnlineTime() {
		this.setState({
			onlineTimer: this.millisecondsToStr()
		})
	}
	
	private selectRoom(roomId:number, roomName:string): void {
		this.setState({
			selectedRoom: roomId
		});
		this.props.selectedRoom(roomId, roomName);
	}
	
}