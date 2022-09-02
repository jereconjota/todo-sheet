import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    
    //listado global de tareas
    const [tasks, setTasks] = useState([]);
    const ee = 'this prop is an easter egg, good day!';
    
    //GOOGLE SHEET
    const [tasksFromSheet, setTasksFromSheet] = useState([]);
    const [tasksSheet, setTasksSheet] = useState([]);

    // fetch('/api/get-sheet-content')
    // .then((response) => response.json())
    // .then((data) => {
    //     console.log(data)
    //     data.map((item) => {
    //         setTasks([...tasks, item]);
    //     })
    // });


    //crud
    const createTask = (title, description, status) => {
        setTasks([...tasks, {title, description, status, id: uuid()}]);
    }
    const updateTask = (id, title, description, status) => {
        setTasks([...tasks.map(task => task.id === id ? {...task, title, description, status} : task)]);    
    }
    const deleteTask = (id) => setTasks([...tasks.filter((task) => task.id !== id)]);


    //crud sheet
    const createTaskSheets = (id, created_at, title, description, status) => {
        setTasksFromSheet([...tasksFromSheet, { id, created_at, title, description, status }]);
    }
    const allTasksSheets = (tasks) => {
        setTasksSheet(tasks);
    }
    return (
        <TaskContext.Provider value={{ tasks, ee, createTask, updateTask, deleteTask, tasksFromSheet, createTaskSheets, tasksSheet, allTasksSheets}}>
            {children}
        </TaskContext.Provider> 
    );
}

export const useTasks = () => useContext(TaskContext);