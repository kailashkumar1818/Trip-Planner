import { useAuth } from "../context/AuthContext";

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="page-shell narrow">
      <section className="section">
        <div className="section-heading">
          <h2>User profile</h2>
        </div>
        <article className="card profile-card">
          <div>
            <span className="eyebrow">Name</span>
            <h3>{user?.name}</h3>
          </div>
          <div>
            <span className="eyebrow">Email</span>
            <p>{user?.email}</p>
          </div>
          <div>
            <span className="eyebrow">Role</span>
            <p>{user?.role}</p>
          </div>
        </article>
      </section>
    </div>
  );
}
