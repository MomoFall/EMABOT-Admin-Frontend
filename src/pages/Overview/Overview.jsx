import Options from '../../components/Options/Options'
import Navbar from '../../components/Navbar/Navbar'
import './Overview.css'
import { useSiteContext } from '../../components/SiteContext/SiteContext'
import { use, useEffect, useState } from 'react'
import axios from '../../components/Api/axios.js'
const apiUrl = import.meta.env.VITE_API_URL;


function Overview({ setProfile }) {
    const { articles } = useSiteContext();
    const TotalArticles = articles.length;

    const [orderCount, setOrderCount] = useState(0);
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        // Récupère les commandes à l'ouverture de la page
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/customerorder/getcustomerorders`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success && Array.isArray(response.data.customers)) {
                    setOrderCount(response.data.customers.length);
                } else {
                    setOrderCount(0);
                }
            } catch (error) {
                setOrderCount(0);
            }
        };
        fetchOrders();
    }, []);

    useEffect(() => {

      const fetchProducts = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/articles/getarticles`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (response.data.success && Array.isArray(response.data.articles)) {
            setProductCount(response.data.articles.length);
          } else {
            setProductCount(0);
          }
        } catch (error) {
          setProductCount(0);
        }
      };
      fetchProducts();
    }, []);

  return (
    <>
      <Navbar setProfile={setProfile} />
      <div className="overview-container">
        <div className="page-header">
          <h2>Tableau de bord Administrateur</h2>
          <Options />
        </div>
        <div className="overview-cards">
          <div className="overview-card">
            <h3>Produits</h3>
            <div className="overview-card-value">{TotalArticles}</div>
            <div className="overview-card-desc">Articles publiés</div>
          </div>
          <div className="overview-card">
            <h3>Commandes</h3>
            <div className="overview-card-value">{productCount}</div>
            <div className="overview-card-desc">
              {orderCount === 0 ? "Pas de commande pour le moment" : `${orderCount} commande(s) reçue(s)`}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Overview