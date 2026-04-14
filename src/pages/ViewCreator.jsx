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

  if (!creator) return <div className="app-shell"><p>Loading...</p></div>;

  return (
    <div className="app-shell">
      <article className="detail-card">
        {creator.imageURL && <img src={creator.imageURL} alt={creator.name} />}
        <h1>{creator.name}</h1>
        <p>
          <a href={creator.url} target="_blank" rel="noreferrer">
            Visit Channel ↗
          </a>
        </p>
        <p>{creator.description}</p>

        <div className="creator-actions">
          <Link to={`/edit/${creator.id}`} role="button">
            Edit Creator
          </Link>
          <Link to="/" role="button" className="secondary">
            Back Home
          </Link>
        </div>
      </article>
    </div>
  );
}
