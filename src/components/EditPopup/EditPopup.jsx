import { useState, useEffect } from 'react';
import './EditPopup.css'
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;



function EditPopup({ article, setEditPopup, onProductUpdated }) {

  const [formData, setFormData] = useState({
    name: article?.name || '',
    price: article?.price || '',
    description: article?.description || '',
    image: null, // Pour un nouvel upload, sinon garder l'ancienne image
  });

  const [previewImage, setPreviewImage] = useState(
    article?.image ? `${apiUrl}/uploads/${article.image}` : null
  );


  useEffect(() => {
    if (article) {
      setFormData({
        name: article.name || '',
        price: article.price || '',
        description: article.description || '',
        image: null, // Reset image for new upload
      });
    }
  }, [article]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, image: files[0] });
      if (files && files[0]) {
        setPreviewImage(URL.createObjectURL(files[0]));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = new FormData();
    formattedData.append('name', formData.name);
    formattedData.append('price', formData.price);
    formattedData.append('description', formData.description);
    if (formData.image) {
      formattedData.append('image', formData.image);
    }
    try {
      const response = await axios.put(`${apiUrl}/api/articles/updatearticle/${article._id}`, formattedData
        , {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }}
      );
      if (response.data.success) {
        alert('Article mis à jour avec succès');
        onProductUpdated(response.data.article);
        setEditPopup(false);
      } else {
        alert('Erreur lors de la mise à jour de l\'article');
      }
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  

  return (
    <div className="edit-popup-overlay">
      <div className="edit-popup">
        <p className="close-btn" onClick={() => setEditPopup(false)}>X</p>
        <h2>Modifier l'article</h2>
        <form onSubmit={handleSubmit}>
          <label>Nom</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Prix (€)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />

          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />

          <label>Image</label>
          <input type="file" name="image" onChange={handleChange} />
          {previewImage && (
            <div style={{ margin: "10px 0" }}>
              <img
                src={previewImage}
                alt="Aperçu du produit"
                style={{ maxWidth: "120px", maxHeight: "120px", borderRadius: "8px", border: "1px solid #eee" }}
              />
            </div>
          )}

          <button type="submit">Enregistrer</button>
        </form>
      </div>
    </div>
  );
}

export default EditPopup;