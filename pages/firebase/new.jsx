import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useTasks } from '../../context/TaskContext'

const inititalState = {
    title: "",
    status: "pending",
    description: "",
};

const TaskFormPage = () => {
    const [task, setTask] = useState(inititalState);
    const { tasksFirebase, updateTaskFirebase, createTaskFirebase } = useTasks();
    const { push, query } = useRouter();

    const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!query.id) {
            createTaskFirebase(task.title, task.description, task.status);
        } else {
            updateTaskFirebase(query.id, task.title, task.description, task.status);
        }
        push('/firebase/');
    }

    useEffect(() => {
        if (query.id) {
            const taskFound = tasksFirebase.find((task) => task.id == query.id);
            if (taskFound) {
                setTask({ title: taskFound.title, description: taskFound.description, status: taskFound.status });
            }
        }
    }, [query.id]);

    return (
        <Layout path={'/firebase'}>
            <div className="flex justify-center items-center h-full">
                <form id='taskform' onSubmit={handleSubmit} className="bg-violet-500 p-10 h-2/4 rounded-lg taskform">
                    <h1 className='text-3xl mb-7'>{query.id ? 'Update a task' : 'Task a Form'}</h1>
                    <input type="text" placeholder='write a title' name='title'
                        className='title bg-violet-400 focus:outline-none w-full py-3 px-4 mb-5 rounded-lg placeholder-stone-600' onChange={handleChange}
                        value={task.title} />
                    <input type="text" name='status'
                        className='bg-violet-400 focus:outline-none w-full py-3 px-4 mb-5 rounded-lg placeholder-stone-600' onChange={handleChange}
                        value='pending' disabled/>
                    <textarea name="description" id="" cols="30" rows="2" placeholder='write a description'
                        className='bg-violet-400 focus:outline-none w-full py-3 px-4 mb-5 rounded-lg  placeholder-stone-600' onChange={handleChange}
                        value={task.description} />
                    <button type='submit' className='bg-cyan-500 hover:bg-cyan-400 px-4 py-2 disabled:opacity-30 rounded-md' name='taskFormSubmit' 
                        disabled={!task.title || !task.description}>
                        Save</button>
                </form>
            </div>
        </Layout>
    )
}

export default TaskFormPage;