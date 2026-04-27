import { formatDate } from "../utils/helpers";

export default function ActivityCard({ activity }) {
  return (
    <article className="mini-card">
      <h4>{activity.activityName}</h4>
      <p>{activity.location}</p>
      <span>{formatDate(activity.activityDate)}</span>
    </article>
  );
}
