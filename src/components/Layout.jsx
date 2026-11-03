import React from 'react';
import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

function Layout() {
    return (
        <div className="layout">
            <Header />
            <main className="container">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;