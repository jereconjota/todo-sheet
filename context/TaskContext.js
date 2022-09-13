import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const ee = 'this prop is an easter egg, good day!';
    
    //listado global de tareas
    const [tasks, setTasks] = useState([]);
    
    //google sheet
    const [tasksSheet, setTasksSheet] = useState([]);

    //firebase
    const [tasksFirebase, setTasksFirebase] = useState([]);

    //crud without persistence
    const createTask = (title, description, status) => {
        setTasks([...tasks, {title, description, status, id: uuid()}]);
    }
    const updateTask = (id, title, description, status) => {
        setTasks([...tasks.map(task => task.id === id ? {...task, title, description, status} : task)]);    
    }
    const deleteTask = (id) => setTasks([...tasks.filter((task) => task.id !== id)]);


    //crud google sheet
    const setTasksSheets = (tasks) => {
        setTasksSheet(tasks);
    }
    const deleteTaskSheet = (id) => setTasksSheet([...tasksSheet.filter((task) => task.id !== id)]);


    //crud firebase
    const createTaskFirebase = (title, description, status) => {
        setTasksFirebase([...tasksFirebase, {title, description, status, id: uuid()}]);
    }
    const updateTaskFirebase = (id, title, description, status) => {
        setTasksFirebase([...tasksFirebase.map(task => task.id === id ? {...task, title, description, status} : task)]);    
    }
    const deleteTaskFirebase = (id) => setTasksFirebase([...tasksFirebase.filter((task) => task.id !== id)]);

    return (
        <TaskContext.Provider value={{  ee, 
                                        tasks, createTask, updateTask, deleteTask, 
                                        tasksSheet, setTasksSheets, deleteTaskSheet,
                                        tasksFirebase, updateTaskFirebase,createTaskFirebase, deleteTaskFirebase
                                        }}>
            {children}
        </TaskContext.Provider> 
    );
}

export const useTasks = () => useContext(TaskContext);