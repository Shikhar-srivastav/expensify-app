import authReducer from '../../reducers/auth';

test('Manipulate state according to login action', () => {
    const action = {
        type: 'LOGIN',
        uid: 'shikhar'    
    };
    const state = authReducer({}, action);
    expect(state).toEqual({ uid: 'shikhar' });
});

test('Manipulate state according to logout action', () => {
    const action = {
        type: 'LOGOUT',
    };
    const state = authReducer({ uid: 's' }, action);
    expect(state).toEqual({});
});