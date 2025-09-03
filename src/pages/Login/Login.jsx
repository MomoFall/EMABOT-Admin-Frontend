import './Login.css';
import { Assets } from '../../assets/Assets';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../components/Api/axios.js';
const apiUrl = import.meta.env.VITE_API_URL;


function Login() {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/signin');
    }

    const [formData, setFormData] = useState({
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
        try {
            const response = await axios.post(`${apiUrl}/api/admin/login`, formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`

                    }
                }   
            );
            
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                alert('Connexion réussie !');
                navigate('/');
            } else {
                alert('Erreur lors de la connexion : ' + response.data.message);
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            alert('Erreur lors de la connexion. Veuillez réessayer plus tard.');
        }
    }

  return (
    <div className="login-container">
        <div className="login-form">
            <img src={Assets.logo} alt="Logo" />
            <h2>Connexion Administrateur</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" id="email" name="email" value={formData.email} placeholder='Votre adresse e-mail'  required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input type="password" id="password" name="password" value={formData.password} placeholder='Votre mot de passe' required onChange={handleChange} />
                </div>
                <button type="submit">Se connecter</button>
            </form>
            <div className="login-footer">
            </div>
        </div>
    </div>
  )
}

export default Login
