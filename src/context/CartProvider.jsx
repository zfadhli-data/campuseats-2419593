import React from 'react';
import { CartContext } from './cart-context';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function CartProvider({ children }) {
    const [cart, setCart] = useLocalStorage('campuseats-cart', []);
    const [orders, setOrders] = useLocalStorage('campuseats-orders', []);

    // State untuk simpan array ID item kegemaran (Contoh: ['2416464-ali-1', '2416464-ali-3'])
    const [favourites, setFavourites] = useLocalStorage('campuseats-favourites', []);

    const count = cart.reduce((acc, line) => acc + line.qty, 0);
    const total = cart.reduce((acc, line) => acc + line.item.price * line.qty, 0);

    const toggleFavourite = (itemId) => {
        setFavourites((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId) 
                : [...prev, itemId]              
        );
    };

    const addToCart = (item, note = '') => {
        setCart((prevCart) => {
            const existingIdx = prevCart.findIndex((line) => line.item.id === item.id);
            if (existingIdx > -1) {
                const newCart = [...prevCart];
                newCart[existingIdx] = {
                    ...newCart[existingIdx],
                    qty: newCart[existingIdx].qty + 1,
                    note: note || newCart[existingIdx].note,
                };
                return newCart;
            }
            return [...prevCart, { item, qty: 1, note }];
        });
    };

    const changeQty = (itemId, delta) => {
        setCart((prevCart) =>
            prevCart
                .map((line) => {
                    if (line.item.id === itemId) {
                        const newQty = line.qty + delta;
                        return newQty > 0 ? { ...line, qty: newQty } : null;
                    }
                    return line;
                })
                .filter(Boolean)
        );
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId));
    };

    const placeOrder = (orderDetails) => {
        const newOrder = {
            id: `ORD-${Date.now()}`,
            items: cart,
            total,
            ...orderDetails,
            date: new Date().toISOString(),
        };
        setOrders((prevOrders) => [newOrder, ...prevOrders]);
        setCart([]);
        return newOrder;
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                orders,
                favourites,
                count,
                total,
                toggleFavourite,
                addToCart,
                changeQty,
                removeFromCart,
                placeOrder,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}