/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../client';

export default function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);

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
      setCreator(data);
    }
  }

  if (!creator) return <p>Loading...</p>;

  return (
    <div>
      <h1>{creator.name}</h1>
      {creator.imageURL && <img src={creator.imageURL} alt={creator.name} style={{ width: '300px' }} />}
      <p>
        <a href={creator.url} target="_blank" rel="noreferrer">
          Visit Channel
        </a>
      </p>
      <p>{creator.description}</p>
      <Link to={`/edit/${creator.id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}
