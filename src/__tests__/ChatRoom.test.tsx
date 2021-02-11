import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatRoom from '../components/ChatRoom';
import { mount, shallow } from 'enzyme';

const wrapper = shallow(
	<ChatRoom
		username={'John'}
		selectedRoom={{
			name: "Beckham Room",
			id: 0,
			users: ['John'],
			messages: [{
				message: "Hello, I am John",
				name: "John"
			}]
		}}
	/>);

describe('Chat Room Tests', () => {
	test('ChatRoom component renders', () => {
	});

	it('Test componentDidMount', ()=>{
		expect(wrapper.instance().componentDidMount).toBeDefined();
		// const handler = wrapper.instance().componentDidMount;
		// if(handler){
		// 	handler();
		// }
	});

	it('Test componentDidUpdate', ()=>{
		expect(wrapper.instance().componentDidUpdate).toBeDefined();
	});

	it('Test render', ()=>{
		expect(wrapper.instance().render).toBeDefined();
	});

	test('Test renders Chat room name', () => {
		const chatRoomNameDiv = wrapper.find('#chatRoomName');
		expect(chatRoomNameDiv.text()).toBe('Beckham Room');
	});

	test('Test renders Chat room users', () => {
		const chatRoomUsersDiv = wrapper.find('#chatRoomUsers');
		expect(chatRoomUsersDiv.text()).toBe("John");
	});
});
