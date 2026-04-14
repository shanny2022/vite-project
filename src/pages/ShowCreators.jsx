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
    <div>
      <h1>Creatorverse</h1>
      <Link to="/add">
        <button>Add Creator</button>
      </Link>

      {creators.length === 0 ? (
        <p>No creators found.</p>
      ) : (
        creators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))
      )}
    </div>
  );
}
