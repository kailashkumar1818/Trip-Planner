export const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

export const getTripDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1);
};
