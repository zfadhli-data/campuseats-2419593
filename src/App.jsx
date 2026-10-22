import { useState } from 'react'
import vendors from './data/vendors.js'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import CartPage from './components/CartPage.jsx'
import Footer from './components/Footer.jsx'

function App() {
  // 1. All state declarations live inside the component
  const [cart, setCart] = useState([])
  const [selectedVendorId, setSelectedVendorId] = useState(vendors[0].id)
  const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
  const [lastOrder, setLastOrder] = useState(null)

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)

  // 2. Calculate total quantity for the cart badge
  const cartCount = cart.reduce((total, line) => total + line.qty, 0)

  // 3. Cart and Order handlers
  function handleAddToCart(item) {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingIndex = prevCart.findIndex((line) => line.item.id === item.id)
      if (existingIndex > -1) {
        // If it exists, increment qty
        return prevCart.map((line, index) =>
          index === existingIndex ? { ...line, qty: line.qty + 1 } : line
        )
      }
      // Otherwise, add new line item with qty 1
      return [...prevCart, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prevCart) => {
      return prevCart
        .map((line) => {
          if (line.item.id === itemId) {
            const newQty = line.qty + delta
            return { ...line, qty: newQty }
          }
          return line
        })
        .filter((line) => line.qty > 0) // Remove item if qty drops to 0 or lower
    })
  }

  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  function handlePlaceOrder(details) {
    // Calculate total from current cart lines
    const total = cart.reduce((sum, line) => sum + (line.item.price * line.qty), 0)

    setLastOrder({ ...details, total })
    setCart([]) // Clear the cart
    setView('done')
  }

  // 4. Conditional content based on current view
  let content
  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done') {
    content = (
      <div className="order-success card">
        <h2>Order Placed Successfully!</h2>
        {lastOrder && (
          <div className="order-details">
            <p><strong>Name:</strong> {lastOrder.name}</p>
            <p><strong>Mahallah:</strong> {lastOrder.mahallah}</p>
            <p><strong>Estimated Pickup Time:</strong> {lastOrder.pickupTime}</p>
            <p><strong>Total Paid:</strong> RM {lastOrder.total.toFixed(2)}</p>
          </div>
        )}
        <button className="btn" onClick={() => setView('menu')} style={{ marginTop: '1rem' }}>
          Back to Vendors
        </button>
      </div>
    )
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="section-title">Menu: {selectedVendor.name}</h2>
          <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
        </section>
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App