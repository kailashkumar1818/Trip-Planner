import { formatDate } from "../utils/helpers";

export default function BookingCard({ booking }) {
  return (
    <article className="mini-card">
      <div className="card-row">
        <h4>{booking.bookingName}</h4>
        <span className="tag">{booking.bookingType}</span>
      </div>
      <p>{booking.provider || "Provider not added"}</p>
      <span>
        {formatDate(booking.checkInDate)} to {formatDate(booking.checkOutDate)}
      </span>
    </article>
  );
}
