function VendorCard({ vendor, isSelected, onSelect }) {
    return (
        <button
            type="button"
            className={`card vendor-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(vendor.id)}
        >
            <div className="thumb" aria-hidden="true">{vendor.name.charAt(0)}</div>
            <div>
                <h2>{vendor.name}</h2>
                <p className="muted">{vendor.location}</p>
                <p className="muted">Open: {vendor.openHours}</p>
                <span className={vendor.isOpen ? 'status open' : 'status closed'}>
                    {vendor.isOpen ? 'Open now' : 'Closed'}
                </span>
            </div>
        </button>
    );
}
export default VendorCard;
