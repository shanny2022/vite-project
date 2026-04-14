/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    fetchCreators();
  }, []);

  async function fetchCreators() {
    const { data, error } = await supabase.from('creators').select('*');
    if (error) {
      console.error(error);
    } else {
      setCreators(data);
    }
  }

  return (
    <div className="app-shell">
      <header className="page-header">
        <div>
          <h1 className="page-title">Creatorverse</h1>
          <p className="page-subtitle">Manage your favorite content creators.</p>
        </div>

        <Link to="/add" role="button">
          Add Creator
        </Link>
      </header>

      {creators.length === 0 ? (
        <article className="empty-state">
          <p>No creators found yet. Add your first creator.</p>
        </article>
      ) : (
        <div className="creator-grid">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </div>
  );
}
