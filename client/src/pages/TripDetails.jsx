import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActivityCard from "../components/ActivityCard";
import BookingCard from "../components/BookingCard";
import { addActivity, getTripDetails } from "../services/tripService";
import { addBooking } from "../services/bookingService";
import { formatDate } from "../utils/helpers";

const emptyActivity = { activityName: "", activityDate: "", location: "", notes: "" };
const emptyBooking = {
  bookingType: "Hotel",
  bookingName: "",
  provider: "",
  checkInDate: "",
  checkOutDate: "",
  details: ""
};

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [activityForm, setActivityForm] = useState(emptyActivity);
  const [bookingForm, setBookingForm] = useState(emptyBooking);

  const loadTrip = async () => {
    const data = await getTripDetails(id);
    setTrip(data);
  };

  useEffect(() => {
    loadTrip();
  }, [id]);

  const handleActivitySubmit = async (event) => {
    event.preventDefault();
    await addActivity(id, activityForm);
    setActivityForm(emptyActivity);
    loadTrip();
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    await addBooking(id, bookingForm);
    setBookingForm(emptyBooking);
    loadTrip();
  };

  if (!trip) {
    return <div className="page-shell">Loading trip...</div>;
  }

  return (
    <div className="page-shell">
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{trip.destination}</p>
            <h2>{trip.tripName}</h2>
            <p>
              {formatDate(trip.startDate)} to {formatDate(trip.endDate)}
            </p>
          </div>
          <span className={`status-badge status-${trip.status}`}>{trip.status}</span>
        </div>
        <div className="detail-grid">
          <article className="card">
            <h3>Day-wise itinerary</h3>
            <div className="timeline">
              {trip.itinerary?.map((item, index) => (
                <div key={`${item.title}-${index}`} className="timeline-item">
                  <strong>{formatDate(item.date)}</strong>
                  <p>{item.title}</p>
                  <span>{item.note}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="card">
            <h3>Trip notes</h3>
            <p>{trip.notes || "No extra notes yet."}</p>
          </article>
        </div>
      </section>

      <section className="section split-section">
        <article className="card">
          <h3>Add activity</h3>
          <form className="form-grid compact" onSubmit={handleActivitySubmit}>
            <input
              placeholder="Activity name"
              value={activityForm.activityName}
              onChange={(e) => setActivityForm({ ...activityForm, activityName: e.target.value })}
            />
            <input
              type="date"
              value={activityForm.activityDate}
              onChange={(e) => setActivityForm({ ...activityForm, activityDate: e.target.value })}
            />
            <input
              placeholder="Location"
              value={activityForm.location}
              onChange={(e) => setActivityForm({ ...activityForm, location: e.target.value })}
            />
            <textarea
              placeholder="Notes"
              value={activityForm.notes}
              onChange={(e) => setActivityForm({ ...activityForm, notes: e.target.value })}
            />
            <button className="primary-button" type="submit">
              Add activity
            </button>
          </form>
        </article>

        <article className="card">
          <h3>Add booking</h3>
          <form className="form-grid compact" onSubmit={handleBookingSubmit}>
            <select value={bookingForm.bookingType} onChange={(e) => setBookingForm({ ...bookingForm, bookingType: e.target.value })}>
              <option value="Hotel">Hotel</option>
              <option value="Transport">Transport</option>
            </select>
            <input
              placeholder="Booking name"
              value={bookingForm.bookingName}
              onChange={(e) => setBookingForm({ ...bookingForm, bookingName: e.target.value })}
            />
            <input placeholder="Provider" value={bookingForm.provider} onChange={(e) => setBookingForm({ ...bookingForm, provider: e.target.value })} />
            <input
              type="date"
              value={bookingForm.checkInDate}
              onChange={(e) => setBookingForm({ ...bookingForm, checkInDate: e.target.value })}
            />
            <input
              type="date"
              value={bookingForm.checkOutDate}
              onChange={(e) => setBookingForm({ ...bookingForm, checkOutDate: e.target.value })}
            />
            <textarea
              placeholder="Details"
              value={bookingForm.details}
              onChange={(e) => setBookingForm({ ...bookingForm, details: e.target.value })}
            />
            <button className="primary-button" type="submit">
              Save booking
            </button>
          </form>
        </article>
      </section>

      <section className="section split-section">
        <article className="card">
          <h3>Activities</h3>
          <div className="stack">
            {trip.activities?.length ? trip.activities.map((activity) => <ActivityCard key={activity._id} activity={activity} />) : <p>No activities added yet.</p>}
          </div>
        </article>

        <article className="card">
          <h3>Bookings</h3>
          <div className="stack">
            {trip.bookings?.length ? trip.bookings.map((booking) => <BookingCard key={booking._id} booking={booking} />) : <p>No bookings saved yet.</p>}
          </div>
        </article>
      </section>
    </div>
  );
}
