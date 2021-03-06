import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header>
        <div className='container'>
            <div className='header__container'>
                <Link to="/dashboard" className='header__title'>
                    <h1>Expensify</h1>
                </Link>
                <button className='header__button' onClick={startLogout}>Logout</button>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);