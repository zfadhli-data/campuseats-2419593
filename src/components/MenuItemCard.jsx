function MenuItemCard() {
  const items = [
    { name: 'Nasi Lemak Ayam', description: 'Coconut rice...', price: 7.5, available: true },
    { name: 'Mee Goreng Mamak', description: 'Stir-fried noodles...', price: 6.0, available: false },
  ]

  return (
    <div className="menu">
      {items.map((item, index) => (
        <article key={index} className="card menu-card">
          <div className="thumb" aria-hidden="true">{item.name.charAt(0)}</div>
          <h3>{item.name}</h3>
          <p className="muted">{item.description}</p>
          <p className="price">RM {item.price.toFixed(2)}</p>
          <button className="btn" disabled={!item.available}>
            {item.available ? 'Add to cart' : 'Sold out'}
          </button>
        </article>
      ))}
    </div>
  )
}
export default MenuItemCard