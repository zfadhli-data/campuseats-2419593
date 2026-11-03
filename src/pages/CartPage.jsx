import React from 'react';
import { useNavigate } from 'react-router';
import CartItem from '../components/CartItem';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '../hooks/useCart';

function CartPage() {
    const { cart, total, changeQty, removeFromCart, placeOrder } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="card">
                <h2>Your Cart</h2>
                <p className="muted">Your cart is empty. Pick something from a menu first.</p>
            </div>
        );
    }

    const handlePlaceOrder = (formDetails) => {
        placeOrder(formDetails);
        navigate('/orders');
    };

    return (
        <div>
            <h2>Your Cart</h2>
            <div className="cart-layout">
                <div className="card">
                    <ul className="cart-list">
                        {cart.map((line) => (
                            <CartItem
                                key={line.item.id}
                                line={line}
                                onChangeQty={changeQty}
                                onRemove={removeFromCart}
                            />
                        ))}
                    </ul>
                    <p className="cart-total">Total: RM {total.toFixed(2)}</p>
                </div>

                <CheckoutForm onPlaceOrder={handlePlaceOrder} />
            </div>
        </div>
    );
}

export default CartPage;