import { Link } from 'react-router-dom';

export default function CreatorCard({ creator }) {
  return (
    <article className="creator-card">
      {creator.imageURL && <img src={creator.imageURL} alt={creator.name} />}
      <h2>{creator.name}</h2>
      <p>
        <a href={creator.url} target="_blank" rel="noreferrer">
          Visit Channel ↗
        </a>
      </p>
      <p>{creator.description}</p>

      <div className="creator-actions">
        <Link to={`/creator/${creator.id}`} role="button" className="secondary">
          View
        </Link>
        <Link to={`/edit/${creator.id}`} role="button" className="secondary">
          Edit
        </Link>
      </div>
    </article>
  );
}
