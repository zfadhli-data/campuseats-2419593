import React from 'react';

function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <p style={{ margin: 0 }}>
                © {year} CampusEats - BICS 3301 IIUM
            </p>
        </footer>
    );
}

export default Footer;