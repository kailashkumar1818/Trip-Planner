export const validateTrip = ({ tripName, destination, startDate, endDate }) => {
  if (!tripName || !destination || !startDate || !endDate) {
    return "Please complete all trip fields.";
  }

  if (new Date(startDate) > new Date(endDate)) {
    return "Start date must be before end date.";
  }

  return "";
};
