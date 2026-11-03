import React from 'react';

function CartItem({ line, onChangeQty, onRemove, onUpdateNote }) {
    const { item, qty, note } = line;

    return (
        <li className="cart-line">
            <div>
                <p className="cart-name">{item.name}</p>
                <p className="muted" style={{ margin: 0, fontSize: '0.85rem' }}>
                    RM {item.price.toFixed(2)} each
                </p>
                <input
                    type="text"
                    value={note || ''}
                    onChange={(e) => onUpdateNote(item.id, e.target.value)}
                    placeholder="Edit item note..."
                    style={{
                        marginTop: '0.3rem',
                        fontSize: '0.8rem',
                        padding: '0.2rem',
                        width: '90%',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                />
            </div>
            <div className="qty">
                <button type="button" onClick={() => onChangeQty(item.id, -1)}>
                    -
                </button>
                <span>{qty}</span>
                <button type="button" onClick={() => onChangeQty(item.id, 1)}>
                    +
                </button>
            </div>
            <p className="line-total">RM {(item.price * qty).toFixed(2)}</p>
            <button
                type="button"
                className="link danger"
                onClick={() => onRemove(item.id)}
            >
                Remove
            </button>
        </li>
    );
}

export default CartItem;