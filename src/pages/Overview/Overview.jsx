import React from 'react'
import Options from '../../components/Options/Options'
import Navbar from '../../components/Navbar/Navbar'
import './Overview.css'

function Overview({ setProfile }) {
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
            <div className="overview-card-value">11</div>
            <div className="overview-card-desc">Articles publiés</div>
          </div>
          <div className="overview-card">
            <h3>Commandes</h3>
            <div className="overview-card-value">0</div>
            <div className="overview-card-desc">Pas de commande pour le momemnt</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Overview