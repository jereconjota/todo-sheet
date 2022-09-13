import Layout from "../../components/Layout";
import { useTasks } from "../../context/TaskContext"
import { useRouter } from "next/router";

export default function Home() {
    const { tasksFirebase, deleteTaskFirebase, ee } = useTasks();
    const { push } = useRouter();
    
    return (<Layout path={'/firebase'}>
        <div className="flex justify-center items-center">
            {tasksFirebase.length === 0 ? (<h1>No tasks yet</h1>) : (
                <div className="w-7/12">
                    {tasksFirebase.map((task, i) => (
                        <div className="bg-violet-500 cursor-pointer px-20 py-5 m-2 flex justify-start items-center rounded-lg"
                            key={i}
                            onClick={() => push(`/use-context/edit/${task.id}`)}>
                            <span className="text-5xl mr-5">{i + 1}</span>
                            <div className="w-full">
                                <div className="flex justify-between">
                                    <h1 className="font-bold">{task.title}</h1>
                                    <p>{task.status}</p>
                                    <button className="text-white bg-rose-600 hover:bg-rose-500 px-3 py-1 inline-flex items-center rounded-md"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteTaskFirebase(task.id);
                                        }}
                                        id="deleteTask">Delete
                                    </button>
                                </div>
                                <p className="text-gray-300">{task.description}</p>
                                <span className="text-gray-400">{task.id}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {tasksFirebase.length === 5 ?? console.log(ee)}
        </div>
    </Layout >
    )
}
