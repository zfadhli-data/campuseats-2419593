import React from 'react';

function MenuItemCard({ item, onAdd, isFavourite, onToggleFav }) {
  return (
    <div className="card menu-item-card">
      {/* Butang Toggle Favourite */}
      <button
        type="button"
        className="fav-btn"
        onClick={() => onToggleFav && onToggleFav(item.id)}
        aria-label="Toggle favourite"
      >
        {isFavourite ? '❤️' : '🤍'}
      </button>

      <div className="card-content">
        {/* Gambar atau Thumb Huruf */}
        {item.image ? (
          <img src={item.image} alt={item.name} className="photo" />
        ) : (
          <div className="thumb">{item.name.charAt(0)}</div>
        )}

        {item.category && <span className="category-tag">{item.category}</span>}
        <h4 className="item-title">{item.name}</h4>
        <p className="item-description">{item.description}</p>
        <p className="item-price">RM {item.price.toFixed(2)}</p>
      </div>

      <button
        type="button"
        className="btn"
        disabled={!item.available}
        onClick={() => onAdd(item)}
      >
        {item.available ? 'Add to cart' : 'Sold out'}
      </button>
    </div>
  );
}

export default MenuItemCard;