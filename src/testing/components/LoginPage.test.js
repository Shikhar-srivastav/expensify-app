import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('Render login page on the screen', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
});

test('Call start login on button click', () => {
    const loginSpy = jest.fn();
    const wrapper = shallow(<LoginPage startLogin={loginSpy} />);
    wrapper.find('button').simulate('click');
    expect(loginSpy).toHaveBeenCalled();
});