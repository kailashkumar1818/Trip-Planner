export default function DestinationCard({ destination }) {
  return (
    <article className="card destination-card">
      <div
        className="destination-cover"
        style={{ backgroundImage: `linear-gradient(rgba(10,20,35,.3), rgba(10,20,35,.65)), url(${destination.coverImage})` }}
      />
      <div className="destination-content">
        <h3>{destination.destinationName}</h3>
        <p>{destination.description}</p>
        <div className="tag-list">
          {destination.recommendedPlaces?.map((place) => (
            <span key={place} className="tag">
              {place}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
