import React from 'react';

export function Loading() {
    return <p className="muted" role="status">Loading menus...</p>;
}

export function ErrorMessage({ message, onRetry }) {
    return (
        <div className="card error" role="alert">
            <p style={{ margin: 0 }}>Could not load menus: {message}</p>
            {onRetry && (
                <button
                    className="btn"
                    onClick={onRetry}
                    style={{ width: 'auto', marginTop: '0.5rem' }}
                >
                    Try again
                </button>
            )}
        </div>
    );
}