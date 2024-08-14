import { createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../FireBase/firebaseConfig";

const initialStateUser = {
    isLogin: false,
    user: {}
}


//reducers

const userSlice = createSlice({
    name: 'user',
    initialState: initialStateUser,
    reducers: {
        setUser: (state, action) => {
            state.isLogin = true;
            state.user = { ...action.payload };
        },
        clearUser: (state) => {
            state.isLogin = false;
            state.user = {};
        },

    }
})

//actions
const { setUser, clearUser } = userSlice.actions;

export const loginWithGoogle = () => async (dispatch) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
        const token = result.user.getIdToken(true);
        dispatch(setUser(result.user));
        localStorage.setItem('token', JSON.stringify(token));
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("Error firebase: ", errorCode, errorMessage, email, credential);
    });
};

export const checkAuthState = () => (dispatch) => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            const token = user.getIdToken(true);
            dispatch(setUser(user));
            localStorage.setItem('token', JSON.stringify(token));
        } else {
            dispatch(clearUser());
            localStorage.removeItem('token');
        }
    });
};
export const logout = () => (dispatch) => {
    auth.signOut().then(() => {
        dispatch(clearUser());
        localStorage.removeItem('token');
    }).catch((error) => {
        console.error('Error logging out', error);
    });
};


export { clearUser, setUser };

export const sliceUserReducer = userSlice.reducer;

