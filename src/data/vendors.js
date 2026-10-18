// src/data/vendors.js

const vendors = [
    {
        id: 'kafe-ali',
        name: 'Kafe Mahallah Ali',
        location: 'Mahallah Ali, Block C',
        openHours: '7:00 am - 10:00 pm',
        isOpen: true,
        menu: [
            { id: 'ali-1', name: 'Nasi Lemak Ayam', description: 'Nasi lemak dengan ayam goreng rangup', price: 7.5, category: 'Rice', available: true },
        ],
    },
    {
        id: 'kafe-safiyyah',
        name: 'Kafe Mahallah Safiyyah',
        location: 'Mahallah Safiyyah, Block A',
        openHours: '8:00 am - 11:30 pm',
        isOpen: false,
        menu: [
            { id: 'safiyyah-1', name: 'Roti Canai Safiyyah', description: 'Roti canai garing dengan kuah dhal', price: 2.5, category: 'Snacks', available: true },
            { id: 'safiyyah-2', name: 'Nasi Goreng Safiyyah', description: 'Nasi goreng kampung pedas', price: 6.5, category: 'Rice', available: true },
            { id: 'safiyyah-3', name: 'Sirap Bandung', description: 'Sirap bandung sejuk', price: 3.0, category: 'Drinks', available: true },
        ],
    },
    {
        id: 'kafe-zubair',
        name: 'Kafe Mahallah Zubair',
        location: 'Mahallah Zubair, Block A',
        openHours: '8:30 am - 11:00 pm',
        isOpen: false,
        menu: [
            { id: 'zubair-1', name: 'Syawarma Zubair', description: 'Daging syawarma dengan roti pita homemade', price: 6.0, category: 'Snacks', available: true },
            { id: 'zubair-2', name: 'Nasi Mandy Zubair', description: 'Nasi Arab mandy dengan ayam bakar', price: 10.0, category: 'Rice', available: true },
            { id: 'zubair-3', name: 'Teh O Air Limau', description: 'Teh O dengan perahan limau, masam manis', price: 2.5, category: 'Drinks', available: true },
        ],
    },
];

export default vendors;
