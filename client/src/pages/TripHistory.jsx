import { useEffect, useState } from "react";
import TripCard from "../components/TripCard";
import { getTripHistory } from "../services/tripService";

export default function TripHistory() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getTripHistory().then(setTrips);
  }, []);

  return (
    <div className="page-shell">
      <section className="section">
        <div className="section-heading">
          <h2>Trip history</h2>
        </div>
        <div className="grid">
          {trips.length ? trips.map((trip) => <TripCard key={trip._id} trip={trip} />) : <p>No completed trips yet.</p>}
        </div>
      </section>
    </div>
  );
}
