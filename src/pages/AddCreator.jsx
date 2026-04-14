import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

export default function AddCreator() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase.from('creators').insert([formData]);

    if (error) {
      console.error(error);
    } else {
      navigate('/');
    }
  }

  return (
    <div className="app-shell form-card">
      <h1>Add Creator</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} />

        <label htmlFor="url">URL</label>
        <input id="url" type="url" name="url" value={formData.url} onChange={handleChange} />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor="imageURL">Image URL</label>
        <input
          id="imageURL"
          type="url"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
        />

        <button type="submit">Add Creator</button>
      </form>
    </div>
  );
}
