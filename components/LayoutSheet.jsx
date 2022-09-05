import Link from 'next/link'
import { useTasks } from '../context/TaskContext'
import { useRouter } from 'next/router'
import NProgress from "nprogress";
import { useEffect } from 'react';

const Layout = ({ children }) => {

    const router = useRouter();
    const { tasksSheet } = useTasks();
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
    }, []);
    return (
        <div>
            <header className="flex items-center bg-violet-500 text-stone-800 px-28 py-5 font-bold">
                <Link href="/sheet/">
                    <a className='text-stone-800'>
                        <h1 className="font-black text-lg">Task App</h1>
                        <span>{tasksSheet.length} Tasks</span>
                    </a>
                </Link>
                <div className="flex-grow text-right">
                    <button className="bg-cyan-500 hover:bg-cyan-400 px-5 py-2 text-stone-800 rounded-md
                    font-bold inline-flex items-center" onClick={() => router.push('/sheet/new')}> Add Task</button>
                </div>
            </header>
            <main className="px-28 py-10">
                {children}

            </main>
        </div>

    )
}

export default Layout