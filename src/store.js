import { createStore, combineReducers, compose } from 'redux';
import firebase, { functions } from 'firebase';
import 'firebase/firestore';
import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import {reduxFirestore, firestoreReducer} from 'redux-firestore';

import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig ={
    apiKey: "AIzaSyAxCQB20odJDRH1k_4rnwgTKIVbNKB2aus",
    authDomain: "reactclientpanel-b4075.firebaseapp.com",
    databaseURL: "https://reactclientpanel-b4075.firebaseio.com",
    projectId: "reactclientpanel-b4075",
    storageBucket: "reactclientpanel-b4075.appspot.com",
    messagingSenderId: "891888591484",
    appId: "1:891888591484:web:7ff31e57e34aa87a6b1ff9"
};

//react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true 
};

//Init firebase instance
firebase.initializeApp(firebaseConfig);


//init firestore
const firestore = firebase.firestore();



const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase,rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer,
    settings: settingsReducer
});



if(localStorage.getItem('settings')==null){
    const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration:false
    }
    localStorage.setItem('settings',JSON.stringify(defaultSettings))

}



//initial state
const initialState={
    settings: JSON.parse(localStorage.getItem('settings'))
};

//create store

const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;


