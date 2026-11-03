import React from 'react';
import { Link } from 'react-router';

function NotFoundPage() {
    return (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <h2>404 - Page Not Found</h2>
            <p className="muted">The page you are looking for does not exist.</p>
            <Link to="/" className="btn" style={{ display: 'inline-block', width: 'auto', marginTop: '1rem' }}>
                Back to Home
            </Link>
        </div>
    );
}

export default NotFoundPage;