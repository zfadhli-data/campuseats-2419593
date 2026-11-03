import React, { useState, useEffect } from 'react';

const MAHALLAHS = [
    'Ali', 'Aminah', 'Faruq', 'Asiah',
    'Bilal', 'Hafsa', 'Uthman', 'Zubair'
];

function validate(values) {
    const errors = {};
    if (values.name.trim().length < 3) {
        errors.name = 'Enter your name (at least 3 characters).';
    }
    if (!values.mahallah) {
        errors.mahallah = 'Choose your mahallah.';
    }
    if (!values.pickupTime) {
        errors.pickupTime = 'Choose a pickup time.';
    } else if (values.pickupTime < '07:00' || values.pickupTime > '22:00') {
        errors.pickupTime = 'Pickup time must be between 07:00 and 22:00.';
    }
    return errors;
}

function CheckoutForm({ onPlaceOrder, queueWaitMinutes = 15 }) {
    const [values, setValues] = useState({
        name: '',
        mahallah: '',
        pickupTime: '',
    });
    const [errors, setErrors] = useState({});
    const [suggestedTime, setSuggestedTime] = useState('');

    useEffect(() => {
        const calculateEarliestTime = () => {
            const now = new Date();
            now.setMinutes(now.getMinutes() + queueWaitMinutes);
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const timeStr = `${hours}:${minutes}`;
            setSuggestedTime(timeStr);

            setValues((prev) => (prev.pickupTime ? prev : { ...prev, pickupTime: timeStr }));
        };

        calculateEarliestTime();
        const interval = setInterval(calculateEarliestTime, 60000);
        return () => clearInterval(interval);
    }, [queueWaitMinutes]);

    function handleChange(event) {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        const foundErrors = validate(values);
        setErrors(foundErrors);

        if (Object.keys(foundErrors).length === 0) {
            onPlaceOrder(values);
        }
    }

    return (
        <form className="card form" onSubmit={handleSubmit} noValidate>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Checkout</h3>

            <label htmlFor="name">Name</label>
            <input
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Your name"
            />
            {errors.name && <p className="field-error">{errors.name}</p>}

            <label htmlFor="mahallah">Mahallah</label>
            <select
                id="mahallah"
                name="mahallah"
                value={values.mahallah}
                onChange={handleChange}
            >
                <option value="">Select...</option>
                {MAHALLAHS.map((m) => (
                    <option key={m} value={m}>
                        {m}
                    </option>
                ))}
            </select>
            {errors.mahallah && <p className="field-error">{errors.mahallah}</p>}

            <label htmlFor="pickupTime">Pickup time</label>
            <input
                type="time"
                id="pickupTime"
                name="pickupTime"
                value={values.pickupTime}
                onChange={handleChange}
            />

            {suggestedTime && (
                <p style={{ margin: '0.2rem 0', fontSize: '0.8rem', color: '#006644' }}>
                    💡 Earliest estimated ready time: {suggestedTime} (~{queueWaitMinutes} min wait)
                </p>
            )}
            {errors.pickupTime && <p className="field-error">{errors.pickupTime}</p>}

            <button type="submit" className="btn" style={{ marginTop: '1rem' }}>
                Place order
            </button>
        </form>
    );
}

export default CheckoutForm;