import { Link } from "react-router-dom";
import { formatDate, getTripDuration } from "../utils/helpers";

export default function TripCard({ trip }) {
  return (
    <article className="card trip-card">
      <div className="card-row">
        <span className={`status-badge status-${trip.status}`}>{trip.status}</span>
        <span>{getTripDuration(trip.startDate, trip.endDate)} days</span>
      </div>
      <h3>{trip.tripName}</h3>
      <p>{trip.destination}</p>
      <p>
        {formatDate(trip.startDate)} to {formatDate(trip.endDate)}
      </p>
      <Link to={`/trips/${trip._id}`} className="text-link">
        Open itinerary
      </Link>
    </article>
  );
}
