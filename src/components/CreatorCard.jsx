import { Link } from 'react-router-dom';

export default function CreatorCard({ creator }) {
  return (
    <div className="creator-card">
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
      )}
      <h2>{creator.name}</h2>
      <p>
        <a href={creator.url} target="_blank" rel="noreferrer">
          Visit Channel
        </a>
      </p>
      <p>{creator.description}</p>
      <Link to={`/creator/${creator.id}`}>View Details</Link>
      {' | '}
      <Link to={`/edit/${creator.id}`}>Edit</Link>
    </div>
  );
}
