import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import VendorCard from '../components/VendorCard';
import MenuList from '../components/MenuList';
import { Loading, ErrorMessage } from '../components/Status';
import { useVendors } from '../hooks/useVendors';
import { useLocalStorage } from '../hooks/useLocalStorage';

function HomePage() {
  const { vendors, loading, error, reload } = useVendors();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('cat') || 'All';


  const [sortOrder, setSortOrder] = useLocalStorage('campuseats-sort-order', 'default');

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;
  if (!vendors || vendors.length === 0) return <p>No vendors available.</p>;

  const primaryVendor = vendors[0];

  const categories = [
    'All',
    ...new Set(primaryVendor.menu.map((item) => item.category)),
  ];


  const filteredMenu =
    selectedCategory === 'All'
      ? primaryVendor.menu
      : primaryVendor.menu.filter((item) => item.category === selectedCategory);


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
      <section className="section-vendor">
        <h2>Today's vendors</h2>
        <div className="grid">
          {vendors.map((v) => (
            <VendorCard
              key={v.id}
              vendor={v}
              isSelected={v.id === primaryVendor.id}
              onSelect={(id) => navigate(`/vendor/${id}`)}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="menu-header">
          <h2>Menu: {primaryVendor.name}</h2>

          {/* Dropdown Sorting */}
          <div className="sort-container">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              className="sort-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
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

export default HomePage;