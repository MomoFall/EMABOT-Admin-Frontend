import Options from '../../components/Options/Options'
import Navbar from '../../components/Navbar/Navbar'
import './Products.css'
import { emaBotProducts } from '../../assets/Assets'

function Products({ setProfile }) {
  return (
    <>
        <Navbar setProfile={setProfile} />
        <div className="products-container">
            <div className="page-header">
                <h2>Tableau de bord Administrateur</h2>
                <Options />
            </div>
            <div className="add-products">
                <h2>Ajouter un produit</h2>
                <div>
                    <div>
                        <label htmlFor="product-name">Nom</label>
                        <input type="text" id="product-name" placeholder="Ex: Carte Arduino" />
                    </div>
                    <div>
                        <label htmlFor="product-price">Prix (€)</label>
                        <input type="number" id="product-price" placeholder="20" />
                    </div>
                    <div>
                        <label htmlFor="product-image">Image</label>
                        <input type="file" id="product-image" />
                    </div>
                    <div>
                        <label htmlFor="product-description">Description</label>
                        <textarea id="product-description" placeholder="Description du produit"></textarea>
                    </div>
                    <button className="add-product-button">Ajouter</button>
                </div>
            </div>
            <div className="products-content">
                <div className="products-header">
                    <p>Image</p>
                    <p>Nom</p>
                    <p>Prix</p>
                    <p>Actions</p>
                </div>
                <hr />
                {emaBotProducts.map((product, index) => (
                    <div className="product-item" key={index}>
                        <img src={product.image} alt={product.name} />
                        <p>{product.name}</p>
                        <p>{product.price} €</p>
                        <div className="product-actions">
                            <button className="edit-button">Modifier</button>
                            <button className="delete-button">Supprimer</button>
                        </div>
                        <hr/>
                    </div>
                ))}
                {/* Order content goes here */}
            </div>
        </div>
    </>
  )
}

export default Products
