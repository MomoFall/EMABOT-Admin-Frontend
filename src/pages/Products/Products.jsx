import Options from '../../components/Options/Options'
import Navbar from '../../components/Navbar/Navbar'
import './Products.css'
import { useEffect, useState } from 'react'
import axios from '../../components/Api/axios.js'
import EditPopup from '../../components/EditPopup/EditPopup'
import { useSiteContext } from '../../components/SiteContext/SiteContext'
const apiUrl = import.meta.env.VITE_API_URL;

function Products({ setProfile }) {

    const { articles, setArticles } = useSiteContext([]);
    const [editPopup, setEditPopup] = useState(false);
    const [editArticle, setEditArticle] = useState(null);

    const [previewImage, setPreviewImage] = useState(null);


    const handleEditPopup = (article) => {
        setEditArticle(article);
        setEditPopup(true);
    }

    const fetchArticles = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/articles/getarticles`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    setArticles(response.data.articles);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des articles:', error);
            }
    };


    useEffect(() => {
        fetchArticles();;
    }, []);


    const handleDelete = async (articleId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
        return; // On arrête si l'utilisateur annule
    }
    try {
        const response = await axios.delete(`${apiUrl}/api/articles/deletearticle/${articleId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.data.success) {
            setArticles(response.data.articles);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'article:', error);
    }
};




    useEffect(() => {
  console.log(articles);
}, [articles]);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: null,
        description: ''
    });

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
            if (files && files[0]) {
                setPreviewImage(URL.createObjectURL(files[0]));
            } else {
                setPreviewImage(null);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, price, image, description } = formData;
        if (!name || !price || !image || !description) {
            alert('Veuillez remplir tous les champs.');
            return;
        }
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', name);
            formDataToSend.append('price', price);
            formDataToSend.append('image', image);
            formDataToSend.append('description', description);
            const response = await axios.post(`${apiUrl}/api/articles/createarticle`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                alert('Produit ajouté avec succès !');
                setFormData({
                    name: '',
                    price: '',
                    image: null,
                    description: ''
                });
                setPreviewImage(null); // Réinitialise la prévisualisation
                fetchArticles();
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    }

  return (
    <>
        {editPopup && editArticle && <EditPopup article={editArticle} 
        onProductUpdated={(updatedArticle) => {
        setArticles(articles.map(art => art._id === updatedArticle._id ? updatedArticle : art));
        setEditPopup(false);
        }}
        setEditPopup={setEditPopup}
         />}
        <Navbar setProfile={setProfile} />
        <div className="products-container">
            <div className="page-header">
                <h2>Tableau de bord Administrateur</h2>
                <Options />
            </div>
            <div className="add-products">
                <h2>Ajouter un produit</h2>
                <form className="add-product-form" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="product-name">Nom</label>
                            <input type="text" id="product-name" name="name"  value={formData.name} placeholder="Ex: Carte Arduino" onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="product-price">Prix (€)</label>
                            <input type="number" id="product-price" name="price"  value={formData.price} placeholder="20" onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="product-image">Image</label>
                            <input type="file" id="product-image" name="image" onChange={handleChange} />
                        </div>
                        {previewImage && (
                            <div style={{ margin: "10px 0" }}>
                                <img
                                    src={previewImage}
                                    alt="Aperçu du produit"
                                    style={{ maxWidth: "120px", maxHeight: "120px", borderRadius: "8px", border: "1px solid #eee" }}
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="product-description">Description</label>
                            <textarea id="product-description" name="description"  value={formData.description} placeholder="Description du produit" onChange={handleChange} ></textarea>
                        </div>
                        <button className="add-product-button">Ajouter</button>
                </form>
            </div>
            <div className="products-content">
                <div className="products-header">
                    <p>Image</p>
                    <p>Nom</p>
                    <p>Prix</p>
                    <p>Actions</p>
                </div>
                <hr />
                { articles && articles.length > 0 ? articles.map((article, index) => (
                    <div className="product-item" key={index}>
                        <img src={`${apiUrl}/uploads/${article.image}`} alt={article.name} />
                        <p>{article.name}</p>
                        <p>{article.price} €</p>
                        <div className="product-actions">
                            <button className="edit-button" onClick={() => handleEditPopup(article)}>Modifier</button>
                            <button className="delete-button" onClick={() => handleDelete(article._id)}>Supprimer</button>
                        </div>
                        <hr/>
                    </div>
                )) : <p>Aucun produit disponible.</p>}
                {/* Order content goes here */}
            </div>
        </div>
    </>
  )
}

export default Products
