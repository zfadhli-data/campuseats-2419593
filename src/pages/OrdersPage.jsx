import React from 'react';
import { useCart } from '../hooks/useCart';

function OrdersPage() {
    const { orders } = useCart();

    if (!orders || orders.length === 0) {
        return (
            <div className="card">
                <h2>My Orders</h2>
                <p className="muted">You have not placed any orders yet.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>My Orders</h2>
            <div className="orders-container">
                {orders.map((order) => (
                    <div key={order.id} className="card order-card">
                        <div className="order-header">
                            <strong>Order #{order.id}</strong>
                            <span className="muted">
                                {new Date(order.date).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                })}
                            </span>
                        </div>
                        <p className="order-info">
                            <strong>Customer:</strong> {order.name} ({order.mahallah})
                        </p>
                        <p className="order-info">
                            <strong>Pickup Time:</strong> {order.pickupTime}
                        </p>
                        <ul className="order-items-list">
                            {order.items.map((line) => (
                                <li key={line.id || line.item?.id}>
                                    {line.qty}x {line.name || line.item?.name} - RM{' '}
                                    {((line.price || line.item?.price) * line.qty).toFixed(2)}
                                    {/* Digit 7: Displays item order note */}
                                    {line.note && <span className="order-note">Note: "{line.note}"</span>}
                                </li>
                            ))}
                        </ul>
                        <p className="order-total-text">
                            Total: RM {order.total.toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrdersPage;