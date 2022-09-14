import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";


////////////////////////////////////////////////////////////////////////////////////////////////
//////////// Firebase config ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, onChildAdded, onChildChanged, query, orderByChild, set, push, remove, update } from 'firebase/database';
const firebaseConfig = {
  apiKey: "AIzaSyCmx_R50VCavyWiPu3g4mlQvwsmKpEcr6A",
  authDomain: "todo-fee66.firebaseapp.com",
  projectId: "todo-fee66",
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
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////'



const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const ee = 'this prop is an easter egg, good day!';

    //GLOBAL TASKS STATE
    const [tasks, setTasks] = useState([]);
    //////////////////////////  CRUD WITHOUT PERSISTENSE  ////////////////////////////
    const createTask = (title, description, status) => {
        setTasks([...tasks, { title, description, status, id: uuid() }]);
    }
    const updateTask = (id, title, description, status) => {
        setTasks([...tasks.map(task => task.id === id ? { ...task, title, description, status } : task)]);
    }
    const deleteTask = (id) => setTasks([...tasks.filter((task) => task.id !== id)]);


    
    //GOOGLE SHEET STATE
    const [tasksSheet, setTasksSheet] = useState([]);
    //////////////////////////  GOOGLE SHEET CRUD  ////////////////////////////
    const setTasksSheets = (tasks) => {
        setTasksSheet(tasks);
    }
    const deleteTaskSheet = (id) => setTasksSheet([...tasksSheet.filter((task) => task.id !== id)]);



    //FIREBASE STATE
    const [tasksFirebase, setTasksFirebase] = useState([]);
    //////////////////////////  FIREBASE CRUD  ////////////////////////////
    const getTasksFirebase = async () => {
        onValue(queryTasks, (snapshot) => {
            const data = snapshot.val();
            console.log('onValue', data);
            //objets to array with key
            const tasks = [];
            for (let key in data) {
                tasks.push({ ...data[key], id: key });
            }
            setTasksFirebase(tasks);
        });
    }
    const createTaskFirebase = (title, description, status) => {
        const newTask = { title, description, status, timestamp: Date.now() };
        const newTaskKey = push(refTasks).key;
        set(ref(db, `tasks/${newTaskKey}`), newTask);
        // push(queryTasks, newTask);

        setTasksFirebase([...tasksFirebase, newTask]);
    }
    const updateTaskFirebase = (id, title, description, status) => {
        //update task in firebase
        const task = tasksFirebase.find(task => task.id === id);
        delete task.id;
        update(ref(db, `tasks/${id}`), { ...task, title, description, status });

        setTasksFirebase([...tasksFirebase.map(task => task.id === id ? { ...task, title, description, status } : task)]);
    }
    const deleteTaskFirebase = (id) => {
        remove(ref(db, `tasks/${id}`));
        setTasksFirebase([...tasksFirebase.filter((task) => task.id !== id)])
    };




    return (
        <TaskContext.Provider value={{
            ee,
            tasks, createTask, updateTask, deleteTask,
            tasksSheet, setTasksSheets, deleteTaskSheet,
            tasksFirebase, updateTaskFirebase, createTaskFirebase, deleteTaskFirebase, getTasksFirebase
        }}>
            {children}
        </TaskContext.Provider>
    );
}

export const useTasks = () => useContext(TaskContext);