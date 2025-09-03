import './DetailPopup.css';


function DetailPopup({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="detail-popup-overlay">
      <div className="detail-popup">
        <div className="detail-head">
            <h2>Détails de la commande</h2>
            <span className="close-btn" onClick={onClose}>x</span>
        </div>
        <div className="detail-header">
          <div className="detail-customer-info">
            <h4>Informations client</h4>
            <div><b>Nom:</b> <span>{order.name}</span></div>
            <div><b>Email:</b> <span>{order.email}</span></div>
            <div><b>Téléphone:</b> <span>{order.phone}</span></div>
            <div><b>Date:</b> <span>{order.createdAt?.slice(0, 10)}</span></div>
          </div>
          <div className="detail-status">
            <span className={`order-status ${order.status ?? "en-attente"}`}>
              {order.status ?? "En attente"}
            </span>
          </div>
        </div>
        <h4 style={{marginTop: 24}}>Produits commandés</h4>
        <table className="detail-table">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Prix unitaire</th>
              <th>Quantité</th>
              <th>Sous-total</th>
            </tr>
          </thead>
          <tbody>
            {order.items && order.items.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.price?.toFixed(2)} €</td>
                <td>{item.quantity}</td>
                <td>{(item.price * item.quantity).toFixed(2)} €</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="detail-total">
          <b>Total:</b> {(order.total ?? 0).toFixed(2)} €
        </div>
      </div>
    </div>
  );
}

export default DetailPopup;