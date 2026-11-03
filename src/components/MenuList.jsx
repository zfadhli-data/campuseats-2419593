import React from 'react';
import MenuItemCard from './MenuItemCard';
import { useCart } from '../hooks/useCart';

function MenuList({ items }) {
    const { addToCart, favourites, toggleFavourite } = useCart();

    if (!items || items.length === 0) {
        return <p className="muted">No items on this menu yet.</p>;
    }

    return (
        <div className="grid">
            {items.map((item) => (
                <MenuItemCard
                    key={item.id}
                    item={item}
                    onAdd={addToCart}
                    isFavourite={favourites ? favourites.includes(item.id) : false}
                    onToggleFav={toggleFavourite}
                />
            ))}
        </div>
    );
}

export default MenuList;