import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrip, getDestinations } from "../services/tripService";
import { validateTrip } from "../utils/validators";

export default function CreateTrip() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    tripName: "",
    destination: "",
    startDate: "",
    endDate: "",
    notes: ""
  });

  useEffect(() => {
    getDestinations().then(setDestinations);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationMessage = validateTrip(form);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    const itinerary = [
      { date: form.startDate, title: "Arrival and check-in", note: "Kick off the trip smoothly." },
      { date: form.endDate, title: "Wrap-up and departure", note: "Confirm bookings and local transport." }
    ];

    const trip = await createTrip({ ...form, itinerary });
    navigate(`/trips/${trip._id}`);
  };

  return (
    <div className="page-shell narrow">
      <section className="section">
        <div className="section-heading">
          <h2>Create a new trip</h2>
        </div>
        <form className="form-grid" onSubmit={handleSubmit}>
          <input placeholder="Trip name" value={form.tripName} onChange={(e) => setForm({ ...form, tripName: e.target.value })} />
          <select value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })}>
            <option value="">Select destination</option>
            {destinations.map((destination) => (
              <option key={destination._id || destination.destinationName} value={destination.destinationName}>
                {destination.destinationName}
              </option>
            ))}
          </select>
          <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
          <textarea
            placeholder="Notes, hotel preferences, or friend plans"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
          {error && <p className="error-text">{error}</p>}
          <button className="primary-button" type="submit">
            Save trip
          </button>
        </form>
      </section>
    </div>
  );
}
