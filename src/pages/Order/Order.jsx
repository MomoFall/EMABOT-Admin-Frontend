import React from 'react'
import Options from '../../components/Options/Options'
import Navbar from '../../components/Navbar/Navbar'
import './Order.css'

function Order({ setProfile }) {
  return (
    <>
      <Navbar setProfile={setProfile}/>
      <div className="order-container">
        <div className="page-header">
          <h2>Tableau de bord Administrateur</h2>
          <Options />
        </div>
        <div className="order-card">
          <h3>Commandes</h3>
          <div className="order-card-desc">
            Aucune commande pour le moment.
          </div>
        </div>
      </div>
    </>
  )
}

export default Order