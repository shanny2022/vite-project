/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client';

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });

  useEffect(() => {
    fetchCreator();
  }, []);

  async function fetchCreator() {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(error);
    } else {
      setFormData({
        name: data.name || '',
        url: data.url || '',
        description: data.description || '',
        imageURL: data.imageURL || '',
      });
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase.from('creators').update(formData).eq('id', id);

    if (error) {
      console.error(error);
    } else {
      navigate(`/creator/${id}`);
    }
  }

  async function handleDelete() {
    const { error } = await supabase.from('creators').delete().eq('id', id);

    if (error) {
      console.error(error);
    } else {
      navigate('/');
    }
  }

  return (
    <div className="app-shell form-card">
      <h1>Edit Creator</h1>

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

        <button type="submit">Update Creator</button>
      </form>

      <button className="secondary" onClick={handleDelete} style={{ marginTop: '1rem' }}>
        Delete Creator
      </button>
    </div>
  );
}
