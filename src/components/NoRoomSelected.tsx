/**
 * Shows a text when no rooms are selected yet
 * @module: NoRoomSelected
 * @author: Sadhana Rajan
 */

import React, { Component, Fragment } from 'react';
import styles from "../styles/NoRoomSelected.module.css";

interface Props {
	rooms: any[]
}

interface State {
}

export default class NoRoomSelected extends Component<Props,State> {
	constructor(props: Props) {
		super(props);
	}

	/**
	 * Renders an empty page with instructions for user to choose any room from given list
	 */
	public render(){
		return (
			<div className={styles.centerMessage}>
				{this.props.rooms.length > 0 ? (
					<div><b>&#x27F5;&nbsp;&nbsp;</b>Please select a room from the list</div>
				):(
					<div>Looks like no chat rooms are created yet...<br/>Please meet up in person ;)</div>
				)}
			</div>
		);
	}
}