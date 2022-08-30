import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

    //listado global de tareas
    const [tasks, setTasks] = useState([]);
    const ee = 'this prop is an easter egg, good day!';

    //crud
    const createTask = (title, description, status) => {
        setTasks([...tasks, {title, description, status, id: uuid()}]);
    }
    const updateTask = (id, title, description, status) => {
        setTasks([...tasks.map(task => task.id === id ? {...task, title, description, status} : task)]);    
    }
    const deleteTask = (id) => setTasks([...tasks.filter((task) => task.id !== id)]);

    
    return (
        <TaskContext.Provider value={{ tasks, ee, createTask, updateTask, deleteTask}}>
            {children}
        </TaskContext.Provider> 
    );
}

export const useTasks = () => useContext(TaskContext);