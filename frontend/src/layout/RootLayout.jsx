import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import './RootLayout.css'
import { Avatar } from '../components/Avatar';
import Navbar from './Navbar/Navbar.jsx';

export default function RootLayout() {
    return (
        <>
            <Header>
                <Navbar />
                <h2>Meu App</h2>
                <Avatar src="https://i.pravatar.cc/40" alt="Perfil" />
            </Header>
            <Outlet />
            <Footer />
        </>

    )
}