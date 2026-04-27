import { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/tripService";

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAdminDashboard().then(setData);
  }, []);

  if (!data) {
    return <div className="page-shell">Loading admin dashboard...</div>;
  }

  return (
    <div className="page-shell">
      <section className="section">
        <div className="section-heading">
          <h2>Admin dashboard</h2>
        </div>
        <div className="grid">
          {Object.entries(data.stats).map(([key, value]) => (
            <article key={key} className="card">
              <p className="eyebrow">{key}</p>
              <h3>{value}</h3>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <h2>Recent trips</h2>
        </div>
        <div className="grid">
          {data.latestTrips.map((trip) => (
            <article key={trip._id} className="card">
              <h3>{trip.tripName}</h3>
              <p>{trip.destination}</p>
              <span>{trip.userId?.name}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
