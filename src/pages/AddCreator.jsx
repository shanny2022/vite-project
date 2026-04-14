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
    <form onSubmit={handleSubmit}>
      <h1>Add Creator</h1>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="url"
        placeholder="URL"
        value={formData.url}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="text"
        name="imageURL"
        placeholder="Image URL"
        value={formData.imageURL}
        onChange={handleChange}
      />

      <button type="submit">Add Creator</button>
    </form>
  );
}
