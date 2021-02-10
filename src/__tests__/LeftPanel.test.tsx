import LeftPanel from '../components/LeftPanel';
import React from 'react';
import { mount } from 'enzyme';

const wrapper = mount(
	<LeftPanel
		username={'John'}
		rooms={[{name: "Beckham Room", id: 0}, {name: "Ronaldo Room", id: 1}]}
		selectedRoom={()=>{}}
		logOut={()=>{}}
	/>
);


describe('Chat Room Tests', () => {
	it('Test componentDidMount', ()=>{
		expect(wrapper.instance().componentDidMount).toBeDefined();
		const spy = jest.spyOn(LeftPanel.prototype, 'componentDidMount');
		LeftPanel.prototype.componentDidMount();
		expect(spy).toHaveBeenCalledTimes(1);
		spy.mockReset();
		spy.mockRestore();
	});

	it('Test componentWillUnmount', ()=>{
		expect(wrapper.instance().componentWillUnmount).toBeDefined();
		const spy = jest.spyOn(LeftPanel.prototype, 'componentWillUnmount');
		LeftPanel.prototype.componentWillUnmount();
		expect(spy).toHaveBeenCalledTimes(1);
		spy.mockReset();
		spy.mockRestore();
	});

	it('Test render', ()=>{
		expect(wrapper.instance().render).toBeDefined();
	});

	test('Left Panel component renders username', () => {
		const usernameDiv = wrapper.find('#username');
		expect(usernameDiv.text()).toBe('John');
	});

	test('Left Panel component renders rooms', () => {
		const Room1Div = wrapper.find('#roomName_0');
		expect(Room1Div.text()).toBe('Beckham Room');

		const Room2Div = wrapper.find('#roomName_1');
		expect(Room2Div.text()).toBe('Ronaldo Room');
	});

	test('Left Panel component renders log out link', () => {	
		const LogOutButton = wrapper.find('.ant-btn-link');
		const linkText = LogOutButton.text();
		expect(linkText.includes('Log out')).toBe(true);
	});


	// test('Room name class changes when room name is clicked', () => {
	// 	  const p = wrapper.find('#roomName_0');
	// 	  p.simulate('click');
	// 	  expect(p.props().className).toBe('LeftPanel_roomName__djd_1 LeftPanel_selectedRoomName__2Oqi-');
	// });

});
