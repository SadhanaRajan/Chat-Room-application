import React, { Component, Fragment } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
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
	usernameOverflow: boolean
	onlineTimer: any
	selectedRoom: number | null
}

export default class LeftPanel extends Component<Props,State> {
	private startTime: any;
	private intervalID: NodeJS.Timeout | null
	private textElement: any;
	constructor(props: Props) {
		super(props);
		this.state = {
			usernameOverflow: false,
			onlineTimer: 'less than a second',
			selectedRoom: null
		};
		this.intervalID = null;
		this.textElement = React.createRef();
	}
	  
	public componentDidMount() {
		this.checkUsernameOverflow();
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
	
	private renderUsername() {
		return (
			<div id={'username'} ref={this.textElement} className={`${styles.username} ${styles.mightOverflow}`}>
				{this.props.username}
			</div>
		);
	}

	/**
	 * Renders Left panel with username, list of rooms and an option to log out
	 */
	public render() {
		return (
			<div className={styles.LeftPanel}>
				<div className={styles.nameTime}>
					{this.state.usernameOverflow ? (
						<Tippy content={this.props.username} placement="right">
							{this.renderUsername()}
						</Tippy>
					):(
						this.renderUsername()
					)}
					{this.state.onlineTimer && <div className={styles.onlineTime}>Online for {this.state.onlineTimer}</div>}
				</div>
				<div className={styles.roomList}>
					{this.props.rooms.map((x,i)=>{
						return (
							<div
								key={i}
								id={'roomName'+'_'+i}
								className={`${styles.roomName} ${this.state.selectedRoom===x.id?styles.selectedRoomName:''}`}
								onClick={()=>{this.selectRoom(x.id, x.name)}}
							>{x.name}</div>
						);
					})}
				</div>
				<Button type="link" className={styles.logOutLink} id={'logout'} onClick={()=>this.props.logOut()}>
					&#x21e4;&nbsp;Log out
				</Button>
			</div>
		);
	}

	/**
	 * sets state with session duration
	 */
	private getOnlineTime() {
		this.setState({
			onlineTimer: this.getDuration()
		});
	}

	/**
	 * Calculates duration user session, and converts to readable format
	 */
	private getDuration () {
		const duration = Date.now() - this.startTime;
		function numberEnding (number: number) {
			return (number > 1) ? 's' : '';
		}

		var temp = Math.floor(duration / 1000);
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
	
	/**
	 * checks username length is more than fixed width of it's <div>
	 */
	private checkUsernameOverflow(){
		//TODO: check in chat room header too or restrict username length
		if(this.textElement && this.textElement.current && this.textElement.current.scrollWidth > this.textElement.current.clientWidth){
			this.setState({
				usernameOverflow: true
			});
		}
	}

	/**
	 * Sets state when user selects a room
	 * @param roomId 
	 * @param roomName 
	 */
	private selectRoom(roomId:number, roomName:string): void {
		this.setState({
			selectedRoom: roomId
		});
		this.props.selectedRoom(roomId, roomName);
	}
	
}