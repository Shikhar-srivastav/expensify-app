import React from 'react'; 
import { connect } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import Header from '../components/Header';

const PrivateRoute = ({ isAuthenticated, component: Component }) => (
    <div>
        {isAuthenticated ? (
            <div>
                <Header />
                <Component />
            </div>
        ) : (
            <Navigate to='/' />
        )}
    </div>
); 

const mapStatetoProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStatetoProps)(PrivateRoute);