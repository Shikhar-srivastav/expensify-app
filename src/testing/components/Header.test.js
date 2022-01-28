import React from 'react';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('Render header for the app', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
});

test('Call start logout on button click', () => {
    const logoutSpy = jest.fn();
    const wrapper = shallow(<Header startLogout={logoutSpy} />);
    wrapper.find('button').simulate('click');
    expect(logoutSpy).toHaveBeenCalled();
});