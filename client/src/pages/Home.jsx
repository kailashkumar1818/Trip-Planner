import { useEffect, useState } from "react";
import DestinationCard from "../components/DestinationCard";
import TripCard from "../components/TripCard";
import { useAuth } from "../context/useAuth";
import { getDestinations, getNotifications, getTrips } from "../services/tripService";

export default function Home() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setError("");
        const destinationsData = await getDestinations();
        setDestinations(Array.isArray(destinationsData) ? destinationsData : []);

        if (user) {
          const [tripsData, notificationsData] = await Promise.all([getTrips(), getNotifications()]);
          setTrips(Array.isArray(tripsData) ? tripsData : []);
          setNotifications(Array.isArray(notificationsData) ? notificationsData : []);
        } else {
          setTrips([]);
          setNotifications([]);
        }
      } catch (err) {
        setDestinations([]);
        setTrips([]);
        setNotifications([]);
        setError(err.response?.data?.message || "Unable to load trip data right now.");
      }
    };

    loadData();
  }, [user]);

  return (
    <div className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Travel management platform</p>
          <h1>Plan destinations, stays, activities, and schedules in one place.</h1>
          <p className="hero-copy">
            This Trip Planner follows your PDF brief with user auth, itinerary tracking, booking storage,
            destination ideas, reminders, history, and an admin-ready flow.
          </p>
        </div>
        <div className="hero-panel">
          <div className="metric">
            <strong>{destinations.length}</strong>
            <span>recommended destinations</span>
          </div>
          <div className="metric">
            <strong>{trips.length}</strong>
            <span>planned trips</span>
          </div>
          <div className="metric">
            <strong>{notifications.length}</strong>
            <span>upcoming reminders</span>
          </div>
        </div>
      </section>

      {user && notifications.length > 0 && (
        <section className="section">
          <div className="section-heading">
            <h2>Upcoming reminders</h2>
          </div>
          <div className="grid">
            {notifications.map((item) => (
              <article key={item.id} className="mini-card">
                <h4>{item.title}</h4>
                <p>{item.message}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {user && (
        <section className="section">
          <div className="section-heading">
            <h2>Your trips</h2>
          </div>
          <div className="grid">
            {trips.map((trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="section-heading">
          <h2>Destination suggestions</h2>
        </div>
        {error && <p className="error-text">{error}</p>}
        <div className="grid grid-large">
          {destinations.map((destination) => (
            <DestinationCard key={destination._id || destination.destinationName} destination={destination} />
          ))}
        </div>
      </section>
    </div>
  );
}
