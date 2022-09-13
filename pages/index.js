
import Link from 'next/link'

export default function Home() {

    return (
        <div className='h-screen flex justify-center items-center flex-col'>
            <Link href="/use-context/">
                <a className='text-stone-800 mb-7 border-2 p-3 option'>
                    <h1 className="text-lg">ToDo whitout persistence ❗️</h1>
                </a>
            </Link>
            <Link href="/sheet/">
                <a className='text-stone-800 mb-7 border-2 p-3 option'>
                    <h1 className="text-lg">ToDo with google sheet 📊</h1>
                </a>
            </Link>
            <Link href="/firebase/">
                <a className='text-stone-800 mb-7 border-2 p-3 option'>
                    <h1 className="text-lg">ToDo with firebase 🔥</h1>
                </a>
            </Link>
        </div>
    )
}

