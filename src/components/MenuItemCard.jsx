function MenuItemCard({ item, onAdd }) {
  return (
    <article className="card menu-card">
      <span className="tag">{item.category}</span>
      <h3>{item.name}</h3>
      <p className="muted">{item.description}</p>
      <p className="price">RM {item.price.toFixed(2)}</p>
      <button
        className="btn"
        disabled={!item.available}
        onClick={() => onAdd(item)}
      >
        {item.available ? 'Add to cart' : 'Sold out'}
      </button>
    </article>
  );
}
export default MenuItemCard;
