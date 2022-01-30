import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => {
    return (
        <div className='box-layout'>
            <div className='box-layout__modal'>
                <h1>Expensify App</h1>
                <p>It's time to get your expenses under control</p>
                <button
                    onClick={startLogin}
                    className='button'
                >Login with Google</button>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);