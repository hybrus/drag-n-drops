
import { LayoutsProvider, ModalsProvider } from '../context';
import { Navbar } from './Navbar'

export const Layout = ({ children }) => {
    return (
        <LayoutsProvider>
            <ModalsProvider>
                <Navbar />
                <main>{children}</main>
            </ModalsProvider>
        </LayoutsProvider>
    )
}