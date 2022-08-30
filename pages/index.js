import Layout from "../components/Layout";
// import { useTasks } from "../context/TaskContext"
import { useRouter } from "next/router";

export default function Home() {
    // const { tasks, deleteTask } = useTasks();
    const { push } = useRouter();
    
    return (<Layout>
        <div className="flex justify-center items-center">
            {/* {tasks.length === 0 ? (<h1>No tasks yet</h1>) : (
                <div className="w-7/12">
                    {tasks.map((task, i) => (
                        <div className="bg-gray-700 hover:bg-gray-600 cursor-pointer px-20 py-5 m-2 flex justify-start items-center rounded-lg"
                            key={i}
                            onClick={() => push(`/edit/${task.id}`)}>
                            <span className="text-5xl mr-5">{i + 1}</span>
                            <div className="w-full">
                                <div className="flex justify-between">
                                    <h1 className="font-bold">{task.title}</h1>
                                    <button className="bg-red-700 hover:bg-red-600 px-3 py-1 inline-flex items-center"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteTask(task.id);
                                        }}>
                                        delete
                                    </button>
                                </div>
                                <p className="text-gray-300">{task.description}</p>
                                <span className="text-gray-400">{task.is}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )} */}
        </div>
    </Layout >
    )
}
