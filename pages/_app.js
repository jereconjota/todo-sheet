import '../styles/globals.css'
import { TaskProvider } from '../context/TaskContext';

function MyApp({ Component, pageProps }) {
    return (
        <TaskProvider>
            <Component {...pageProps} />
        </TaskProvider>
    )
}

export default MyApp
