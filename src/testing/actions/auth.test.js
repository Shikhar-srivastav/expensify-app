import { login, logout } from '../../actions/auth';

test('Return login action object', () => {
    const action = login('shikhar');
    expect(action).toEqual({
        type: 'LOGIN',
        uid: 'shikhar'
    });
});

test('Return logout action object', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});