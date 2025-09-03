import React, { useEffect, useMemo, useState } from 'react';
import Options from '../../components/Options/Options';
import Navbar from '../../components/Navbar/Navbar';
import './Order.css';
import axios from '../../components/Api/axios.js';
import DetailPopup from '../../components/DetailPopup/DetailPopup';
const apiUrl = import.meta.env.VITE_API_URL;


const STATUS_LIST = ["En attente de validation", "En préparation", "Prête", "Retirer"];

function getStatusLabel(status) {
  switch (status) {
    case "En attente de validation":
      return <span className="order-status attente">En attente de validation</span>;
    case "En préparation":
      return <span className="order-status preparation">En préparation</span>;
    case "Prête":
      return <span className="order-status pret">Prête</span>;
    case "Retirer":
      return <span className="order-status retirer">Retirer</span>;
    default:
      return <span className="order-status attente">En attente de validation</span>;
  }
}

function Order({ setProfile }) {
  const [orderData, setOrderData] = useState([]);
  const [detailView, setDetailView] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // UI – filtres
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');

  const toggleDetailView = (orderId) => {
    setSelectedOrderId(orderId);
    setDetailView(true);
  };

  const handleChangeStatus = async (order) => {
    const currentIndex = STATUS_LIST.indexOf(order.status);
    const nextStatus = STATUS_LIST[(currentIndex + 1) % STATUS_LIST.length];

    try {
      await axios.put(
        `${apiUrl}/api/customerorder/updatestatus/${order._id}`,
        { status: nextStatus },
        { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
      );
      setOrderData(prev => prev.map(o => (o._id === order._id ? { ...o, status: nextStatus } : o)));
    } catch (error) {
      alert("Erreur lors du changement de statut");
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await axios.get(`${apiUrl}/api/customerorder/getcustomerorders`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setOrderData(Array.isArray(response.data?.customers) ? response.data.customers : []);
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
      setErrorMsg("Impossible de charger les commandes. Réessaie.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredOrders = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orderData.filter(o => {
      const matchQuery =
        !q ||
        (o.name && o.name.toLowerCase().includes(q)) ||
        (o.email && o.email.toLowerCase().includes(q)) ||
        (Array.isArray(o.items) && o.items.some(it => (it?.name || '').toLowerCase().includes(q)));
      const matchStatus =
        statusFilter === 'Tous' || (o.status === statusFilter);
      return matchQuery && matchStatus;
    });
  }, [orderData, query, statusFilter]);

  return (
    <>
      {detailView && (
        <DetailPopup
          order={orderData.find(order => order._id === selectedOrderId)}
          onClose={() => setDetailView(false)}
        />
      )}
      <Navbar setProfile={setProfile} />
      <div className="order-container">
        <div className="page-header">
          <h2>Tableau de bord Administrateur</h2>
          <Options />
        </div>

        {/* Barre d’outils : recherche + filtre + refresh */}
        <div className="order-toolbar" role="region" aria-label="Filtres commandes">
          <input
            className="order-search"
            type="text"
            placeholder="Rechercher (client, email, produit)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Rechercher une commande"
          />
          <select
            className="order-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filtrer par statut"
          >
            <option value="Tous">Tous les statuts</option>
            {STATUS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button className="order-refresh" onClick={fetchOrders} aria-label="Rafraîchir la liste">
            Rafraîchir
          </button>
        </div>

        <div className="order-card" role="table" aria-label="Gestion des commandes">
          <h3>Gestion des commandes</h3>

          {/* États de chargement / erreur */}
          {loading && (
            <div className="order-skeleton">
              <div className="skeleton-row"></div>
              <div className="skeleton-row"></div>
              <div className="skeleton-row"></div>
            </div>
          )}
          {!loading && errorMsg && (
            <div className="order-error">
              {errorMsg} <button onClick={fetchOrders}>Réessayer</button>
            </div>
          )}

          {!loading && !errorMsg && (
            <div className="order-card-desc">
              {/* Entête */}
              <div className="order-header" role="rowgroup">
                <div className="order-headcell" role="columnheader">Client</div>
                <div className="order-headcell" role="columnheader">Produits</div>
                <div className="order-headcell" role="columnheader">Total</div>
                <div className="order-headcell" role="columnheader">Statut</div>
                <div className="order-headcell" role="columnheader">Actions</div>
              </div>

              {/* Lignes */}
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <div className="order-row" role="row" key={order._id}>
                    <div className="order-cell" data-label="Client" role="cell">
                      <div className="order-client">{order.name ?? "—"}</div>
                      <div className="order-client-email">{order.email ?? "—"}</div>
                    </div>

                    <div className="order-cell order-products" data-label="Produits" role="cell">
                      {Array.isArray(order.items) && order.items.length > 0 ? (
                        order.items.map((item, i) => (
                          <div key={i}>{item.quantity ?? 1}x {item.name ?? "Produit"}</div>
                        ))
                      ) : (
                        <div>Aucun produit</div>
                      )}
                    </div>

                    <div className="order-cell order-total" data-label="Total" role="cell">
                      {(order.total ?? 0).toFixed(2)} <span className="order-euro">€</span>
                    </div>

                    <div className="order-cell" data-label="Statut" role="cell">
                      {getStatusLabel(order.status)}
                    </div>

                    <div className="order-cell order-date" data-label="Date" role="cell">
                      {order.createdAt?.slice(0, 10) ?? "—"}
                    </div>

                    <div className="order-cell order-actions" data-label="Actions" role="cell">
                      <button
                        className="order-action-btn"
                        onClick={() => toggleDetailView(order._id)}
                      >
                        Voir détails
                      </button>
                      <button
                        className="order-action-btn"
                        onClick={() => handleChangeStatus(order)}
                      >
                        Modifier statut
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="order-empty">Aucune commande trouvée.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Order;
