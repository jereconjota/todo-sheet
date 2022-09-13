// import { google } from 'googleapis';
import { getSheetContent } from '../api/sheetContent';
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useTasks } from "../../context/TaskContext"
import { useEffect } from 'react'
import NProgress from "nprogress";

export default function Post({ tasks }) {
    const router = useRouter();
    const { setTasksSheets, deleteTaskSheet } = useTasks();

    useEffect(() => {
        if (tasks.length > 0) {
            setTasksSheets(tasks);
        }
    }, [setTasksSheets ,tasks]);

    useEffect(() => {
        const handleRouteChange = (url) => {
            console.log(url);
            NProgress.start();
        };

        router.events.on("routeChangeStart", handleRouteChange);

        router.events.on("routeChangeComplete", () => NProgress.done());

        router.events.on("routeChangeError", () => NProgress.done());

        return () => {
            router.events.off("routeChangeStart", handleRouteChange);
        };
    }, [router.events]);

    const deleteTask = (index, id) => {
        const options = {
            method: 'DELETE',
        }
        fetch(`/api/sheet/delete-sheet-row/${index}`, options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                deleteTaskSheet(id);
                router.reload();
            });
    }

    return (
        <Layout path={'/sheet'}>
            <div className="flex justify-center items-center">
                {tasks.length === 0 ? (<h1>No tasks yet</h1>) : (
                    <div className="w-7/12">
                        {tasks.map((task, i) => (
                            <div className="bg-violet-500 cursor-pointer px-20 py-5 m-2 flex justify-start items-center rounded-lg"
                                key={i}
                                onClick={() => router.push(`/sheet/edit/${task.id}`)}>
                                <span className="text-5xl mr-5">{i + 1}</span>
                                <div className="w-full">
                                    <div className="flex justify-between">
                                        <h1 className="font-bold">{task.title}</h1>
                                        <p>{task.status}</p>
                                        <button className="text-white bg-rose-600 hover:bg-rose-500 px-3 py-1 inline-flex items-center rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteTask(i, task.id);
                                            }}>
                                            delete
                                        </button>
                                    </div>
                                    <p className="text-gray-300">{task.description}</p>
                                    <span className="text-gray-400">{task.id}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {tasks.length === 5 ?? console.log(ee)}
            </div>
        </Layout>
    )
}


export async function getServerSideProps({ query }) {
    const rows = await getSheetContent();
    return {
        props: {
            tasks: rows.slice(1, rows.length), // remove sheet header
        }
    }
}
// export async function getStaticProps(context) {
//     const rows = await getSheetContent();
//     return {
//         props: {
//             tasks: rows.slice(1, rows.length), // remove sheet header
//         },
//         revalidate: 1, // In seconds
//     };
// }
