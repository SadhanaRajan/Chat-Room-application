/**
 * APIs for Chat Room application
 * @module: RoomsAPI
 * @author: Sadhana Rajan
 */
 
const RoomsAPI = {

	/**
	 * Converts API response to JSON format
	 * @param response any API response
	 */
	async convertToJson(response: any) {
		const data = await response.json();
		return data;
	},

	/**
	 * API to get messages in given room
	 * @param roomId number - ID of the chat room
	 */
	async getMessagesAPI(roomId: number) {
		const response = await fetch('http://localhost:8080/api/rooms/' + roomId + '/messages');
		return this.convertToJson(response);
	},

	/**
	 * API to post a message to the given room
	 * @param roomId number - ID of the chat room
	 * @param payload name of current user and message sent to the chat room
	 */
	async postMessagesAPI(roomId: number, payload:{ name: string, message: string}) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		};
		const response = await fetch('http://localhost:8080/api/rooms/' + roomId + '/messages', requestOptions);
		return this.convertToJson(response);
	},

	/**
	 * API to get all available chat rooms
	 */
	async getRoomListAPI() {
		const response = await fetch('http://localhost:8080/api/rooms');
		return this.convertToJson(response);
	},

	/**
	 * API to get room name, ID and list of users
	 * @param roomId number - ID of the chat room
	 */
	async getRoomsDetailsAPI(roomId: number) {
		const response = await fetch('http://localhost:8080/api/rooms/' + roomId);
		return this.convertToJson(response);
	}

}

export default RoomsAPI;