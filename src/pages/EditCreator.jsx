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

    const { error } = await supabase
      .from('creators')
      .update(formData)
      .eq('id', id);

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
    <div>
      <h1>Edit Creator</h1>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Update Creator</button>
      </form>

      <button onClick={handleDelete} style={{ marginTop: '1rem', color: 'red' }}>
        Delete Creator
      </button>
    </div>
  );
}
