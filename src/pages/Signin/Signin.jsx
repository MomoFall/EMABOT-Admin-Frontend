import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './Signin.css'
const apiUrl = import.meta.env.VITE_API_URL;


function Signin() {

    const [formData, setFormData] = useState({
        lastname: '',
        firstname: '',
        phone: '',
        email: '',
        password: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification email valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert("Veuillez entrer une adresse email valide.");
        return;
    }

    try {
        const response = await axios.post(`${apiUrl}/api/admin/register`, formData);
        if (response.data.success) {
            alert('Inscription réussie !');
        } else {
            alert('Erreur lors de l\'inscription : ' + response.data.message);
        }
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        alert('Erreur lors de l\'inscription. Veuillez réessayer plus tard.');
    }
}

  return (
    <div className="signin-container">
        <h2>Bienvenue sur EMABOT Admin</h2>
        <form className="signin-form" onSubmit={handleSubmit}>
            <label htmlFor="lastname">Nom</label>
            <input type="text" name="lastname" id="lastname" placeholder="Entrez votre nom" value={formData.lastname} onChange={handleChange}/>
            <label htmlFor="firstname">Prenom</label>
            <input type="text" name="firstname" id="firstname" placeholder="Entrez votre prénom" value={formData.firstname} onChange={handleChange}/>
            <label htmlFor="phone">Téléphone:</label>
            <input type="text" name="phone" id="phone" placeholder="Entrez votre numéro de téléphone" value={formData.phone} onChange={handleChange}/>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="Entrez votre email" value={formData.email} onChange={handleChange}/>
            <label htmlFor="password">Mot de passe:</label>
            <input type="password" name="password" id="password" placeholder="Entrez votre mot de passe" value={formData.password} onChange={handleChange}/>
            <button type="submit">S'inscrire</button>
        </form>
    </div>
  )
}

export default Signin
