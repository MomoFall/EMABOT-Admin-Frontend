import './Login.css';
import { Assets } from '../../assets/Assets';

function Login() {
  return (
    <div className="login-container">
        <div className="login-form">
            <img src={Assets.logo} alt="Logo" />
            <h2>Connexion Administrateur</h2>
            <form>
                <div className="form-group">
                    <input type="text" id="mail" name="mail" placeholder='Votre adresse e-mail'  required />
                </div>
                <div className="form-group">
                    <input type="password" id="password" name="password" placeholder='Votre mot de passe' required />
                </div>
                <button type="submit">Se connecter</button>
            </form>
            <div className="login-footer">
                <p>Mot de passe oublié? <a href="/reset-password">Réinitialiser</a></p>
                <p>Vous n'avez pas de compte? <a href="/register">S'inscrire</a></p>
            </div>
        </div>
    </div>
  )
}

export default Login
