import React, { useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router';
import VendorCard from '../components/VendorCard';
import MenuList from '../components/MenuList';
import { Loading, ErrorMessage } from '../components/Status';
import { useVendors } from '../hooks/useVendors';
import { useLocalStorage } from '../hooks/useLocalStorage';

function VendorPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { vendors, loading, error, reload } = useVendors();

    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCategory = searchParams.get('cat') || 'All';

    // State untuk Sorting (Disimpan dalam LocalStorage)
    const [sortOrder, setSortOrder] = useLocalStorage('campuseats-sort-order', 'default');
    const [recentlyViewed, setRecentlyViewed] = useLocalStorage('campuseats-recent', []);

    const vendor = vendors.find((v) => v.id === id);

    useEffect(() => {
        if (vendor) {
            setRecentlyViewed((prev) => {
                const filtered = prev.filter((item) => item.id !== vendor.id);
                return [{ id: vendor.id, name: vendor.name }, ...filtered].slice(0, 5);
            });
        }
    }, [vendor, setRecentlyViewed]);

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} onRetry={reload} />;

    if (!vendor) {
        return (
            <div className="card error">
                <h2>Vendor Not Found</h2>
                <p>There is no vendor registered under ID "{id}".</p>
                <button
                    className="btn"
                    style={{ width: 'auto', marginTop: '1rem' }}
                    onClick={() => navigate('/')}
                >
                    Back to Vendors
                </button>
            </div>
        );
    }

    const categories = [
        'All',
        ...new Set(vendor.menu.map((item) => item.category)),
    ];

    // 1. Tapis mengikut Kategori
    const filteredMenu =
        selectedCategory === 'All'
            ? vendor.menu
            : vendor.menu.filter((item) => item.category === selectedCategory);

    // 2. Susun mengikut Sorting Order
    const sortedMenu = [...filteredMenu].sort((a, b) => {
        if (sortOrder === 'price-low') return a.price - b.price;
        if (sortOrder === 'price-high') return b.price - a.price;
        if (sortOrder === 'popularity') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
        return 0;
    });

    const handleCategorySelect = (category) => {
        if (category === 'All') {
            searchParams.delete('cat');
            setSearchParams(searchParams);
        } else {
            setSearchParams({ cat: category });
        }
    };

    return (
        <div>
            <section style={{ marginBottom: '2rem' }}>
                <h2>Today's vendors</h2>
                <div className="grid">
                    {vendors.map((v) => (
                        <VendorCard
                            key={v.id}
                            vendor={v}
                            isSelected={v.id === vendor.id}
                            onSelect={(vendorId) => navigate(`/vendor/${vendorId}`)}
                        />
                    ))}
                </div>
            </section>

            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <h2 style={{ margin: 0 }}>Menu: {vendor.name}</h2>

                    {/* Dropdown Sorting */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <label htmlFor="sort" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Sort by:</label>
                        <select
                            id="sort"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            style={{
                                padding: '0.4rem 0.8rem',
                                borderRadius: '8px',
                                border: '1px solid #c5cbd3',
                                font: 'inherit',
                                fontSize: '0.88rem',
                                background: '#fff',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="default">Default</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="popularity">Popularity</option>
                        </select>
                    </div>
                </div>

                <div className="category-bar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => handleCategorySelect(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <MenuList items={sortedMenu} />
            </section>
        </div>
    );
}

export default VendorPage;