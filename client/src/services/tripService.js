import api from "./api";

export const getTrips = async () => (await api.get("/trips")).data;
export const createTrip = async (payload) => (await api.post("/trips", payload)).data;
export const getTripDetails = async (id) => (await api.get(`/trips/${id}`)).data;
export const updateTrip = async (id, payload) => (await api.put(`/trips/${id}`, payload)).data;
export const getTripHistory = async () => (await api.get("/trips/history/list")).data;
export const addActivity = async (tripId, payload) => (await api.post(`/trips/${tripId}/activities`, payload)).data;
export const getDestinations = async () => (await api.get("/destinations")).data;
export const getNotifications = async () => (await api.get("/notifications")).data;
export const getAdminDashboard = async () => (await api.get("/admin/dashboard")).data;
