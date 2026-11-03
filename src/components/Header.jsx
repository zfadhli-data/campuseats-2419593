import React from 'react';
import { NavLink, Link } from 'react-router';
import { useCart } from '../hooks/useCart';

function Header() {
    const { count } = useCart();

    return (
        <header className="header">
            {/* Brand / Logo Section */}
            <Link to="/" className="brand-logo">
                <span className="logo-icon">🍽</span>
                <h1 className="logo">CampusEats</h1>
            </Link>

            {/* Navigation Links */}
            <nav className="nav">
                <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                    Vendors
                </NavLink>
                <NavLink to="/orders" className={({ isActive }) => (isActive ? 'active' : '')}>
                    My Orders
                </NavLink>
                <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Cart {count > 0 && <span className="badge">{count}</span>}
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;