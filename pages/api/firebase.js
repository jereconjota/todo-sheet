// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, onChildAdded, onChildChanged, query, orderByChild, set, push, remove, update } from 'firebase/database';

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };
const firebaseConfig = {
    apiKey: "AIzaSyCmx_R50VCavyWiPu3g4mlQvwsmKpEcr6A",
    authDomain: "todo-fee66.firebaseapp.com",
    projectId: "todo-fee66",
    databaseURL: "https://todo-fee66-default-rtdb.firebaseio.com",
    storageBucket: "todo-fee66.appspot.com",
    messagingSenderId: "528682745584",
    appId: "1:528682745584:web:6f01b4cfa3077299c54c35",
    measurementId: "G-F15H972X5W"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const refTasks = ref(db, 'tasks');
const queryTasks = query(refTasks, orderByChild('timestamp'));


export { db, refTasks, queryTasks, onValue, onChildAdded, onChildChanged, set, push, remove, update, ref };