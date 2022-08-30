import Link from 'next/link'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {

    const router = useRouter();
    // const { tasks } = useTasks();

    return (
        <div className="bg-violet-300 h-screen text-stone-900">
            <header className="flex items-center bg-violet-500 text-stone-900 px-28 py-5 font-bold">
                <Link href="/">
                    <a>
                        <h1 className="fon t-black text-lg">Task App</h1>
                    </a>
                </Link>
                {/* <span className='ml-2 text-gray-400'>{tasks.length} Tasks</span> */}
                <div className="flex-grow text-right">
                    <button className="bg-violet-300 hover:bg-violet-400 px-5 py-2 text-stone-900 rounded-full
                    font-bold rounded-sm inline-flex items-center" onClick={() => router.push('/new')}> Add Task</button>
                </div>
            </header>
            <main className="px-28 py-10">
                {children}

            </main>
        </div>

    )
}

export default Layout