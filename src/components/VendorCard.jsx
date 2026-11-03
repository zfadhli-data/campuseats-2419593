import React from 'react';

function VendorCard({ vendor, isSelected, onSelect }) {
    const firstLetter = vendor.name.charAt(0);

    return (
        <button
            type="button"
            className={`card vendor-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect && onSelect(vendor.id)}
        >
            <div className="thumb">{firstLetter}</div>
            <div className="vendor-info">
                <h3>{vendor.name}</h3>
                <p className="muted">{vendor.location}</p>
                <p className="muted">Open: {vendor.openHours}</p>
                <span className={`status ${vendor.isOpen ? 'open' : 'closed'}`}>
                    {vendor.isOpen ? 'Open now' : 'Closed'}
                </span>
            </div>
        </button>
    );
}

export default VendorCard;