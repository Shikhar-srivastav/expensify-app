import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { googleProvider } from '../firebase/firebase';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogin = () => {
    return () => {
        const auth = getAuth();
        signInWithPopup(auth, googleProvider);
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        const auth = getAuth();
        signOut(auth);
    };
};